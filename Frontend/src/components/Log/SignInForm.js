import React, { useState } from "react";
import axios from "axios";
import './SignInForm.css';

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const loginError = document.querySelector(".login.error");

    axios({
      method: "post",      
      url: `http://localhost:3001/api/auth/login`,
      headers: {"Authorization" : "Bearer my-token"},
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        console.log("dans then post login");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("isAdmin", res.data.isAdmin);
        localStorage.setItem("email", res.data.email);
        
        if (res.data.errors) {
          loginError.innerHTML = res.data.errors;
        }else{
          window.location = "/home"; //utilisateur connecté
          loginError.innerHTML = "";
        } 
      })
      .catch((err) => {
        console.log(err.toString());
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <input className="btn-login" type="submit" value="Se connecter" />
      <br />
      <div className="login error"></div>
    </form>
  );
};

export default SignInForm;