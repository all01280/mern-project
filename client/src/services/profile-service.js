import axios from "axios";
const API_URL = "https://shareyourstory-api.onrender.com/api/profile";
//const API_URL = "http://localhost:8080/api/profile";

class ProfileService {
  // poster 更新文章功能
  updateProfile(_id, updatedData) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.patch(API_URL + "/" + _id, updatedData, {
      headers: {
        Authorization: token,
      },
    });
  }
}

// 將實例分配給變量
const profileServiceInstance = new ProfileService();
export default profileServiceInstance; // 將變量導出
