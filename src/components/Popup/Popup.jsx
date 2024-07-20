import React from "react";
import "./Popup.css";
import { useState } from "react";

const Popup = ({ messageType = "Alert", message = "", action = {} }) => {
  const [closeMessage, setCloseMessage] = useState(false);

  const handleClose = () => {
    setCloseMessage(!closeMessage);
  };

  if (message !== "") {
    return (
      <div id="popup-message" className={closeMessage && "close"}>
        <div className={`popup-message-top`}>
          <h4>{messageType.toString()}</h4>
          <i
            className="fa-solid fa-close close-btn medium-icon"
            onClick={handleClose}
          ></i>
        </div>
        <p className="popup-full-message">{message.toString()}</p>
      </div>
    );
  }
};

export default Popup;
