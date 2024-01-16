import patientData from '../../data/patients';
import { Patient, NonSensitivePatientData } from '../types';

const patients: Patient[] = patientData;

const getPatients = () : Patient[] => {
  return patients;
};

const getNonSensitiveData = () : NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};


const addPatient = () => {
  return null;
};

export default {
  getPatients,
  getNonSensitiveData,
  addPatient
};