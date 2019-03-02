import express from 'express'
import cors from 'cors';
import mongoose from './src/config/database';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';


const app = express();
app.use(cors());
app.use(errorHandler());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('./src/config/passport');
app.use(require('./src/routes'));

const server = app.listen(3000, () => console.log(`Beep-Boop server up on ${server.address().port}`));