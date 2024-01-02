import React, { useState, useEffect, useRef } from "react";
import Logo from "../../assets/logo.png";
import logo from "/images/logo.png";
import "./Header.css";
import { useLocation, useNavigate } from "react-router-dom";
import ActionCard from "../ActionCard/ActionCard";
import SearchBar from "../SearchBar/SearchBar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("/images/profile.png");
  const [displayHeader, setDisplayHeader] = useState(false);
  const [redZone, setRedZone] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrollEffect, setScrollEffect] = useState("");
  const [actionCard, setActionCard] = useState(false);

  useEffect(() => {
    const shrinkheader = () => {
      if (
        document.body.scrollTop > 10 ||
        document.documentElement.scrollTop > 10
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

  useEffect(() => {
    setRedZone(redZone);
  }, [redZone]);

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
        <div className="containerf" id="container">
          <div id="HeaderAction">
            {redZone && (
              <i
                className="fa-solid fa-arrow-left normal-icon relative-btn"
                onClick={goBack}
              ></i>
            )}
            {/* <img src={logo} alt="HypaTv" id="header-logo" /> */}
            <Breadcrumb />
          </div>

          <div className="header-action-box">
            {!pathname.includes("/search") && <SearchBar />}
            {isLoggedIn ? (
              <img
                src={profilePic}
                alt="Profile"
                id="profile"
                onClick={handleProfileClick}
              />
            ) : (
              <button
                className="relative-btn"
                onClick={() => navigate("login")}
              >
                <p>Sign in</p>
              </button>
            )}
          </div>
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
