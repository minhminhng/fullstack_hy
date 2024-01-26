import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


import { Male, Female, LocalHospital, MonitorHeart, MedicalServices, Favorite } from '@mui/icons-material';
import { red, orange, yellow } from '@mui/material/colors';
import { Table, TableCell, TableRow, TableBody, DialogContent, Button, Alert }from '@mui/material';

import patientService from '../../services/patients';
import { Diagnosis, Patient, Entry, EntryWithoutId, EntryTypes } from '../../types';
import AddEntryForm from './AddEntryForm';

interface EntryProps {
  diagnoses: Diagnosis[]
}

const HealthRating: React.FC<{rating: number}> = ({ rating }) => {
  switch (rating) {
    case 3:
      return <Favorite sx={{ color: red[500] }}/>;
    case 2:
      return <Favorite sx={{ color: orange[500] }} />;
    case 1:
      return <Favorite sx={{ color: yellow[500] }} />;
    case 0:
      return <Favorite color="success" />;
    default:
      return <Favorite />;
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const PatientEntry = ({ diagnoses } : EntryProps) => {
  const id = useParams().id;
  const [entries, setEntries] = useState<Entry[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [patient, setPatient] = useState<Patient>();
  const [entryType, setEntryType] = useState<EntryTypes>();

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };
  
  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const fetchedPatient = await patientService.getById(id);
        setPatient(fetchedPatient);
        if (fetchedPatient.entries) {
          setEntries(fetchedPatient.entries);
        }
      }
    };
    
    void fetchPatient();
  }, [id]);

  if (!patient) {
    return null;
  }
  
  const getDiagnoses = (entry : Entry) => {
    const values = entry.diagnosisCodes?.map(c => {
      const name = diagnoses.find(d => d.code === c)?.name;
      return ({
        code: c,
        name: name
      });
    });
    return values;
  };
  
  const HospitalEntry = ({ entry } : { entry: Entry }) => {
    const values = getDiagnoses(entry);
    if (entry.type != "Hospital") {
      return null;
    }
    return (
      <div>
        <div>{entry.date} <LocalHospital /></div>
        <div>{entry.description}</div>
        <div>{values?.map(v => <li key={v.code}>{v.name}</li>)}</div>
        <div>discharge 
          <div>date: {entry.discharge.date}</div>
          <div>criteria: {entry.discharge.criteria}</div>
        </div>
        <div>diagnose by {entry.specialist}</div>
      </div>
    );
  };
  
  const OccupationalHealthcareEntry = ({ entry } : { entry: Entry }) => {
    const values = getDiagnoses(entry);
    if (entry.type != "OccupationalHealthcare") {
      return null;
    }
    return (
      <div>
        <div>{entry.date} <MedicalServices /> <i>{entry.employerName}</i></div>
        <div>{entry.description}</div>
        {values && <div>{values.map(v => <li key={v.code}>{v.name}</li>)}</div>}
        {entry.sickLeave && (
          <div>sick leave from <em>{entry.sickLeave.startDate} - {entry.sickLeave.endDate}</em></div>
        )}
        <div>diagnose by {entry.specialist}</div>
      </div>
    );
  };
  
  const HealthCheckEntry = ({ entry } : { entry: Entry }) => {
    if (entry.type != "HealthCheck") {
      return null;
    }
    return (
      <div>
        <div>{entry.date} <MonitorHeart /></div>
        <div>{entry.description}</div>
        <HealthRating rating={entry.healthCheckRating} />
        <div>diagnose by {entry.specialist}</div>
      </div>
    );
  };  
  
  const EntryDetails: React.FC<{entry: Entry}> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntry entry={entry}/>;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntry entry={entry}/>;
      case "HealthCheck":
        return <HealthCheckEntry entry={entry}/>;
      default:
        return assertNever(entry);
    }
  };

  const onSubmit = async (values: EntryWithoutId) => {
    try {
      const newEntry = await patientService.addEntry(patient.id, values);
      setEntries([...entries, newEntry]);
      setPatient({...patient, entries: [...entries, newEntry]});
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const onClose = () => {
    setVisible(false);
    setError('');
  };

  const openHospitalForm = () => {
    setVisible(true);
    setEntryType("Hospital");
  };

  const openOccupationForm = () => {
    setVisible(true);
    setEntryType("OccupationalHealthcare");
  };

  const openHealthCheckForm = () => {
    setVisible(true);
    setEntryType("HealthCheck");
  };

  return (
    <div>
      <h2>
        {patient.name}
        {patient.gender === "male" && <Male fontSize="large"/>}
        {patient.gender === "female" &&<Female fontSize="large"/>}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      
      
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <div style={showWhenVisible}>
          {entryType && <AddEntryForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses} entryType={entryType}/>}
        </div>        
      </DialogContent>

      <h3>entries</h3>
      <Table style={{ marginBottom: "1em" }}>
        <TableBody>      
          {patient.entries?.map(e =>
            <TableRow key={e.id}>
            <TableCell><EntryDetails entry={e} /></TableCell>
          </TableRow>)}
        </TableBody>
      </Table>      
      <Button variant="outlined" style={hideWhenVisible} onClick={openHospitalForm}>Create Hospital Entry</Button>
      <Button variant="outlined" style={hideWhenVisible} onClick={openOccupationForm}>Create Occupation Healthcare Entry</Button>
      <Button variant="outlined" style={hideWhenVisible} onClick={openHealthCheckForm}>Create Health Check Entry</Button>
    </div>
  );
};

export default PatientEntry;
