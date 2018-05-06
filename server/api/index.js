const express = require("express");
const app = express();
const db = require('../db/models/index.js').db
const morgan = require("morgan");
const PORT = 1255;
const bodyParser = require('body-parser');
const path = require('path');
//const main = require('../../app/main.jsx');



app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../../public')));

app.use('/api/campuses', require('./campus'));

app.use('/api/students', require('./student'));






db.sync()
.then(() => {
  console.log('db synced')
app.listen(PORT, () => {
  console.log(`The world hasn't ended, so we will be here listening on port ${PORT}`);
});
})
