import React from 'react'
import User from './User';
import GetAllUsers from "../../context/GetAllUsers";

function Users() {

  const [allUsers, loading] = GetAllUsers();
  // console.log(allUsers);

  return (
    <div style={{ maxHeight: "calc(80vh)" }} className=" py-2 overflow-y-auto">
      {allUsers.map((user, index) => {
        return <User key={index} user={user} />;
      })}
    </div>
  );
}

export default Users
