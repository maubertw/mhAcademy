const router = require('express').Router();
const HttpError = require('./utils/HttpError');
const { Student, Campus } = require('../db/models');


router.param('id', (req, res, next, id) => {
  Student.findById(id)
    .then(student => {
      if (!student) throw HttpError(404);
      req.requestedStudent = student;
      next();
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  Student.findAll()
    .then(students => res.json(students))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.status(201).json(student))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  req.requestedStudent.reload(Student.options.scopes.populated())
    .then(requestedStudent => res.json(requestedStudent))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  req.requestedStudent.update(req.body)
    .then(student => res.json(student))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  req.requestedStudent.destroy()
    .then(() => res.sendStatus(204))
    .catch(next);
});




module.exports = router;





