const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

const extractOwner = (header) => header.replace('Owner ', '');

module.exports = (req, res, next) => {
  const { auth } = req.headers;

  if (!auth || !auth.startsWith('Owner ')) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = extractOwner(auth);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
