import express from 'express'
const app = express();

app.use(require('./src/routes/routes'));

const server = app.listen(3000, () => console.log(`Working on ${server.address().port}`));