import React, { useState, useEffect, useRef } from "react";
import Logo from "../../assets/logo.png";
import "./Header.css";
import NavBar from "../NavBar/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import ActionCard from "../ActionCard/ActionCard";
import { savedUserdata } from "../../config/config";
import { handleMenu, openMoreOption } from "../../pages/Details";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [profilePic, setProfilePic] = useState("/images/profile.png");
  const [displayHeader, setDisplayHeader] = useState(false);
  const [redZone, setRedZone] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrollEffect, setScrollEffect] = useState("");
  const [actionCard, setActionCard] = useState(false);

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
    setDisplayHeader(
      pathname !== "/login" &&
        pathname !== "/signup" &&
        pathname !== "/more-info"
    );
    setRedZone(
      pathname.includes("/tv/details/") || pathname.includes("/movie/details/")
    );
    if (JSON.parse(sessionStorage.getItem("usersdata")) !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
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

  const handleProfileClick = () => {
    if (sessionStorage.getItem("usersdata") === null) {
      navigate("/login");
    } else {
      setActionCard(!actionCard);
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

          {isLoggedIn ? (
            <div className="header-action-box">
              <i className="fa-solid fa-bookmark medium-icon secondary-btn"></i>
              <i className="fa-solid fa-ellipsis-vertical medium-icon secondary-btn" onClick={()=>{handleMenu(!openMoreOption)}}></i>
              {(!pathname.includes("/tv/details/") &&
                !pathname.includes("/movie/details/")) && (
                  <img
                    src={profilePic}
                    alt="Profile"
                    id="profile"
                    onClick={handleProfileClick}
                  />
                )}
            </div>
          ) : (
            <button className="secondary-btn" onClick={() => navigate("login")}>
              <h4>Sign in</h4>
            </button>
          )}
        </div>
        {actionCard && isLoggedIn && (
          <ActionCard
            close={() => {
              setActionCard(false);
            }}
          />
        )}
      </header>
    );
  }
};

export default Header;
