import React from "react";
//import React, { useContext } from "react";
//import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
//import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
//import './styles/components/_navbar.scss';
import './Navbar.css';
//import LoginRounded from '@mui/icons-material/LoginRounded';

const Navbar = () => {
  //const uid = useContext(UidContext);
  //const userData = useSelector((state) => state.userReducer);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/">
            <div className="logo">
              <img src="/img/icon.svg" alt="icon" />
              <div className="titres-entête">
                <h3>Groupomania</h3>
                <h5>Réseau social</h5>
              </div>
            </div>
          </NavLink>
        </div>
        <ul className="nav-ul-login">
          <li>
            <NavLink exact to="/profil">
              <Logout />
            </NavLink>
          </li>
        </ul>
        <ul className="nav-ul-login">
          <li>
            <NavLink exact to="/profil">
              <h5>LOGIN</h5>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;