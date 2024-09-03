import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../services/post-service";
import SearchService from "../services/search-service";
import "./postList.css";

const PostListComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    SearchService.getPostByName(searchInput)
      .then((data) => {
        setSearchResult(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // (2-6)
  const handleEnroll = (e) => {
    PostService.enroll(e.target.id)
      .then(() => {
        window.alert("Followed Post");
        //navigate("/post");
      })
      .catch((e) => {
        window.alert("Cannot follow again");
        console.log(e);
      });
  };

  // 尋找所有
  useEffect(() => {
    SearchService.getAll()
      .then((data) => {
        setSearchResult(data.data);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="post-list">
      <div className="search input-group mb-3">
        <input
          type="text"
          /* className="form-control" */
          onChange={handleChangeInput}
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>
      <div className="list">
        <div className="list-box">
          <p className="list-name">List:</p>
          <br />
          {searchResult && searchResult.length != 0 && (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {searchResult.map((post) => {
                return (
                  <div
                    key={post._id}
                    className="card w-100"
                    style={{ margin: "0.3rem" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Title: {post.title}</h5>
                      <p style={{ marginBottom: "2rem" }} className="card-text">
                        {post.description}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        Followers: {post.viewer.length}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        poster: {post.poster.username}
                      </p>
                      {currentUser && (
                        <a
                          href="#"
                          id={post._id}
                          className="card-text btn btn-primary"
                          onClick={handleEnroll}
                        >
                          Follow
                        </a>
                      )}
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

export default PostListComponent;
