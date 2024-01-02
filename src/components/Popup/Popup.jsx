import React from "react";
import "./Popup.css";
import { useState } from "react";

const Popup = ({ messageType = "Alert", message, action = {} }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [closeMessage, setCloseMessage] = useState(false);

  setTimeout(() => {
    if(message){
      setShowMessage(true);
    }
  }, 1000);

  const handleClose = () => {
    setCloseMessage(!closeMessage);
  };
  return (
    <div id="popup-message" className={closeMessage && "close"}>
      <div className={`popup-message-top`}>
        <h4>{messageType.toString()}</h4>
        <i
          className="fa-solid fa-close close-btn medium-icon"
          onClick={handleClose}
        ></i>
      </div>
      <p className={`popup-full-message ${showMessage && "open"}`}>
        {message.toString()}
      </p>
    </div>
  );
};

export default Popup;
