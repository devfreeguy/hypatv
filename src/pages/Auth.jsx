import { useLocation } from "react-router-dom";
import "../styles/Auth.css";

import React, { useState, useEffect } from "react";

const Auth = () => {

  const {pathname} = useLocation()
  const [mode, setMode] = useState("login");

  useEffect(()=>{
    console.log(pathname);
    pathname === "/signup" ? setMode("signup") : setMode("login");
  },[])

  const switchMode = () => {
    mode === "signup" ? setMode("login") : setMode("signup");
  };

  return (
    <section id="auth-section">
      <div id="auth-card-bg">
        <h1 id="auth-top-text">
          {mode === "signup" ? "Hey, Welcome" : "Welcome back"}
        </h1>
        <p id="auth-sub-text" className="sub-text">
          Please fill in required data
        </p>
        <form id="auth-form">
          {/* <span id="auth-warning-bg">
          <i className="fa-duotone fa-warning small-icon warning-text"></i>
          <h5 id="auth-warning-text" className="warning-text">
            Warning
          </h5>
        </span> */}

          {mode === "signup" && (
            <label htmlFor="auth-username">
              <span className="auth-input-feilds secondary-btn">
                <i className="fa-duotone fa-user normal-icon"></i>
                <input
                  type="textauth"
                  id="auth-username"
                  placeholder="Username"
                  className="auth-inputs"
                />
              </span>
            </label>
          )}

          <label htmlFor="auth-email">
            <span className="auth-input-feilds secondary-btn">
              <i className="fa-duotone fa-envelope normal-icon"></i>
              <input
                type="email"
                id="auth-email"
                placeholder="Email address"
                className="auth-inputs"
              />
            </span>
          </label>

          <label htmlFor="auth-password">
            <span className="auth-input-feilds secondary-btn">
              <i className="fa-duotone fa-unlock normal-icon"></i>
              <input
                type="password"
                id="auth-password"
                placeholder="Password"
                className="auth-inputs"
              />
              <i className="fa-solid fa-eye small-icon"></i>
            </span>
          </label>

          {mode === "login" && (
            <span id="auth-forgot">
              <h5 className="sub-text">Forgot password</h5>
              {/* <i className="fa-solid fa-question small-icon"></i> */}
            </span>
          )}

          {mode === "signup" && (
            <label htmlFor="auth-cpassword">
              <span className="auth-input-feilds secondary-btn">
                <i className="fa-duotone fa-lock normal-icon"></i>
                <input
                  type="password"
                  id="auth-cpassword"
                  placeholder="Confirm password"
                  className="auth-inputs"
                />
              </span>
            </label>
          )}

          <button id="auth-btn" className="btn">
            <h4>{mode === "signup" ? "Sign up" : "Sign in"}</h4>
          </button>
        </form>

        <h5 className="sub-text auth-or-text">or continue with</h5>
        <span id="auth-action-btns">
          <button id="other-platform-btn" className="flex-outlined-btn">
            <i className="fa-brands fa-google normal-icon"></i>
          </button>

          <button id="other-platform-btn" className="flex-outlined-btn">
            <i className="fa-brands fa-facebook normal-icon"></i>
          </button>

          <button
            id="switch-btn"
            className="flex-outlined-btn"
            onClick={switchMode}
          >
            <h4>{mode === "login" ? "Sign up" : "Sign in"}</h4>
          </button>
        </span>
        <div id="auth-action"></div>
      </div>
    </section>
  );
};

export default Auth;
