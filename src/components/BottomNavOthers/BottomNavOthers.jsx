import React from "react";
import "./BottomNavOthers.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BottomNavOthers = ({ navData, closeMoreNav }) => {

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleClose = () => {
    setIsClosing(true);
    closeMoreNav(true);
    setTimeout(() => {
    }, 500);
  };

  return (
    <div id="bottom-nav-others" className="dialog">
      <div className={`bottom-nav-bg`}>
        <h5 className="bottom-nav-header">More navigations</h5>
        <div className="other-bottom-nav">
          {navData.map((navItem, i) => {
            if (navItem.type === "nav-shortcut")
              return (
                <div className="other-nav-tile" key={i} onClick={()=>{navigate(navItem.to && navItem.to);}}>
                  <i className={`fa-solid ${navItem.iconName} medium-icon`}></i>
                  <h5 className="other-nav-text">{navItem.name}</h5>
                  <i className="fa-regular fa-location-pin"></i>
                </div>
              );
          })}
        </div>
        <button
          className="bottom-nav-dismiss btn"
          onClick={handleClose}
        >
          <h5>Close</h5>
        </button>
      </div>
    </div>
  );
};

export default BottomNavOthers;
