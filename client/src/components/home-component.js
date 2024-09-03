import React from "react";
import { Link } from "react-router-dom";

const HomeComponent = ({ currentUser, setCurrentUser }) => {
  return (
    <main>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">ShareYourStory</h1>
            <p className="col-md-8 fs-4">
              ShareYourStory is a platform designed for every user to publish
              their articles, whether you are an experienced writer or a
              newcomer just stepping into the world of writing. We welcome you
              to share your stories and insights here.
            </p>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          {!currentUser && (
            <div className="col-md-6">
              <div className="h-100 p-5 text-white bg-dark rounded-3">
                <h2>Join Us</h2>
                <p>
                  Sign up now to start your writing journey and let’s make every
                  story heard together!
                </p>
                <button className="btn btn-outline-light" type="button">
                  <Link className="nav-link" to="/login">
                    Sign up
                  </Link>
                </button>
              </div>
            </div>
          )}
          {currentUser && (
            <div className="col-md-6">
              <div className="h-100 p-5 text-white bg-dark rounded-3">
                <h2>Post Viewing</h2>
                <p>
                  Explore a diverse collection of articles from other users.
                  Discover new perspectives and gain inspiration from stories
                  shared by fellow writers.
                </p>
                <button className="btn btn-outline-light" type="button">
                  <Link className="nav-link" to="/postList">
                    Post list
                  </Link>
                </button>
              </div>
            </div>
          )}
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>Let Every Story Be Heard</h2>
              <p>
                Whether you're writing poetry, short articles, or long stories,
                we offer an intuitive editor that makes your creative process
                enjoyable and effortless.
              </p>
              <button className="btn btn-outline-secondary" type="button">
                Share Story
              </button>
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top"></footer>
      </div>
    </main>
  );
};

export default HomeComponent;
