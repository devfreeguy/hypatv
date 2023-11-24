import React, { useEffect, useState } from "react";
import "./MoviesTile.css";
import apiConfig from "../../config/apiconfg"
import placeholder from "/images/backdrop.jpg";

const BigMovieTile = ({ size, data }) => {
  const [image, setImage] = useState();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setImage(data?.poster_path ? data?.poster_path : data?.backdrop_path);
  }, []);

  useEffect(() => {
    setIsActive(true)
  }, []);

  return (
    <div id="movie-tile">
      <div id="big-movie-tile">
        <div id="movie-tile-main">
          <img
            src={image ? apiConfig.w500Image(image) : placeholder}
            id="big-movie-tile-image"
            className={`${size} ${isActive ? "active" : ""}`}
          />
          <div className="overlay">
            <button className="btn">
              <i className="fa-solid fa-play large-icons"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigMovieTile;
