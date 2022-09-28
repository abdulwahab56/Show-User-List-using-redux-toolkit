import React from "react";
import { BiSearch } from "react-icons/bi";

const Headers = ({ searchUser, setSearchUser, setOPen }) => {
  return (
    <div className="form-add">
      <div className="search-form">
        <input
          type="text"
          placeholder="search user data...."
          value={searchUser}
          onChange={(e) => {
            setSearchUser(e.target.value);
          }}
        />
        <BiSearch className="user-icon" />
      </div>
      <button
        className="btn"
        onClick={() => {
          setOPen(true);
        }}
      >
        Add User
      </button>
    </div>
  );
};

export default Headers;
