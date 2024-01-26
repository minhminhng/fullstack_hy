export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HospitalEntry extends BaseEntry {
  discharge: {
    date: string;
    criteria: string;
  }
  type: "Hospital";
}

interface OccupationalHealthcareEntry extends BaseEntry {
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  }
  type: "OccupationalHealthcare";
}

interface HealthCheckEntry extends BaseEntry {
  healthCheckRating: HealthCheckRating;
  type: "HealthCheck";
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type EntryTypes = Pick<Entry, 'type'>['type'] | null;
export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Array<Entry>;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;