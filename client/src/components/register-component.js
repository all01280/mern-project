import React, { useState } from "react";
import AuthService from "../services/auth-service";
import { useNavigate } from "react-router-dom";
import "./register.css";

const RegisterComponent = () => {
  // 導向登入頁
  const nav = useNavigate();

  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  // 用於新增使用者資料
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // 註冊功能
  const handleRegister = () => {
    AuthService.register(username, email, password)
      .then(() => {
        window.alert(
          "Registration successful. You will now be redirected to the login page."
        );
        nav("/login");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };

  return (
    <div className="register-top">
      <div className="register-box">
        {message && <div className="alert alert-danger">{message}</div>}
        <div>
          <label htmlFor="username">UserName:</label>
          <input
            onChange={handleUsername}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">Email：</label>
          <input
            onChange={handleEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password：</label>
          <input
            onChange={handlePassword}
            type="password"
            className="form-control"
            name="password"
            placeholder="Length must be at least 6 characters."
          />
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <span>Sign Up</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
