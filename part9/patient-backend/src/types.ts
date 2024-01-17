export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'  
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}