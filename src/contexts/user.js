const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model(
  'users',
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    orgs: {
      type: Array,
    },
  }),
);

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    orgs: Joi.array(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
