import React from 'react';
import axios from 'axios';

const ip = process.env.REACT_APP_IP_ADDR || 'localhost';
const url = `http://${ip}:3001`;

class ProxyHandler extends React.Component {
  static get = (endpoint, config) => axios.get(url + endpoint, config);

  static post = (endpoint, data) => axios.post(url + endpoint, data);

  static put = (endpoint, data) => axios.put(url + endpoint, data);
}

export default ProxyHandler;
