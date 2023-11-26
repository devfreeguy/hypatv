import React, { useState, useEffect, useRef } from "react";
import Logo from "../../assets/logo.png";
import "./Header.css";
import NavBar from "../NavBar/NavBar";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [profilePic, setProfilePic] = useState("/images/profile.png");
  const [displayHeader, setDisplayHeader] = useState(false);
  const [redZone, setRedZone] = useState(false);
  const [scrollEffect, setScrollEffect] = useState("");

  useEffect(() => {
    const shrinkheader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        setScrollEffect("shrink");
      } else {
        setScrollEffect("");
      }
    };
    window.addEventListener("scroll", shrinkheader);
    return () => {
      window.addEventListener("scroll", shrinkheader);
    };
  }, []);

  useEffect(() => {
    setDisplayHeader(pathname !== "/login" && pathname !== "/signup");
    setRedZone(
      pathname.includes("/tv/details/") || pathname.includes("/movie/details/")
    );
  }, [pathname]);

  const getMenuStatus = () => {
    setOpenMenu(!openMenu);
  };

  const goBack = () => {
    // Functions to go back
    if (redZone) {
      window.history.back();
    }
  };

  if (displayHeader) {
    return (
      <header className={scrollEffect != "" ? "shrink" : ""}>
        <div className="container" id="container">
          <div id="HeaderAction">
            {!redZone && (
              <i
                className={`fa-solid ${
                  openMenu ? "fa-close" : "fa-bars"
                } normal-icon mobile-props`}
                onClick={getMenuStatus}
              ></i>
            )}
            {redZone && (
              <i
                className="fa-solid fa-arrow-left normal-icon secondary-btn"
                onClick={goBack}
              ></i>
            )}
            {!redZone && <img src={Logo} alt="HypaTv" id="header-logo" />}
          </div>

          {!redZone && <NavBar toggle={openMenu} setToggle={getMenuStatus} />}

          <div className="header-action-box">
            <i className="fa-solid fa-bell normal-icon secondary-btn"></i>
            {/* <i className="fa-solid fa-user normal-icon secondary-btn"></i> */}
            <img src={profilePic} alt="Profile" id="profile" />
          </div>
        </div>
      </header>
    );
  }
};

export default Header;
