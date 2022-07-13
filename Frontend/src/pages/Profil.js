import React from 'react';
//import React, { useContext } from "react";
import Log from "../components/Log";
//import { UidContext } from "../components/AppContext";
import "./Profil.css"


const Profil = () => {
  //const uid = useContext(UidContext);

  return (
    <div className="profil-page">      
        <div className="log-container">
          <Log signin={false} signup={true} /> {/* info = props ds Log/index.js 
          <div className="img-container">
            <img src="./img/log.svg" alt="img-log" />
          </div> */}
        </div>
    </div>
  );
};

export default Profil;