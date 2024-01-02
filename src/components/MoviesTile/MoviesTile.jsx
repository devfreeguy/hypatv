import React, { useEffect, useState } from "react";
import apiConfig from "../../config/apiconfg";
import { useNavigate } from "react-router-dom";
import "./MoviesTile.css";
import dateConverter from "../../config/dateConverter";
import placeholder from "/images/placeholder.jpg";

const MoviesTile = ({ data, type, from }) => {
  const navigate = useNavigate();

  const [image, setImage] = useState("./images/backdrop.jpg");

  const goToDetails = () => {
    navigate(`/${type}/${data.id}`, {
      state: { name: type === "tv" ? data.name : data.title },
    });
  };

  useEffect(() => {
    setImage(
      apiConfig.w500Image(data?.poster_path)
        ? apiConfig.w500Image(data?.poster_path)
        : apiConfig.w500Image(data?.backdrop_path)
    );
  }, []);

  return (
    <div
      id="movie-tile"
      className={`${from && "ordinary"} movie-tile`}
      onClick={() => {
        goToDetails();
      }}
    >
      <div id="movie-tile-main">
        <img src={image ? image : placeholder} id="movie-tile-image" />
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
        <h6 className="sub-text">
          {dateConverter(
            data.release_date ? data.release_date : data.first_air_date,
            "year"
          )}
        </h6>
      </span>
    </div>
  );
};

export default MoviesTile;
