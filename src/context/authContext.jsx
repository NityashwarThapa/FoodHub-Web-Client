import axios from "../axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authUser, setAuthUser] = useState();
  const [profileDetail, setProfileDetail] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(() => localStorage.getItem('_hw_userDetails') ? JSON.parse(localStorage.getItem('_hw_userDetails')) : "");

  const token = localStorage.getItem('_hw_token')

  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem('_hw_userDetails')))
    if (token) {
      setIsAuthenticated(true)
    } else setIsAuthenticated(false)
  }, [localStorage.getItem('_hw_userDetails')])


  // const checkUser = async () => {
  //   try {
  //     let result = await axios.get("users/get-my-profile");
  //     setProfileDetail(result.data.data);
  //     setUserDetails(result.data.data);
  //     setIsAuthenticated(true);
  //   } catch (ERR) {
  //     if (ERR.response.status === 401 || ERR.response.status === 422) {
  //       localStorage.removeItem("_hw_token");
  //       localStorage.removeItem("_mallUserDetails_");
  //       setIsAuthenticated(false);
  //       swal({
  //         title: "Session Expired",
  //         text: "Please Login Again?",
  //         icon: "info",
  //         dangerMode: true,
  //         buttons: true,
  //       }).then(async (willUpdate) => {
  //         if (willUpdate) {
  //           navigate("/login");
  //         }
  //       });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   localStorage.getItem("_hw_token") && checkUser();
  // }, [localStorage.getItem("_hw_token")]);

  // let user;
  // let details;
  // if (typeof window !== "undefined") {
  //   // Perform localStorage action
  //   user = localStorage.getItem("_hw_token");
  //   details = JSON.parse(localStorage.getItem("_mallUserDetails_"));
  // }

  // set the initial state for authenticated status

  // useEffect(() => {
  //   switch (user) {
  //     case null:
  //       return setIsAuthenticated(false);
  //     default:
  //       return setIsAuthenticated(true);
  //   }
  // }, [user]);

  // set the initial state for authenticated user
  // const [authUser, setAuthUser] = useState(() => {
  //   return user !== null ? user : {};
  // });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        authUser,
        setAuthUser,
        userDetails,
        setUserDetails,
        // details,
        profileDetail,
        setProfileDetail
        // userRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
