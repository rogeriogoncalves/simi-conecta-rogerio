/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const config = require('config');
const mongoose = require('mongoose');
const axios = require('axios');
const userRouter = require('./userRouter');
const userAuth = require('./userAuth');
const userUpdate = require('./userUpdate');
const connectionPrefsUpdate = require('./connectionPrefsUpdate');
const userChangePassword = require('./userChangePasswd');
const { User } = require('../contexts/user');

const app = express();

if (!config.get('PrivateKey')) {
  console.error('FATAL ERROR: PrivateKey is not defined.');
  process.exit(1);
}

const mongoURI =
  process.env.MONGO_URI ||
  'mongodb://simiAdmin:51m1%40C0n3c74@localhost:27017/simi_conecta';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch(err => console.error('Fail to connect to MongoDB!', err));

const port = 3001;
const url = 'http://database.simi.org.br';

app.use(express.json());
app.use(cors({ exposedHeaders: 'x-auth-token' }));
app.use('/api/users', userRouter);
app.use('/api/auth', userAuth);
app.use('/api/users/update', userUpdate);
app.use('/api/users/connectionprefs/update', connectionPrefsUpdate);
app.use('/api/changepassword', userChangePassword);

app.listen(port, () => {
  console.log(`Proxy server on! Port: ${port}`);
});

const filterRes = response => {
  const shortenRes = [];
  response.forEach(elem => {
    shortenRes.push({
      name: elem.nome,
      startupOuEBT: elem.startupOuEBT,
      description: elem.descricao,
      city: elem.cidade,
      segment: elem.segmento,
      clientType: elem.tipoCliente,
      model: elem.modelo,
      imageSrc: elem.imageSrc,
      contact: {
        linkedin: elem.linkedin,
        mail: elem.mail,
        website: elem.website,
      },
    });
  });
  return shortenRes;
};

app.get('/database-empresas', (_req, res) => {
  axios
    .get(`${url}/empresas`)
    .then(axiosRes => {
      const prettyRes = filterRes(axiosRes.data);
      res.send(prettyRes);
    })
    .catch(e => {
      console.warn(e.message);
      res.send(e.message);
    });
});

app.get('/cfgkey', (_req, res) => {
  res.send(config.get('PrivateKey'));
});

app.get('/api/users/loggedin/:id', async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.send(user);
});

app.get('/api/users/registered/:email', async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (user) {
    res.status(400).send('Erro! Email já cadastrado!');
  } else {
    res.send(false);
  }
});
