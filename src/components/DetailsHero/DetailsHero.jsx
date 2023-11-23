import "./DetailsHero.css";
// import PlaceHolder from "";
import tmdbAPI, { type, movieType } from "../../config/api";
import { useState, useEffect } from "react";

const DetailsHero = ({ data }) => {
  return (
    <div id="HeroBg">
      <img id="MovieBannerImg" src="./images/backdrop.jpg" />

      <div id="MovieDetails" className="dark-gradient-overlay">
        <div id="MovieInfo">
          <h5 id="data-type">
            <i className="fa-solid fa-tv icons small-icon"></i> Movie
          </h5>
          <div id="MovieMetaData">
            <span>
              <i className="fa-solid fa-star icons small-icon"></i>
              <h5 className="normal-font-size">1.1</h5>
            </span>
            <span>
              <i className="fa-solid fa-language icons small-icon"></i>
              <h5 className="normal-font-size">English</h5>
            </span>
          </div>
        </div>
        <div id="MovieAction">
          <h1 id="HeroMovieTitle">Movie Title</h1>
          <button className="btn" id="HeroButton">
            <h4>Watch</h4>
          </button>
        </div>
      </div>
      {/* <div id="MoreHeroMovie"></div> */}
    </div>
  );
};

export default DetailsHero;
