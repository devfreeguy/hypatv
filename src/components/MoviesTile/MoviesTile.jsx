import React, { useEffect, useState } from "react";
import apiConfig from "../../config/apiconfg";
import { useNavigate } from "react-router-dom";
import "./MoviesTile.css";
import dateConverter from "../../config/dateConverter";
import placeholder from "/images/backdrop.jpg";

const MoviesTile = ({ data, type }) => {
  const navigate = useNavigate();

  const [image, setImage] = useState("./images/backdrop.jpg");

  const goToDetails = () => {
    navigate(`/${type}/${data.id}`);
  };

  useEffect(() => {
    setImage(data?.poster_path ? data?.poster_path : data?.backdrop_path);
  }, []);

  return (
    <div id="movie-tile" className="ordinary" onClick={goToDetails}>
      <div id="movie-tile-main">
        <img
          src={image ? apiConfig.w500Image(image) : placeholder}
          id="movie-tile-image"
          alt={type === "tv" ? data.name : data.title}
        />
        <div className="overlay">
          <button className="btn">
            <i className="fa-solid fa-play large-icons"></i>
          </button>
        </div>
      </div>
      <span id="movie-tile-data">
        <h5 className="single-line-text">
          {type === "tv" ? data.name : data.title}
        </h5>
        <h6 className="sub-text">{dateConverter(data.release_date, "year")}</h6>
      </span>
    </div>
  );
};

export default MoviesTile;
