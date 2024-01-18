import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

// import { styled } from '@mui/material/styles';

import { Patient } from '../types';

const PatientInfo = ({ patient } : { patient: Patient | null}) => {
  if (!patient) {
    return null;
  }
  return (
    <div>
      <h2>
        {patient.name}
        {patient.gender === "male" && <MaleIcon fontSize="large"/>}
        {patient.gender === "female" &&<FemaleIcon fontSize="large"/>}
      </h2>
      <div>{patient.ssn}</div>
      <div>{patient.occupation}</div>
    </div>
  );
};

export default PatientInfo;
