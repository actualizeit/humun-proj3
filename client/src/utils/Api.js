import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error);
  throw error;
}

function parseJSON(response) {
  return response.json();
}

export default { 
  search: function(query, cb) {
    return fetch(`api/food?q=${query}`, {
      accept: "application/json"
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
  },
  register: function(userData) {
    return axios.post("/api/users/register", userData);
  },
  login: function(userData) {
    return axios.post("/api/users/login", userData);
  },
  logout: function(event) {
    event.preventDefault();
    cookies.set('jwt', '', { path: '/' });
  },
  test: function() {
    return axios.get("/api/users/test", { 'headers': { 'Authorization': cookies.get('jwt') }});
  }
};
