import patientData from '../../data/patients';
import { Patient, NonSensitivePatientData, NewPatient, Entry, HealthCheckRating } from '../types';
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

const addEntry = (patientId: string, entry: Entry): Entry => {
  switch (entry.type) {
    case "Hospital":
      if (!entry.discharge || !entry.discharge.date || !entry.discharge.criteria) {
        throw new Error ('Missing discharge parameter for entry type Hospital');
      }
      break;
    case "OccupationalHealthcare":
      if (!entry.employerName || entry.employerName === '') {
        throw new Error ('Missing employer parameter for entry type OccupationalHealthcare');
      }
      break;
    case "HealthCheck":
      if (entry.healthCheckRating > HealthCheckRating.CriticalRisk || entry.healthCheckRating < HealthCheckRating.Healthy 
        || isNaN(entry.healthCheckRating)) {
        throw new Error(`Value of healthCheckRating incorrect: ${entry.healthCheckRating}`);
      }
      break;
    default:
      throw new Error('Undefined entry type');
  }
  const patient = patients.find(p => p.id === patientId);
  const newEntry: Entry = { 
    ...entry,
    id: uuidv4()    
  };
  
  if (patient) {
    patient.entries?.push(newEntry);
    return newEntry;    
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