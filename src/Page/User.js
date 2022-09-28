import React, { useEffect, useState } from "react";
import "../style/User.css";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { useGetAllUserQuery, useDeleteUserMutation } from "../feature/post";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import AddUser from "../Page/AddUser";
import Headers from "../Page/Header";

const User = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchUser, setSearchUser] = useState("");
  const [modelOpen, setModelOPen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [editUser, setEditUser] = useState();

  // Get User Data
  const { data, loading, refetch } = useGetAllUserQuery();
  // Delete post
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    if (data) {
      setUserList(data);
    }
  }, [data]);
  useEffect(() => {
    if (searchUser && data) {
      setUserList(
        data.filter((ud) =>
          ud.first_name
            ?.toLocaleLowerCase()
            .includes(searchUser.toLocaleLowerCase())
        )
      );
    } else {
      data && setUserList(data);
    }
  }, [searchUser]);

  const handelEdit = (id) => {
    const foundUser = userList.find((user) => user.id == id);
    setEditUser(foundUser);
    setModelOPen(true);
  };
  // const handelUpdate = () => {};
  if (loading || !data) return <div className="loading">Loading.....</div>;

  //  search User
  const search = [];
  const userPerPage = 6;
  const visitedUser = currentPage * userPerPage;
  const displayUser = userList.slice(visitedUser, visitedUser + userPerPage);
  const pageCount = Math.ceil(userList.length / userPerPage);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const closeModel = () => {
    setModelOPen(false);
    editUser && setEditUser(undefined);
    refetch();
  };
  const openCreateModel = () => {
    setModelOPen(true);
    setEditUser(undefined);
  };
  return (
    <div className="info">
      <h1 className="user-header">USER INFORMATION</h1>
      <Headers
        searchUser={searchUser}
        setSearchUser={setSearchUser}
        setOPen={openCreateModel}
      />

      <table className="user-info">
        <thead>
          <tr>
            <th>Company</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>email</th>
            <th>edit</th>
          </tr>
        </thead>
        <tbody>
          {displayUser?.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <Link to={`/user/${item.id}`} className="user-avatar">
                    <img
                      src={item.avatar}
                      alt="user-img"
                      className="user-img"
                    />
                  </Link>
                </td>
                <td>
                  <p>{item.first_name}</p>
                </td>
                <td>
                  <div>
                    <p>{item.last_name}</p>
                  </div>
                </td>
                <td>
                  <div>
                    <p>{item.email}</p>
                  </div>
                </td>
                <td>
                  <div className="icon">
                    <BiEdit
                      className="icon-style"
                      onClick={() => handelEdit(item.id)}
                    />
                    <MdDeleteOutline
                      className="icon-style"
                      onClick={() => {
                        deleteUser(item.id);
                        refetch();
                      }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={userPerPage}
        pageCount={pageCount}
        previousLabel="< previous"
        containerClassName=" paginationBttns "
      />

      {modelOpen && <AddUser closeModel={closeModel} user={editUser} />}
    </div>
  );
};

export default User;
