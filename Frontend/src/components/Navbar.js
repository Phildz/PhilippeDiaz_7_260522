import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Log/Logout";
import './Navbar.css';

const Navbar = () => {
  
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");

  return (
    <nav>
      <div className="nav-container">
        <div className="user-email">
          {email}
        </div>
        <div className="logo">
          <NavLink exact to="/">
            <div className="logo">
              <img src="/img/icon.svg" alt="icon" />
              <div className="titres-entête">
                <h3>Groupomania</h3>
              </div>
            </div>
          </NavLink>
        </div>
        { userId ?
        <>
          <ul className="nav-ul-login"> {/* Logout */}
          <li>
            <NavLink exact to="/profil">
              <Logout />
            </NavLink>
          </li>
        </ul>
        </>
        :
        <>
        <ul className="nav-ul-login">
          <li>
            <NavLink exact to="/signin">
              <h5>LOGIN</h5>
            </NavLink>
          </li>
        </ul>
        <ul className="nav-ul-register">
          <li>
            <NavLink to="/signup">
                <h5>SIGNUP</h5>
            </NavLink>
          </li>
        </ul>
        </>
        } 
      </div>
    </nav>
  );
};

export default Navbar;