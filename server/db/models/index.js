
const db = require('../index.js');
const Student = require('./student');
const Campus = require('./campus');


Campus.hasMany(Student, {as: 'student'});


module.exports = {
  Student,
  Campus,
  db
}
