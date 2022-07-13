import React, { useState } from "react";
//import React, { useContext } from "react";
//import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
//import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
//import './styles/components/_navbar.scss';
import './NavbarVerticale.css';
//import LoginRounded from '@mui/icons-material/LoginRounded';


const NavbarVerticale = () => {

    const [userstatut, setUserStatut] = useState(false);
    setUserStatut(localStorage.getItem("isAdmin"))


    return (
        <nav>
            {userstatut  &&
                <div className="nav-container">
                    <ul className="nav-ul-titre">
                        <li className="welcome">
                            <NavLink exact to="/profil">
                                <h5>Réseau social {/*  {userData.pseudo}  */}</h5>
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="nav-ul-login">
                        <li>
                            <NavLink exact to="/profil">
                                <Logout />
                            </NavLink>
                        </li>
                    </ul>
                </div>
            }
        </nav>
    );
};

export default NavbarVerticale;