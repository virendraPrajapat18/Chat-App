import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialUserState =
    Cookies.get("jwt") || localStorage.getItem("ChatApp");
  // console.log("initialUserState", initialUserState);
  // console.log("jwt", Cookies.get("jwt"));
  // console.log("localstaorage", localStorage.getItem("ChatApp"));

  // parse the user data and storing in state.
  // const [authUser, setAuthUser] = useState(
  //   initialUserState ? JSON.parse(initialUserState) : undefined
  // );

  // let parsedUser;
  // try {
  //   parsedUser = initialUserState ? JSON.parse(initialUserState) : undefined;
  // } catch (error) {
  //   console.error("Invalid JSON:", initialUserState); // Debugging
  //   parsedUser = undefined; // Reset if parsing fails
  // }

  const [authUser, setAuthUser] = useState(initialUserState);

  // console.log("parsedUser",parsedUser);

  // const [authUser, setAuthUser] = useState(parsedUser);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// let parsedUser;
// try {
//   parsedUser = initialUserState ? JSON.parse(initialUserState) : undefined;
// } catch (error) {
//   console.error("Invalid JSON:", initialUserState); // Debugging
//   parsedUser = undefined; // Reset if parsing fails
// }

// const [authUser, setAuthUser] = useState(parsedUser);
