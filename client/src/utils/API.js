import axios from "axios";
const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:4242";

export default {
  login: function(name, password) {
    return axios.post(
      `${burl}/users/login`,
      {
        name,
        password
      },
      {
        headers: headers
      }
    );
  },
  signup: function(send) {
    return axios.post(`${burl}/users/signup`, send, { headers: headers });
  },
  ListUser: function(send) {
    return axios.post(`${burl}/users/ListUser`, send, {headers: headers });
  },
  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },
  logout: function() {
    localStorage.clear();
  }
};