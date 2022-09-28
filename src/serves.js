import axios from "axios";
export const loginUser = async (email, password) => {
  return await axios.post(`https://reqres.in/api/login`, {
    email: email,
    password: password,
  });
};
