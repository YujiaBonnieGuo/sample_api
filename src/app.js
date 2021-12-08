const express = require('express');
const cors = require('cors');
const jwtValidation = require('./utils/jwtUtils.js');
const pp = require('passport');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(pp.initialize());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const handleGetNext = require('./handler/handleGetNext.js');
const handleGetCurrent = require('./handler/handleGetCurrent.js');
const handleRegister = require('./handler/handleRegister.js');
const handleReset = require('./handler/handleReset.js');
const handleLogin = require('./handler/handleLogin.js');

app.post('/api/v1/login', handleLogin);
app.post('/api/v1/current', jwtValidation, handleGetCurrent);
app.post('/api/v1/next', jwtValidation, handleGetNext);
app.post('/api/v1/reset', jwtValidation, handleReset);
app.post('/api/v1/register', handleRegister);

app.get('/healthCheck', (req, res) => {
  console.log('/healthCheck is called');
  res.json({ message: 'healthCheck status as: OK' });
});
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

module.exports = app;
