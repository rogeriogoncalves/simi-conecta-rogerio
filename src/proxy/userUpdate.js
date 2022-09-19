const express = require('express');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const translate = require('translate');
const { User } = require('../contexts/user');

const router = express.Router();

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().allow('').min(5).max(100).email(),
    name: Joi.string().required(),
    description: Joi.string().allow(''),
    imageSrc: Joi.string().allow('').dataUri(),
    contact: Joi.object()
      .required()
      .keys({
        linkedin: Joi.string().allow('').max(50),
        mail: Joi.string().allow('').max(50).email(),
        website: Joi.string().allow('http://', 'https://').max(50).uri(),
      }),
    contactedOrgs: Joi.array(),
  });
  return schema.validate(req);
}

router.put('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    const errTxt = await translate(error.details[0].message, 'pt');
    return res.status(400).send(errTxt);
  }

  const query = { email: req.body.email };
  const data = _.pick(req.body, [
    'name',
    'description',
    'imageSrc',
    'contact',
    'contactedOrgs',
  ]);
  const user = await User.findOne(query);
  if (user === null) {
    res
      .status(500)
      .send(
        'Erro! Usuário não encontrado na base de dados. Contate o administrador do site.',
      );
    return false;
  }

  Object.keys(data).forEach(param => {
    user.orgs[0][param] = data[param];
  });
  const updatedUser = await User.findOneAndUpdate(query, user, {
    returnDocument: true,
  });

  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ _id: updatedUser._id }, config.get('PrivateKey'));
  res.header('x-auth-token', token).send(updatedUser);
  return updatedUser;
});

module.exports = router;
