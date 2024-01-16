export type Gender = 'male' | 'female' | 'other';

export type NonSensitivePatientData = Omit<Patient, 'ssn'>;

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