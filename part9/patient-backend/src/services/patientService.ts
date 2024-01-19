import patientData from '../../data/patients';
import { Patient, NonSensitivePatientData, NewPatient, Entry } from '../types';
import {v4 as uuidv4} from 'uuid';

const patients: Patient[] = patientData;

const getPatients = () : Patient[] => {
  return patients;
};

const getPatientById = (id: string) : Patient => {
  const patient = patients.find(p => p.id === id);
  if (patient) {
    return patient;
  }
  else {
    throw new Error('Patient not found!');
  }
};

const getNonSensitiveData = () : NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuidv4(),
    ...patient,
    entries: []
  };

  patients.push(newPatient);

  return newPatient;
};

const addEntry = (patientId: string, entry: Entry): Patient => {
  console.log(patientId);
  const patient = patients.find(p => p.id === patientId);
  const newEntry: Entry = { 
    ...entry,
    id: uuidv4()    
  };
  
  if (patient) {
    patient.entries?.push(newEntry);
    return {
      ...patient,
      entries: [...patient.entries || [], { ...entry, id: uuidv4()}]
    };    
  }
  throw new Error('Patient not found!'); 
};

export default {
  getPatients,
  getPatientById,
  getNonSensitiveData,
  addPatient,
  addEntry
};