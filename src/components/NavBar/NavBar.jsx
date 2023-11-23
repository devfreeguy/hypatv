import React, { useState, useRef } from "react";
import "./NavBar.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { useLocation, useNavigate } from "react-router-dom";

const navItem = [
  {
    name: "Home",
    to: "/",
    iconName: "fa-home",
  },
  {
    name: "Tv Series",
    to: "/tv",
    iconName: "fa-tv",
  },
  {
    name: "Movies",
    to: "/movie",
    iconName: "fa-film",
  },
];

const NavBar = ({ toggle, setToggle }) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const headerRef = useRef(null);

  const [showCategory, setShowCategory] = useState(false);

  const changeShowCategory = () => {
    setShowCategory(!showCategory);
  };

  const active = navItem.findIndex((e) => e.to === pathname);

  return (
    <nav
      ref={headerRef}
      className={toggle ? "open" : "close"}
      onClick={setToggle}
    >
      <ul id="nav-list">
            {navItem.map((e, i) => {
              return (
                <li key={i} className="nav-item">
                  <span
                    onClick={() => pathname !== e.to && navigate(e.to)}
                    id="nav-tile"
                    className={active === i ? "active" : ""}
                  >
                    <i
                      className={`fa-solid ${e.iconName} medium-icon`}
                      id="nav-icon"
                    ></i>
                    <h4 key={e.name}>{e.name}</h4>
                  </span>
                </li>
              );
            })}
      </ul>
    </nav>
  );
};

export default NavBar;
