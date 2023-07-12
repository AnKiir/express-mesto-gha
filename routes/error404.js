const router = require('express').Router();
const { codesError } = require('../error');

router.use('*', (req, res) => {
  res
    .status(codesError.NOT_FOUND_DATA)
    .send({ message: 'Передан некорректный путь' });
});

module.exports = router;