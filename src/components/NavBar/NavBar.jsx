import React, { useState, useRef } from "react";
import "./NavBar.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "/images/logo.png";
import BottomNavOthers from "../BottomNavOthers/BottomNavOthers";

const navItem = [
  {
    name: "Home",
    to: "/",
    iconName: "fa-home",
    iconPath: "home-1",
    type: "nav",
  },
  {
    name: "Tv Series",
    to: "/tv",
    iconName: "fa-tv",
    type: "nav",
  },
  {
    name: "Movies",
    to: "/movie",
    iconName: "fa-film",
    type: "nav",
  },
  {
    name: "Discover",
    to: "/discover",
    iconName: "fa-compass",
    type: "nav",
  },
  {
    name: "Community",
    to: "/community",
    iconName: "fa-user-group",
    type: "nav-shortcut",
  },
  {
    name: "Wallpapers",
    to: "/wallpaper",
    iconName: "fa-images",
    type: "nav-shortcut",
  },
  {
    name: "Saved",
    component: "bookmarked",
    iconName: "fa-bookmark",
    type: "nav-shortcut",
  },
  {
    name: "Settings",
    component: "settings",
    iconName: "fa-gear",
    type: "nav-shortcut",
  },
];

const NavBar = () => {
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const headerRef = useRef(null);

  const [showCategory, setShowCategory] = useState(false);

  const changeToggle = () => {
    setToggle(!toggle);
  };

  const active = navItem.findIndex((e) => e.to === pathname);

  return (
    <nav
      ref={headerRef}
      className={toggle ? "active" : ""}
      onClick={() => {
        if (toggle) {
          changeToggle();
        }
      }}
    >
      {toggle && (
        <BottomNavOthers
          navData={navItem}
          closeMoreNav={(close) => setToggle(close)}
        />
      )}
      <div id="nav-bg" className={toggle ? "active" : ""}>
        <img src={logo} alt="HypaTv" id="nav-logo" />

        {/* <ul className="nav-list"> */}
        {navItem.map((e, i) => {
          // if (e.type === "nav") {
          return (
            <li key={i} className={`nav-item ${e.type}`}>
              <span
                onClick={() =>
                  e.to ? pathname !== e.to && navigate(e.to) : null
                }
                className={`nav-tile ${e.type} ${active === i ? "active" : ""}`}
              >
                {/* <span >{`/icons/${e.iconPath}.svg`}</span> */}
                <i
                  className={`fa-solid ${e.iconName} medium-icon`}
                  id="nav-icon"
                ></i>
                <h6
                  className={`nav-text single-line-text sub-text ${
                    toggle ? "active" : ""
                  }`}
                >
                  {e.name}
                </h6>
              </span>
            </li>
          );
          // }
        })}

        <span className="weight nav-weight"></span>

        <li className="nav-item">
          <span className="nav-tile" onClick={changeToggle}>
            <i
              className={`fa-solid fa-${
                toggle == true ? "xmark" : "bars"
              } medium-icon menu-icon`}
              id="nav-icon"
            ></i>
            <h6
              className={`nav-text single-line-text ${toggle ? "active" : ""}`}
            >
              {toggle ? "Close menu" : "Menu"}
            </h6>
          </span>
        </li>
      </div>
    </nav>
  );
};

export default NavBar;
