import React from "react";
import axios from "axios";
import cookie from "js-cookie";

const Logout = () => {
  //localStorage.clear();
 
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios({
      method: "get",
      url: `http://localhost:3001/api/auth/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));
    
    window.location = "/";
    localStorage.clear();
  };

  return (
    <li onClick={logout}>
      <h5>LOGOUT</h5>      
    </li>
  );
};

export default Logout;