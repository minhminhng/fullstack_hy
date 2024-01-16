export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'  
}

export type NonSensitivePatientData = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}