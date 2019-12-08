import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default {
  register: function (userData) {
    return axios.post('/api/users/register', userData);
  },
  login: function (userData) {
    return axios.post('/api/users/login', userData);
  },
  allocation: function (user) {
    return axios.post('/api/users/allocation', user, { 'headers': { 'Authorization': cookies.get('jwt') } });
  },
  logout: function () {
    cookies.set('jwt', '', { path: '/' });
  },
  test: function () {
    return axios.get('/api/users/test', { 'headers': { 'Authorization': cookies.get('jwt') } });
  },
  calculateCharities: function () {
    return axios.get('/api/users/calculate', { 'headers': { 'Authorization': cookies.get('jwt') } });
  },
  get: function () {
    return axios.get('/api/users/mydata', { 'headers': { 'Authorization': cookies.get('jwt') } });
  },
  post: function (obj) {
    return axios.post(`/api/users/mydata`, obj, { 'headers': { 'Authorization': cookies.get('jwt') } });
  },
  getResetToken: function (obj) {
    return axios.post('/api/users/getResetToken', obj);
  },
  resetPW: function (obj) {
    return axios.post(`/api/users/resetPW`, obj);
  },
  getEmailToken: function (obj) {
    return axios.post('/api/users/getEmailToken', obj);
  },
  confirmEmail: function (obj) {
    return axios.post(`/api/users/confirmEmail`, obj);
  }
};
