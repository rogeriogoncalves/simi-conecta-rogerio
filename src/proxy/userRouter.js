const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const translate = require('translate');
const { User, validate } = require('../contexts/user');

const router = express.Router();

router.post('/', async (req, res) => {
  // First Validate The Request
  const { error } = validate(req.body);
  if (error) {
    const errTxt = await translate(error.details[0].message, 'pt');
    return res.status(400).send(errTxt);
  }

  // Check if this user already exisits
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send('Erro! Usuário já cadastrado!');
  }
  // Insert the new user if they do not exist yet
  user = new User(_.pick(req.body, ['email', 'password', 'orgs']));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'));
  res.header('x-auth-token', token).send(token);
  return token;
});

module.exports = router;
