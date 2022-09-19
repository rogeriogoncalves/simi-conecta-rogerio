const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const translate = require('translate');
const { User } = require('../contexts/user');

const router = express.Router();

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(req);
}

router.post('/', async (req, res) => {
  // First Validate The HTTP Request
  const { error } = validate(req.body);
  if (error) {
    const errTxt = await translate(error.details[0].message, 'pt');
    return res.status(400).send(errTxt);
  }

  //  Now find the user by their email address
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Erro! Email não cadastrado.');
  }

  // Then validate the Credentials in MongoDB match
  // those provided in the request
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send('Senha incorreta.');
  }

  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'));
  res.header('x-auth-token', token).send(token);
  return token;
});

module.exports = router;
