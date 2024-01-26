import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientEntry from "./components/PatientEntry";
import diagnosisService from "./services/diagnoses";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchData = async () => {
      const patients = await patientService.getAll();
      const diagnoses = await diagnosisService.getAll();
      setPatients(patients);
      setDiagnoses(diagnoses);
    };
    void fetchData();
  }, []);
  
  return (
    <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientEntry diagnoses={diagnoses}/>} />
          </Routes>
        </Container>
    </div>
  );
};

export default App;
