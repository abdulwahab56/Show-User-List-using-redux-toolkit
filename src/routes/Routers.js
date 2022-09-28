import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../login/Login";
import User from "../Page/User";
import UserDetail from "../Page/UserDetail";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user" element={<User />} />
      <Route path="/user/:id" element={<UserDetail />} />
    </Routes>
  );
};

export default Routers;
