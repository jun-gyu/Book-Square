import axios from 'axios';

export const signIn = ({ email, password }) =>
  axios.post("http://localhost:3002/users/signIn", { email, password });

export const signUp = ({ name, email, password }) =>
  axios.post("http://localhost:3002/users/signUp", { name, email, password });

export const check = (token) =>
  axios.get("http://localhost:3002/users/loggedInUserInfo", {
    headers: {
      Authorization: token
    },
  });

export const signOut = () => 
  axios.post("http://localhost:3002/users/signOut")
  .then(res => console.log(res
    ))