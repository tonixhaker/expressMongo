const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost/restart';

const config = {
    useCreateIndex: true,
    useNewUrlParser: true
};

mongoose.connect(DB_URI,config);
mongoose.connection.once('open', () => console.log('Successfully connected to MongoDB'));
mongoose.connection.on('error', error => console.error(error));

module.exports = mongoose;