import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../services/post-service";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./post.css";

const Postcomponent = ({ currentUser }) => {
  let [message, setMessage] = useState("");
  // 導覽功能
  const nav = useNavigate();
  const handleTakeToLogin = () => {
    nav("/login");
  };
  // 用於進頁面時查看的資料前置
  const [postData, setPostData] = useState(null);
  // 用於更新資料的狀態和邏輯
  const [selectedPost, setSelectedPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // 2個Model (刪除和更新的Model) 開關觸發
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (post) => {
    setSelectedPost(post);
    setShowDelete(true);
  };

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (post) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      description: post.description,
    });
    setShowEdit(true);
  };

  // 進頁面時查看已發的文章
  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      PostService.get(_id)
        .then((data) => {
          setPostData(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [currentUser]);

  // 刪除按鈕的功能
  const handleDelete = () => {
    if (selectedPost) {
      PostService.deletePost(selectedPost._id)
        .then(() => {
          setPostData((prevData) =>
            prevData.filter((post) => post._id !== selectedPost._id)
          );
          handleCloseDelete();
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  // 更新按鈕的功能
  const handleUpdate = () => {
    if (selectedPost) {
      PostService.updatePost(selectedPost._id, formData)
        .then(() => {
          setPostData((prevData) =>
            prevData.map((post) =>
              post._id === selectedPost._id ? { ...post, ...formData } : post
            )
          );
          handleCloseEdit();
        })
        .catch((error) => {
          console.log(error.response);
          setMessage(error.response.data);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="my-post-top">
      {!currentUser && (
        <div>
          <p>需先登入</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            登入
          </button>
        </div>
      )}

      {/* // 登入後 & 符合身份條件 才會顯示 */}
      <div className="my-post">
        <div className="post-box">
          <div className="box-name">My Post</div>
          <br />

          {currentUser && postData && postData.length !== 0 && (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {postData.map((post) => {
                return (
                  <div
                    key={post._id}
                    className="card w-100"
                    style={{ margin: "0.3rem" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Title:{post.title}</h5>
                      <p style={{ marginBottom: "2rem" }} className="card-text">
                        {post.description}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        Follow: {post.viewer.length}
                      </p>
                      {currentUser && currentUser.user.role === "member" && (
                        <div>
                          <Button
                            variant="danger"
                            onClick={() => handleShowDelete(post)}
                          >
                            Delete
                          </Button>
                          <Button
                            style={{ margin: "0.5rem 1rem" }}
                            variant="primary"
                            onClick={() => handleShowEdit(post)}
                          >
                            Edit
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 刪除框 */}
      <Modal show={showDelete} onHide={handleCloseDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 編輯框 */}
      <Modal show={showEdit} onHide={handleCloseEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div style={{ margin: "1rem 0rem" }}>
              <label>Title:</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ margin: "1rem 0rem" }}>
              <label for="exampleforContent">Description:</label>
              <textarea
                className="form-control"
                id="exampleforContent"
                aria-describedby="emailHelp"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </form>
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="danger" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Postcomponent;
