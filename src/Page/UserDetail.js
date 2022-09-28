import React from "react";
import { useParams } from "react-router-dom";
import "../style/UserDetail.css";
// import { userData } from "../userData";
import { useGetAllUserQuery } from "../feature/post";

const UserDetail = () => {
  const { id } = useParams();
  const userInfo = useGetAllUserQuery();
  const userdetail = userInfo?.data;

  const users = userdetail.find((user) => user.id === Number(id));

  console.log("Hello:", users);
  const { email, first_name, last_name, avatar } = users;
  return (
    <div className="user-detail">
      <img className="user-img-detail" src={avatar} alt="userimg" />
      <div className="user-detail-name">
        <p>{`First_name: ${first_name}`}</p>
        <p>{`Last_name: ${last_name}`}</p>
        <p>{`Email: ${email}`}</p>
      </div>
    </div>
  );
};

export default UserDetail;
