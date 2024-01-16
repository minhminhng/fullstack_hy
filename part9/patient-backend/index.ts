import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());

const PORT = 3001;

app.use(cors());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/patients', (_req, res) => {
  console.log('checking patients');
  res.send('request received');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});