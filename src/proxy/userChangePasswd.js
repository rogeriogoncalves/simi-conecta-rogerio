const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../contexts/user');

const router = express.Router();

router.put('/', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const allowChange = await bcrypt.compare(req.body.oldPassword, user.password);
  if (allowChange) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.newPassword, salt);
    await user.save();
    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'));
    res.header('x-auth-token', token).send(token);
    return token;
  }
  return res.status(400).send('Erro! Senha atual incorreta!');
});

module.exports = router;
