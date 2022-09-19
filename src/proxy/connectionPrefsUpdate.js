const express = require('express');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const translate = require('translate');
const { User } = require('../contexts/user');

const router = express.Router();

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(100).required().email(),
    connectionPrefs: Joi.object().required(),
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
  const orgIdx = 0;
  const param = `orgs.${orgIdx}.connectionPrefs`;
  const update = {
    [param]: req.body.connectionPrefs,
  };

  const updatedUser = await User.findOneAndUpdate(query, update, {
    returnDocument: true,
  });

  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ _id: updatedUser._id }, config.get('PrivateKey'));
  res.header('x-auth-token', token).send(updatedUser);
  return updatedUser;
});

module.exports = router;
