const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('DevSecOps Workshop Working!');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

module.exports = server;
