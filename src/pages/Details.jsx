import tmdbAPI, { movieType } from "../config/api";
import "../styles/Details.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiConfig from "../config/apiconfg";
import dateConverter from "../config/dateConverter";
import UserCard from "../components/UserCard/UserCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TrailerCard from "../components/TrailerCard/TrailerCard";
import SeasonsCard from "../components/SeasonsCard/SeasonsCard";
import GenreTile from "../components/GenreTile/GenreTile";

const Details = () => {
  const { type, id } = useParams();
  const [data, setData] = useState([]);
  const [genre, setGenre] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [creators, setCreators] = useState([]);
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
        setSeasons(response.data?.seasons);
        setCreators(data?.created_by);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
      getTrailers();
      getCredit();
    };
    getDetails();

    const getCredit = async () => {
      try {
        const response = await tmdbAPI.credits(type, id, {
          params: {},
        });
        setCast(response.data.cast);
      } catch (e) {
        console.log(e);
      }
    };

    const getTrailers = async () => {
      try {
        const response = await tmdbAPI.getVideos(type, id);
        setTrailers(response.data.results);
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  return (
    <section id="details-section">
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
      ></div>
      <div id="details-bg">
        <div id="details-main">
          <div className="details-hero" id="datails-hero-bg">
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
                    <h5>
                      {dateConverter(
                        data.release_date
                          ? data.release_date
                          : data.first_air_date
                      )}
                    </h5>
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
                  {/* <button className="relative-btn">
                    <i className="fa-solid fa-download normal-icon"></i>
                  </button> */}
                </div>
              </div>
            </div>
            <div id="details-others">
              {creators !== null && (
                <>
                  <h4 className="underlined-text">Creator</h4>
                  <div className="details-top-credit">
                    {creators?.map((creator) => {
                      return (
                        <GenreTile
                          custom_image={creator.profile_path}
                          custom_name={creator.name}
                          size={"small"}
                        />
                      );
                    })}
                  </div>
                </>
              )}
              {crew !== null && (
                <>
                  <h4 className="underlined-text">Director</h4>
                  <div className="details-top-credit grid-view">
                    {crew.map((crew) => {
                      if (crew?.job == "Director") {
                        return (
                          <GenreTile
                            custom_image={crew.profile_path}
                            custom_name={crew.name}
                            size={"small"}
                          />
                        );
                      }
                    })}
                  </div>
                </>
              )}

              <button className="secondary-btn"></button>
            </div>
            {/* <div id="trailer-bg">dfr</div> */}
          </div>
          <div id="details-main-bg">
            <div className="datails-container" id="details-main-summary">
              <h4 className="underlined-text">Summary</h4>
              <h3 className="normal-text">{data.overview}</h3>
            </div>
            {seasons && (
              <div className="datails-container" id="details-main-seasons">
                <h4 className="underlined-text">Seasons</h4>
                <Swiper
                  grabCursor={true}
                  spaceBetween={10}
                  slidesPerView={"auto"}
                >
                  {seasons.map((season) => {
                    try {
                      return (
                        <SwiperSlide key={season.id}>
                          <SeasonsCard data={season} />
                        </SwiperSlide>
                      );
                    } catch (error) {
                      console.log(error);
                    }
                  })}
                </Swiper>
              </div>
            )}
            <div className="datails-container" id="details-main-summary">
              <h4 className="underlined-text">Videos</h4>
              <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={"auto"}
              >
                {trailers.map((trailer) => {
                  if (trailer.site === "YouTube") {
                    return (
                      <SwiperSlide key={trailer.id}>
                        <TrailerCard data={trailer} />
                      </SwiperSlide>
                    );
                  }
                })}
              </Swiper>
            </div>
            <div className="datails-container" id="cast-and-crew-bg">
              <h4 className="underlined-text">Cast and crew</h4>
              <div id="casts-container">
                <Swiper
                  grabCursor={true}
                  spaceBetween={10}
                  slidesPerView={"auto"}
                >
                  {cast?.map((member) => {
                    try {
                      return (
                        <SwiperSlide key={member.id}>
                          <UserCard data={member} />
                        </SwiperSlide>
                      );
                    } catch (error) {
                      console.log(error);
                    }
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
