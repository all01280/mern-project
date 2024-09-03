import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth-service";
import "./login.css";

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  //登入成功後的導向(3)
  const nav = useNavigate();

  //登入功能 (3)
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //登入功能 (3)
  const handleLogin = async () => {
    try {
      let response = await AuthService.login(email, password);
      // 如果登出會remove 這行的user資料
      localStorage.setItem("user", JSON.stringify(response.data));
      // window.alert("登入成功");
      setCurrentUser(AuthService.getCurrentUser());
      nav("/profile");
    } catch (e) {
      setMessage(e.response.data);
    }
  };

  return (
    <div className="login-top">
      <div className="login-box">
        {/* 回報錯誤message  */}
        {message && <div className="alert alert-danger">{message}</div>}
        <div className="form-group">
          <label htmlFor="username">Email：</label>
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
          />
        </div>
        <br />
        <div className="form-group">
          <button onClick={handleLogin} className="btn btn-primary btn-block">
            <span>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
