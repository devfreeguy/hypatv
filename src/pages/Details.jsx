import tmdbAPI, { movieType } from "../config/api";
import "../styles/Details.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiConfig from "../config/apiconfg";
import dateConverter from "../config/dateConverter";

const Details = () => {
  const { type, id } = useParams();

  const [data, setData] = useState([]);
  const [genre, setGenre] = useState([]);
  const [language, setLanguage] = useState([]);
  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await tmdbAPI.details(type, id, {
          params: {},
        });
        setData(response.data);
        setGenre(response.data.genres);
        setLanguage(response.data.spoken_languages);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    getDetails();
  }, []);

  return (
    <section id="details-section">
      <div className="details-hero" id="datails-hero-bg">
        <img
          src={apiConfig.w500Image(
            data?.backdrop_path ? data?.backdrop_path : data?.poster_path
          )}
          className="details-hero"
          id="details-hero-image"
        />
        <div
          className="gradient-overlay details-hero"
          id="details-hero-data-bg"
        >
          <div id="details-hero-data">
            <div id="details-hero-poster">
              <img
                src={apiConfig.w500Image(
                  data?.poster_path ? data?.poster_path : data?.backdrop_path
                )}
              />
            </div>
            <div id="details-hero-data-info">
              <h1>{type === "tv" ? data.name : data.title}</h1>
              <span id="details-genre-list">
                {genre?.map((genre) => {
                  return (
                    <button key={genre.id} className="secondary-btn">
                      {genre.name}
                    </button>
                  );
                })}
              </span>
              <span id="details-bullets-bg">
                <span className="details-bullets">
                  <i className="fa-solid fa-star warning-text"></i>
                  <h5>{data.vote_average}</h5>
                </span>
                <span className="details-bullets">
                  <i className="fa-regular fa-calendar-days blue-text"></i>
                  <h5>{dateConverter(data.release_date)}</h5>
                </span>
                <span className="details-bullets">
                  <i className="fa-solid fa-language normal-text"></i>
                  <h5>
                    {language?.map((lang, i) => {
                      return `${lang.english_name}${
                        language.length - 1 === i ? "" : ", "
                      } `;
                    })}
                  </h5>
                </span>
              </span>
              <div id="details-hero-data-buttons">
                <button className="btn">
                  <h3>Watch now</h3>
                </button>
                <button className="relative-btn">
                  <h3>Play trailer</h3>
                </button>
                <button className="relative-btn">
                  <i className="fa-solid fa-download normal-icon"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="details-main-bg">
        <div id="details-main">
          <div id="details-main-summary">
            <h4 className="underlined-text">Summary</h4>
            <h3 className="normal-text">{data.overview}</h3>
          </div>
        </div>
        <div id="details-reviews"></div>
      </div>
    </section>
  );
};

export default Details;
