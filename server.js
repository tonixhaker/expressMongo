import express from 'express'
import routes from './src/routes';
const app = express();
const mongoose = require('./src/config/database');

app.use(routes);

const server = app.listen(3000, () => console.log(`Beep-Boop server up on ${server.address().port}`));