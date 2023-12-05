import React from "react";
import "./TrailerPlayer.css";

const TrailerPlayer = ({data, pos = 0, close}) => {

  

  return (
    <div className="trailer-player-bg dialog">
      <div className="trailer-player-card">
        <div className="trailer-player-card-header">
          <h4 className="trailer-player-name single-line-text">{data[pos].name}</h4>
          <i className="fa-solid fa-xmark normal-icon close-btn trailer-player-close" onClick={()=>{close()}}></i>
        </div>
        {/* Player */}
        <iframe
        className="trailer-player-iframe"
          src={`https://www.youtube.com/embed/${data[pos].key}`}
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerPlayer;
