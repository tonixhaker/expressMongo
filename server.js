import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import { APP_PORT } from "./src/config/env";
import mongoose from './src/config/database';
import passport from './src/config/passport';

const app = express();
app.use(cors());
app.use(errorHandler());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./src/routes'));

//Response handlers

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.setHeader('Content-Type','application/json');
        res.status(401).send(JSON.stringify({"error":"Unauthorized"}));
    }
});

const server = app.listen(APP_PORT, () => console.log(`Beep-Boop server up on ${APP_PORT}`));