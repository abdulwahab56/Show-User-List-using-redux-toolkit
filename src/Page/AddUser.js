import React, { useEffect, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { useCreateUserMutation, useUpdateUserMutation } from "../feature/post";
import "../style/AddUser.css";

const AddUser = ({ closeModel, user }) => {
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [error, setError] = useState("");
  const [addUser, setAddUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  });
  useEffect(() => {
    if (user) {
      setAddUser(user);
    }
  }, [user]);
  function textAdd(e) {
    setAddUser({
      ...addUser,
      [e.target.name]: e.target.value,
    });
    // console.log(setAddUser);
  }

  const handelSubmited = (e) => {
    setError("");
    e.preventDefault();
    user
      ? updateUser(addUser).then((res) => {
          res.error ? setError(res.error?.status) : closeModel();
        })
      : createUser(addUser).then((res) => {
          res.error ? setError(res.error?.status) : closeModel();
        });
  };
  return (
    <>
      <div
        onClick={() => {
          closeModel();
        }}
        className="overlay"
      ></div>
      <div className="add-recipe-window">
        <button
          onClick={() => {
            closeModel();
          }}
          className="btn--close-modal"
        >
          &times;
        </button>
        <form className="upload" onSubmit={handelSubmited}>
          <div className="upload__column">
            <h3 className="upload__heading">User Data </h3>
            <label>Email</label>
            <input
              required
              name="email"
              type="email"
              value={addUser.email}
              onChange={(e) => textAdd(e)}
            />
            <label>First name</label>
            <input
              required
              name="first_name"
              value={addUser.first_name}
              type="text"
              onChange={(e) => textAdd(e)}
            />
            <label>Last name</label>
            <input
              required
              name="last_name"
              type="text"
              value={addUser.last_name}
              onChange={(e) => textAdd(e)}
            />
            <label>Avatar URL</label>
            <input
              required
              name="avatar"
              type="url"
              value={addUser.avatar}
              onChange={(e) => textAdd(e)}
            />
          </div>
          {error && <span className="err-msg">{error}</span>}
          <button className="btn upload__btn">
            <span>{user ? "Update User" : "Add User"}</span>
          </button>
        </form>

        <div />
      </div>
    </>
  );
};

export default AddUser;
