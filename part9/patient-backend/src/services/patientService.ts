import patientData from '../../data/patients';
import { Patient, NonSensitivePatientData, NewPatient } from '../types';
import {v4 as uuidv4} from 'uuid';


const patients: Patient[] = patientData;

const getPatients = () : Patient[] => {
  return patients;
};

const getNonSensitiveData = () : NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};


const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuidv4(),
    ...patient
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatients,
  getNonSensitiveData,
  addPatient
};