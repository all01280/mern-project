import axios from "axios";
const API_URL = "http://localhost:8080/api/search";

class SearchService {
  // 尋找All 功能
  getAll() {
    return axios.get(API_URL);
  }

  // 用ID尋找Post資料(2-5)
  getPostByName(name) {
    return axios.get(API_URL + "/findByName/" + name);
  }
}

export default new SearchService();
