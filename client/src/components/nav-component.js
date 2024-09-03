import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth-service";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    // 清空Local storage
    AuthService.logout();
    window.alert("登出成功");
    setCurrentUser(null);
  };

  return (
    <div>
      <nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                </li>

                {/* 登入前才會顯示 */}
                {!currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Sign Up
                    </Link>
                  </li>
                )}

                {!currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                )}

                {currentUser && (
                  <li className="nav-item">
                    <Link onClick={handleLogout} className="nav-link" to="/">
                      Log Out
                    </Link>
                  </li>
                )}

                {currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                )}

                {currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/post">
                      My Post
                    </Link>
                  </li>
                )}

                {currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/followPost">
                      Follow Post
                    </Link>
                  </li>
                )}

                {/* // 登入後 & 符合身份條件 才會顯示 */}
                {currentUser && currentUser.user.role === "member" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/createPost">
                      Create Post
                    </Link>
                  </li>
                )}

                <li className="nav-item">
                  <Link className="nav-link" to="/postList">
                    Post list
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default NavComponent;
