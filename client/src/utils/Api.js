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
  logout: function (event) {
    event.preventDefault();
    cookies.set('jwt', '', { path: '/' });
  },
  test: function () {
    return axios.get('/api/users/test', { 'headers': { 'Authorization': cookies.get('jwt') } });
  },
  get: function () {
    return axios.get('/api/users/mydata', { 'headers': { 'Authorization': cookies.get('jwt') } });
  },
  post: function (id, obj) {
    return axios.post(`/api/users/mydata/${id}`, obj, { 'headers': { 'Authorization': cookies.get('jwt') } });
  },
  update: function (id, obj) {
    return axios.put(`/api/users/mydata/${id}`, obj, { 'headers': { 'Authorization': cookies.get('jwt') } });
  }
};
