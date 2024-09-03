import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../services/post-service";

const FollowPostcomponent = ({ currentUser, setCurrentUser }) => {
  // 導覽功能
  const nav = useNavigate();
  const handleTakeToLogin = () => {
    nav("/login");
  };
  // 用於進頁面時查看的資料前置
  const [postData, setPostData] = useState(null);

  // 進頁面時馬上查看資料
  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;

      PostService.getEnrolledPost(_id)
        .then((data) => {
          console.log(data);
          setPostData(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [currentUser]);

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
          <div className="box-name">Followed Post</div>
          <br />

          {currentUser && postData && postData.length != 0 && (
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
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowPostcomponent;
