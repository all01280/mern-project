import "./profile.css";
import React, { useState, useEffect } from "react";
import ProfileService from "../services/profile-service";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  let [message, setMessage] = useState("");
  // 用於更新用戶資料的狀態
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileData, setProfileData] = useState({
    username: "",
  });
  // Modal的開關
  const [showEdit, setShowEdit] = useState(false);

  // Modal開關時的更新
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (currentUser) => {
    setSelectedProfile(currentUser);
    setProfileData({
      username: currentUser.user.username,
    });
    setShowEdit(true);
  };

  // 更新按鈕的功能
  const handleUpdate = () => {
    if (selectedProfile) {
      ProfileService.updateProfile(selectedProfile.user._id, profileData)
        .then(() => {
          // 更新本地用戶資料
          currentUser.user.username = profileData.username; // 更新用戶名
          handleCloseEdit();
        })
        .catch((error) => {
          console.log(error.response);
          setMessage(error.response?.data?.message || "發生錯誤");
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      {!currentUser && <div>您必須先登錄。</div>}
      {currentUser && (
        <div className="profile-top">
          <div className="profile-box">
            <h2>Profile：</h2>

            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <strong>Name： {currentUser.user.username}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>ID: {currentUser.user._id}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Email: {currentUser.user.email}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <Button
              style={{ margin: "0.5rem 1rem" }}
              variant="primary"
              onClick={() => handleShowEdit(currentUser)}
            >
              Edit
            </Button>
          </div>
        </div>
      )}

      {/* 編輯框 */}
      <Modal show={showEdit} onHide={handleCloseEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div style={{ margin: "1rem 0rem" }}>
              <label>New Username:</label>
              <input
                className="form-control"
                type="text"
                name="username"
                value={profileData.username}
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

export default ProfileComponent;
