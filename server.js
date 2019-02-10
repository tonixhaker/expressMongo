import express from 'express'
import {userRoutes, authRoutes,middlewares} from './src/routes';
const app = express();
const mongoose = require('./src/config/database');

app.use([middlewares,userRoutes,authRoutes]);

const server = app.listen(3000, () => console.log(`Working on ${server.address().port}`));