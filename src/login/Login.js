import React, { useEffect, useState } from "react";
// import { signinUser } from "../feature/userSlice";
import "../login/Login.css";
import { Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../serves";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  const handelsubmit = (e) => {
    loginUser(email, password)
      .then((res) => {
        // console.log(res.data);
        localStorage.setItem("token", res.data.token);
        Navigate("../user");
      })
      .catch((err) => {
        console.log(err);
      });

    setEmail("");
    setPassword("");
    navigation("/user");
  };

  return (
    <div className="login-form ">
      <h1 className="login-tiitle">Signin</h1>
      <form onSubmit={handelsubmit}>
        <div className="inpur-field">
          <div className="input-email">
            <label>Email</label>
            <input
              required
              type="email"
              placeholder="Enter email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-pwd">
            <label>Password</label>
            <input
              required
              type="password"
              placeholder="Enter password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="sub-btn">
            <button className="btn">Submit</button>
          </div>
        </div>
      </form>
      {/* {res?.data} */}
    </div>
  );
};
export default Login;
