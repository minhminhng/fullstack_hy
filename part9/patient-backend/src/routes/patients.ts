
import express from 'express';
import patientService from '../services/patientService';
const router = express.Router();
import { toNewPatient } from '../utils';
import { Diagnosis, Entry } from '../types';

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveData());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatientById(id);
  if (patient) {
    res.send(patient);
  }
  else {
    res.status(404).send('Patient not found');
  }  
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }  
});

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

router.post('/:id/entries', (req, res) => {
  try {
    const patientId = req.params.id;
    const entry = req.body as Entry;
    const addedPatient = patientService.addEntry(patientId, entry);
    const codes = parseDiagnosisCodes(entry);
    console.log(codes);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong. ';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }  
});

export default router;