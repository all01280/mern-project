import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../services/post-service";
import "./createPost.css";

const CreatePostComponent = ({ currentUser, setCurrentUser }) => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDesciption = (e) => {
    setDescription(e.target.value);
  };

  const postCreate = () => {
    PostService.post(title, description)
      .then(() => {
        //window.alert("新文章已創建成功");
        navigate("/post");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div className="create" style={{ padding: "3rem 0rem" }}>
      {!currentUser && (
        <div>
          <p>在發布新文章之前，您必須先登錄。</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            帶我進入登錄頁面。
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === "member" && (
        <div className="form-group">
          <label for="exampleforTitle">Title：</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            onChange={handleChangeTitle}
          />
          <br />
          <label for="exampleforContent">description：</label>
          <textarea
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            name="content"
            onChange={handleChangeDesciption}
          />
          <br />
          <button className="btn btn-primary" onClick={postCreate}>
            Post
          </button>
          <br />
          <br />
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatePostComponent;
