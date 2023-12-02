import React from "react";
import "./SeasonsCard.css";
import apiConfig from "../../config/apiconfg";

const SeasonsCard = ({ data }) => {
  return (
    <div className="season-card-bg">
      <img
        src={apiConfig.w500Image(
          data.backdrop_path ? data.backdrop_path : data.poster_path
        )}
        alt=""
        className="season-card-img"
      />
      <div className="season-card-details">
        {/* {data.season_number !== 0 && (
          <h5 className="season-card-id">Season {data.season_number}</h5>
        )} */}
        <h3 className="season-card-name">{data.name}</h3>
        <h4 className="season-card-overview sub-text">{data.overview}</h4>
        <span className="relative-btn season-card-episode-btn">
          <h4 className="season-card-episode-count">
            {data.episode_count} episodes
          </h4>
          <i className="fa-regular fa-arrow-right-to-arc medium-icon"></i>
        </span>
      </div>
    </div>
  );
};

export default SeasonsCard;
