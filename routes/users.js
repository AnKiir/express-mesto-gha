const router = require('express').Router();
const {
  getUser,
  getUsers,
  postUser,
  patchUserProfile,
  patchUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', postUser);
router.patch('/users/me', patchUserProfile);
router.patch('/users/me/avatar', patchUserAvatar);

module.exports = router;
