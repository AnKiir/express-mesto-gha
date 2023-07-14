const mongoose = require('mongoose');
const { codesError } = require('../error');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res.status(codesError.DEFAULT).send({ message: 'Произошла ошибка' });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res
          .status(codesError.NOT_FOUND_DATA)
          .send({ message: 'Пользователь с указанным _id не найден' });
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(codesError.INCORRECT_DATA).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      } else {
        res.status(codesError.DEFAULT).send({ message: 'Произошла ошибка' });
      }
    });
};

const postUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(codesError.INCORRECT_DATA).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      } else {
        res.status(codesError.DEFAULT).send({ message: 'Произошла ошибка' });
      }
    });
};

const patchUser = (req, res, data) => {
  User.findByIdAndUpdate(req.user._id, data, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(codesError.INCORRECT_DATA)
          .send({ message: 'Переданы некорректные данные при обновлении профиля', });
      } else {
        res.status(codesError.DEFAULT).send({ message: 'Произошла ошибка' });
      }
    });
};

const patchUserProfile = (req, res) => {
  const { name, about } = req.body;

  patchUser(req, res, { name, about });
};

const patchUserAvatar = (req, res) => {
  const { avatar } = req.body;

  patchUser(req, res, { avatar });
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  patchUserProfile,
  patchUserAvatar,
};
