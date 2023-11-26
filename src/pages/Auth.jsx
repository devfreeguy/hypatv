import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Auth.css";
import React, { useState, useEffect, useRef } from "react";
import { signin, signup } from "../config/firebaseConfig";
import CustomAlerts from "../components/CustomAlert/CustomAlerts";
import Loading from "../components/Loading";
import ProfileInfo from "../components/ProfileInfo/ProfileInfo";

const Auth = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate()
  // const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [moreInfo, setMoreInfo] = useState(true);
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [cpassword, setCpassword] = useState("");

  useEffect(() => {
    pathname === "/signup" ? setMode("signup") : setMode("login");
  }, []);

  useEffect(() => {}, [error]);

  const switchMode = () => {
    mode === "signup" ? setMode("login") : setMode("signup");
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    try {
      event.preventDefault();
    } catch {
      Event.preventDefault();
    }
    if (mode === "signup") {
      if (email && password && cpassword) {
        if (password === cpassword) {
          setLoading(true);
          await signup(email, password, (success, message) => {
            setLoading(false);
            // Do something on
            if (success) {
              alert("Signup successful");
            } else {
              console.log(message);
            }
          });
        } else {
          setError("Passwords does not match!");
        }
      } else {
        setError("All fields are requred!");
      }
    } else {
      if (email && password) {
        setLoading(true);
        await signin(email, password, (success, message) => {
          // Do something on
          setLoading(false);
          if (success) {
            navigate('/')
          } else {
            console.log(message);
          }
        });
      } else {
        setLoading(false);
        setError("All fields are requred!");
      }
    }
  };

  return (
    <section id="auth-section">
      {loading && <Loading />}
      {moreInfo && <ProfileInfo />}
      {error && (
        <CustomAlerts
          title="An error occured"
          message={error}
          button={{
            positive: {
              text: "close",
              perform: () => {
                setError("");
              },
            },
          }}
        />
      )}
      <div id="auth-card-bg" className="dialog-card">
        <h1 id="auth-top-text">
          {mode === "signup" ? "Hey, Welcome" : "Welcome back"}
        </h1>
        <p id="auth-sub-text" className="sub-text">
          Please fill in required data
        </p>
        <form className="dialog-form">
          {/* {mode === "signup" && (
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
          )} */}

          <label htmlFor="auth-email">
            <span className="auth-input-feilds secondary-btn">
              <i className="fa-duotone fa-envelope normal-icon"></i>
              <input
                type="email"
                value={email}
                id="auth-email"
                placeholder="Email address"
                className="auth-inputs"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </span>
          </label>

          <label htmlFor="auth-password">
            <span className="auth-input-feilds secondary-btn">
              <i className="fa-duotone fa-unlock normal-icon"></i>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                id="auth-password"
                placeholder="Password"
                className="auth-inputs"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <i
                className={`fa-solid fa-${
                  showPassword ? "eye-slash" : "eye"
                } small-icon`}
                onClick={() => {
                  togglePassword();
                }}
              ></i>
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
                  type={showPassword ? "text" : "password"}
                  value={cpassword}
                  id="auth-cpassword"
                  placeholder="Confirm password"
                  className="auth-inputs"
                  onChange={(e) => {
                    setCpassword(e.target.value);
                  }}
                />
              </span>
            </label>
          )}

          <button
            className="btn auth-btn"
            type="submit"
            onClick={handleSubmit}
          >
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
