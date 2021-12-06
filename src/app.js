import express from 'express';
import cors from 'cors';
import jwtValidation from './utils/jwtUtils.js';
import pp from 'passport';
const app = express();
app.use(cors());
app.use(express.json());
app.use(pp.initialize());
import handleGetNext from './handler/handleGetNext.js';
import handleGetCurrent from './handler/handleGetCurrent.js';
import handleRegister from './handler/handleRegister.js';
import handleReset from './handler/handleReset.js';
import handleLogin from './handler/handleLogin.js';
import handleGetToken from './handler/handleGetToken.js';
app.get('/healthcheck', async (req, res) => {
  console.log('entering ./healthcheck');
  res.send('healthcheck status as: OK');
});

app.get('/api/v1/login', handleLogin);
app.get('/api/v1/current', jwtValidation, handleGetCurrent);
app.get('/api/v1/next', jwtValidation, handleGetNext);
app.post('/api/v1/reset', jwtValidation, handleReset);
app.post('/api/v1/register', handleRegister);

app.get('/api/v1/token', handleGetToken);

export default app;
