import React from 'react'
import './NoUserPrompt.css'
import {useNavigate} from 'react-router-dom'

const NoUserPrompt = () => {
  const navigate = useNavigate()

  const handleClick = (to)=> {
    navigate(to)
  }
  return (
    <div className="dialog no-user-prompt-bg">
      <div className="dialog-card no-user-prompt-card">
        <div className="no-user-prompt-card-top">
          <img
            src="/images/movie-poster-collage.jpg"
            className="no-user-prompt-card-img"
          />
          <div className="no-user-prompt-card-top-overlay">
            <h1 className="no-user-prompt-card-top-text">
              Let's get you an account first
            </h1>
            <h4 className="no-user-prompt-card-top-sub-text sub-text">
              Please sign up or log in to continue. We've got thousands of free
              movies, tv series and alot of genre to choose from!
            </h4>
          </div>
        </div>
        <div className="no-user-prompt-card-bottom">
          <button
            className="btn no-user-prompt-card-bottom-btn"
            onClick={() => handleClick("/signup")}
          >
            <h4>Sign up</h4>
          </button>
          <h4
            className="no-user-prompt-card-bottom-text"
            onClick={() => handleClick("/login")}
          >
            Already have an account?
            <span className="link-text no-user-prompt-card-bottom-link-text">
              Login
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default NoUserPrompt