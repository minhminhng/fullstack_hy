import { useState, SyntheticEvent } from 'react';

import { Diagnosis, EntryTypes, EntryWithoutId, HealthCheckRating } from '../../types';

import { css } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, Grid, Button, MenuItem, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
  },
});

const formContainerStyle = css`
  padding: 30px;
  border: 2px dashed #999;
  border-radius: 3px;
`;

const StyledForm = styled('form')`
  ${formContainerStyle}
`;

interface Props {
  entryType: EntryTypes;
  diagnoses: Diagnosis[];
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

interface HealthRatingOption{
  value: number;
  label: string;
}

const healthRatingOptions: HealthRatingOption[] = Object.entries(HealthCheckRating)
  .filter(([key]) => isNaN(Number(key)))
  .map(([label, value]) => ({
  label,
  value: Number(value)
}));

const AddEntryForm: React.FC<Props> = ({ entryType, diagnoses, onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [entryDate, setEntryDate] = useState<Date | null>(null);
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [diagCodes, setDiagCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState<Date | null>(null);
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  const codes = diagnoses.map(d => ({value: d.code, label: d.code + ' ' + d.name}));

  if (!entryType) {
    return null;
  }
  
  const resetForm = () => {
    setDescription('');
    setEntryDate(null);
    setSpecialist('');
    setDiagCodes([]);
    setDischargeDate(null);
    setDischargeCriteria('');
    setEmployerName('');
    setStartDate(null);
    setEndDate(null);
    setHealthCheckRating(0);    
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!entryType) {
      throw Error('Invalid input type!');
    }
    else if (!entryDate) {
      throw Error('Invalid date!');
    }
    else if (description === '') {
      throw Error('Invalid description!');
    }
    else if (specialist === '') {
      throw Error('Invalid specialist!');
    }

    const formattedDate = new Date(entryDate).toISOString().split('T')[0];

    switch (entryType) {
      case 'Hospital':
        if (!dischargeDate || !dischargeCriteria) {
          throw Error('Invalid input for Discharge!');
        }
        onSubmit({
          type: 'Hospital',
          description,
          date: formattedDate,
          specialist,
          diagnosisCodes: diagCodes,
          discharge: {            
            date: new Date(dischargeDate).toISOString().split('T')[0],
            criteria: dischargeCriteria
          }
        });
        break;
      case 'OccupationalHealthcare':
        if (!employerName) {
          throw Error('Invalid input for Employer!');
        }
        onSubmit({
          type: 'OccupationalHealthcare',
          description,
          date: formattedDate,
          specialist,
          diagnosisCodes: diagCodes,
          employerName: employerName,
          sickLeave: {            
            startDate: startDate === null ? '' : new Date(startDate).toISOString().split('T')[0],
            endDate: endDate === null ? '' : new Date(endDate).toISOString().split('T')[0],
          }
        });
        break;
      case 'HealthCheck':
        onSubmit({
          type: 'HealthCheck',
          description,
          date: formattedDate,
          specialist,
          diagnosisCodes: diagCodes,
          healthCheckRating: healthCheckRating
        });
        break;
      default:
        throw new Error('Undefined entry type');
    }

    
  };
  
  const closeForm = () => {
    resetForm();
    onCancel();
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setDiagCodes(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledForm onSubmit={addEntry}>
        <h2>New {entryType} entry</h2>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <DatePicker 
              label="Date of entry"
              format="DD.MM.YYYY"
              value={entryDate}
              onChange={(value) => setEntryDate(value)}
              />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <Select
          multiple
          fullWidth
          value={diagCodes}
          onChange={handleChange}
        >
          {codes.map(c => 
              <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>)
          }
        </Select>        
        {entryType === 'Hospital' && (
          <div>          
            <h3>Discharge</h3>
            <DatePicker 
              label="Date"
              format="DD.MM.YYYY"
              value={dischargeDate}
              onChange={(value) => setDischargeDate(value)}
              />
            <TextField
              label="Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </div>
        )}

        {entryType === 'OccupationalHealthcare' && (
          <div>          
          <TextField
            label="Employer"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
          <h3>Sick leave</h3>
          <DatePicker 
              label="Start"
              format="DD.MM.YYYY"
              value={startDate}
              onChange={(value) => setStartDate(value)}
              />
          <span>  </span>
          <DatePicker 
              label="End"
              format="DD.MM.YYYY"
              value={endDate}
              onChange={(value) => setEndDate(value)}
              />
        </div>
        )}
        {entryType === 'HealthCheck' && (
          <div>
          <InputLabel>Healthcheck Rating</InputLabel>
          <Select
            id="Healthcheck Rating"
            value={healthCheckRating}
            onChange={({target}) => setHealthCheckRating(Number(target.value))}
          >
            {healthRatingOptions.map(option =>
              <MenuItem key={option.label} value={option.value}>{option.label}</MenuItem>
            )}
          </Select>
          </div>
        )}
        
        <Grid style={{ marginTop: '15px', marginBottom: '50px' }}>
          <Grid item>
            <Button
              color="error"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={() => closeForm()}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
                color: "disabled"
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </StyledForm>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default AddEntryForm;