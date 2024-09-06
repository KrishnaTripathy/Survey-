// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let surveys = {}; // In-memory storage

// Endpoint to get survey data
app.get('/api/survey/:id', (req, res) => {
  const { id } = req.params;
  res.json(surveys[id] || {});
});

// Endpoint to save survey data
app.post('/api/survey/:id', (req, res) => {
  const { id } = req.params;
  surveys[id] = req.body;
  res.status(200).json({ message: 'Survey saved successfully' });
});

// Endpoint to mark survey as completed
app.post('/api/survey/:id/complete', (req, res) => {
  const { id } = req.params;
  if (surveys[id]) {
    surveys[id].status = 'COMPLETED';
    res.status(200).json({ message: 'Survey marked as completed' });
  } else {
    res.status(404).json({ message: 'Survey not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
