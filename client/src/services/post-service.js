import axios from "axios";
const API_URL = "https://shareyourstory-api.onrender.com/api/post";

class PostService {
  // 新增文章
  post(title, description) {
    let token;
    // 用於查看登入狀態 有登入才能使用
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL,
      { title, description },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  // poster 更新文章功能
  updatePost(_id, updatedData) {
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

  // poster 刪除文章
  deletePost(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.delete(API_URL + "/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  // 用戶以id來尋找關注過的文章
  getEnrolledPost(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/viewer/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  // poster 使用poster id 以找到poster擁有的文章
  get(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/poster/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  // 尋找All 功能
  getAll() {
    /*     let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL, {
      headers: {
        Authorization: token,
      },
    }); */

    return axios
      .get(API_URL)
      .then((response) => {
        return response.data; // 返回數據
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error; // 僅在需要時拋出錯誤
      });
  }

  // 用ID尋找Post資料(2-5)
  getPostByName(name) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/findByName/" + name, {
      headers: {
        Authorization: token,
      },
    });
  }
  // 用戶關注文章(2-6)
  enroll(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/list/" + _id,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

// 將實例分配給變量
const postServiceInstance = new PostService();
export default postServiceInstance; // 將變量導出
