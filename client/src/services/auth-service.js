// 登入有關的功能 (2)
import axios from "axios";
const API_URL = "https://shareyourstory-api.onrender.com/api/user";

class AuthService {
  //登入 (3)
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  //登出
  logout() {
    localStorage.removeItem("user");
  }
  // 註冊部分
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
