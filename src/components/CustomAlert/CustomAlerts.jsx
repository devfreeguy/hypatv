import React from "react";
import "./CustomAlerts.css";

const CustomAlerts = ({ type = "alert", title = "", message, button = {} }) => {
  return (
    <div className="custom-alert-bg">
      <div className="custom-dialog">
        <h3 className="custom-dialog-title">{title ? title : "Alert"}</h3>
        <h4 className="custom-dialog-title sub-text">{message}</h4>
        <span className="custom-dialog-btn-bg">
          {type !== "alert" && (
            <button
              className="custom-dialog-btn relative-btn"
              onClick={() => {
                button?.positive?.perform();
              }}
            >
              <h4>{button && button?.negative?.text}</h4>
            </button>
          )}
          <button
            className="custom-dialog-btn btn"
            onClick={() => {
              button?.positive?.perform();
            }}
          >
            <h4>{button && button?.positive?.text}</h4>
          </button>
        </span>
      </div>
    </div>
  );
};

export default CustomAlerts;
