import express from 'express';
import bmiCalculator from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const  { height, weight } = req.query;
  const result = bmiCalculator(Number(height), Number(weight));
  res.send(result);
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = exerciseCalculator(daily_exercises , Number(target));
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    res.status(401).json({ error: error.message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});