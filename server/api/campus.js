
const router = require('express').Router();
const HttpError = require('./utils/HttpError');
const { Campus, Student } = require('../db/models');

router.param('id', (req, res, next, id) => {
  Campus.findById(id)
    .then(campus => {
      if (!campus) throw HttpError(404);
      req.requestedCampus = campus;
      next();
    })
    .catch(next);
});


router.get('/', (req, res, next) => {
  Campus.findAll()
    .then(campuses => res.json(campuses))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Campus.create(req.body)
    .then(campus => res.status(201).json(campus))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  req.requestedCampus.reload(Campus.options.scopes.populated())
    .then(requestedCampus => res.json(requestedCampus))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  req.requestedCampus.update(req.body)
    .then(campus => res.json(campus))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  req.requestedCampus.destroy()
    .then(() => res.sendStatus(204))
    .catch(next);
});




module.exports = router;





