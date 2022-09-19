import jwt from 'jsonwebtoken';
import ProxyHandler from './proxy/proxy-handler';

const accessTokenKey = '$TOKEN';

async function getToken() {
  return window.localStorage.getItem(accessTokenKey);
}

async function getLoggedUser(token) {
  const cfgKey = await ProxyHandler.get('/cfgkey');
  const loggedUserId = jwt.verify(token, cfgKey.data);
  const loggedUserReq = await ProxyHandler.get(
    // eslint-disable-next-line no-underscore-dangle
    `/api/users/loggedin/${loggedUserId._id}`,
  );
  return loggedUserReq.data;
}

function handleUserResponse(response) {
  let user = null;
  if (response) {
    const token = response.headers['x-auth-token'];
    window.localStorage.setItem(accessTokenKey, token);
    user = getLoggedUser(token);
  }
  return user;
}

async function preRegister({ email, password, orgs }) {
  const userExists = await ProxyHandler.get(`/api/users/registered/${email}`);
  if (userExists.data) {
    return userExists.data;
  }
  return { email, password, orgs };
}

async function register({ email, password, orgs }) {
  const response = await ProxyHandler.post('/api/users', {
    email,
    password,
    orgs,
  });
  return handleUserResponse(response);
}

async function login({ email, password }) {
  const response = await ProxyHandler.post('/api/auth', { email, password });
  return handleUserResponse(response);
}

async function logout() {
  window.localStorage.removeItem(accessTokenKey);
}

async function update(user) {
  const response = await ProxyHandler.put('/api/users/update', user);
  return handleUserResponse(response);
}

async function updatePrefs(data) {
  const response = await ProxyHandler.put(
    '/api/users/connectionprefs/update',
    data,
  );
  return handleUserResponse(response);
}

async function changePassword(formData) {
  const response = await ProxyHandler.put('/api/changepassword', formData);
  return handleUserResponse(response);
}

export {
  getLoggedUser,
  getToken,
  preRegister,
  register,
  login,
  logout,
  update,
  updatePrefs,
  changePassword,
};
