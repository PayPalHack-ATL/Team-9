import express from 'express';
import faker from 'faker';
import { Auth, User } from '/models';

const router = express.Router();

const createAuth = (req, res, next) => {
  const username = faker.internet.userName();
  const avatar = faker.internet.avatar();
  const name = faker.name.findName();
  new User({
    username,
    avatar,
    name,
  }).save()
    .then(Auth.sign)
    .then(auth => auth.save())
    .then(auth => {
      res.cookie('token', auth.token);
      res.return({ auth });
    })
    .catch(next);
};

const destroyAuth = (req, res, next) => {
  const { token } = req.cookies;
  Auth.findOne({ token })
    .then(auth => {
      if (!auth) return auth;
      return auth.remove();
    })
    .then(auth => {
      res.cookie('token', '');
      res.return({ auth });
    })
    .catch(next);
};

router.route('/')
  .post(createAuth)
  .delete(destroyAuth);

export default router;
