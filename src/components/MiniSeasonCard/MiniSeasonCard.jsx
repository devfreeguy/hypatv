import React from "react";
import "./MiniSeasonCard.css";

const MiniSeasonCard = ({ data }) => {
  return (
    <div className="mseason-card sub-card">
      <h4 className="mseason-card-season">{data.name}</h4>
      <span className="mseason-card-episode">{`${data.episode_count} episode${
        data.episode_count ? "s" : ""
      }`}</span>
    </div>
  );
};

export default MiniSeasonCard;
