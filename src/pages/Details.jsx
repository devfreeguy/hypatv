import tmdbAPI from "../config/api";
import "../styles/Details.css";
import "swiper/css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiConfig from "../config/apiconfg";
import dateConverter from "../config/dateConverter";
import UserCard from "../components/UserCard/UserCard";
import { Swiper, SwiperSlide } from "swiper/react";
import TrailerCard from "../components/TrailerCard/TrailerCard";
import SeasonsCard from "../components/SeasonsCard/SeasonsCard";
// import GenreTile from "../components/GenreTile/GenreTile";
import TrailerPlayer from "../components/TrailerPlayer/TrailerPlayer";
import { getData, updateData } from "../config/firebaseConfig";
import DownloaderBtm from "../components/DownloaderBtm/DownloaderBtm";
import SectionGroups from "../components/SectionGroups/SectionGroups";

  export let openMoreOption = false;

  export const handleMenu = (choice = false) =>{
    openMoreOption = choice;
  }


const Details = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const usersdata = JSON.parse(sessionStorage.getItem("usersdata"));
  const { type, id } = useParams();
  const [data, setData] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [genre, setGenre] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [trailerPos, setTrailerPos] = useState(0);
  const [creators, setCreators] = useState([]);
  const [language, setLanguage] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showDownloaderBtm, setShowDownloaderBtm] = useState(false);
  const [savedData, setSavedData] = useState([]);

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
        setCrew(response.data.crew);
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

    const getSavedData = async () => {
      // setSavedData(await getData('bookmarked'))
    };
    getSavedData();
  }, [pathname || []]);

  // useEffect(()=>{
  //   console.log(openMoreOption);
  // },[])

  const showTrailerPlayer = (choice, pos = 0) => {
    setShowTrailer(choice);
    setTrailerPos(pos);
  };

  const handleSave = async () => {
    // await updateData([...savedData, ...data], `bookmarked/${usersdata.uid}`, ()=>{
    //   console.log('saved');
    // });
  };

  const handleDownload = () => {
    setShowDownloaderBtm(!showDownloaderBtm);
  };

  return (
    <section id="details-section">
      {/* <div id="details-bg"> */}
        <div id="details-main">
          <div className="details-hero" id="datails-hero-bg">
            <img
              src={apiConfig.w500Image(
                data?.backdrop_path ? data?.backdrop_path : data?.poster_path
              )}
              className="details-hero-img"
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
                      data?.poster_path
                        ? data?.poster_path
                        : data?.backdrop_path
                    )}
                  />
                </div>
                <div id="details-hero-data-info">
                  <h1 id="details-hero-data-title">
                    {type === "tv" ? data.name : data.title}
                  </h1>
                  <span id="details-genre-list">
                    {genre?.map((genre) => {
                      return (
                        <button
                          key={genre.id}
                          className="secondary-btn"
                          onClick={() => {
                            navigate(`/search/${genre.id}`);
                          }}
                        >
                          {genre.name}
                        </button>
                      );
                    })}
                  </span>
                  <span id="details-bullets-bg">
                    {data.vote_average && (
                      <span className="details-bullets">
                        <i className="fa-solid fa-star warning-text"></i>
                        <h5 className="details-bullet-text">
                          {data.vote_average}
                        </h5>
                      </span>
                    )}
                    {data.release_date ||
                      (data.first_air_date && (
                        <span className="details-bullets">
                          <i className="fa-regular fa-calendar-days blue-text"></i>
                          <h5 className="details-bullet-text">
                            {dateConverter(
                              data.release_date
                                ? data.release_date
                                : data.first_air_date
                            )}
                          </h5>
                        </span>
                      ))}
                    {language && (
                      <span className="details-bullets">
                        <i className="fa-solid fa-language normal-text"></i>
                        <h5 className="details-bullet-text">
                          {language?.map((lang, i) => {
                            return `${lang.english_name}${
                              language.length - 1 === i ? "" : ", "
                            } `;
                          })}
                        </h5>
                      </span>
                    )}
                  </span>
                  <div id="details-hero-data-buttons">
                    {trailers.length > 0 && (
                      <button
                        className="btn"
                        onClick={() => {
                          showTrailerPlayer(true);
                        }}
                      >
                        <i className="fa-solid fa-play"></i>
                      </button>
                    )}
                    <button className="btn">
                      <h4>Watch now</h4>
                    </button>
                    {type === "movie" && data !== null && (
                      <button className="relative-btn" onClick={handleDownload}>
                        <h4>Download</h4>
                      </button>
                    )}
                    {/* <button className="relative-btn" onClick={handleSave}>
                      <i className="fa-regular fa-bookmark"></i>
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="details-main-bg">
            {seasons && (
              <div className="datails-container" id="details-main-seasons">
                <h4 className="underlined-text">Seasons</h4>
                <Swiper
                  grabCursor={true}
                  spaceBetween={10}
                  slidesPerView={"auto"}
                >
                  {seasons?.map((season, i) => {
                    try {
                      return (
                        <SwiperSlide key={i}>
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
            {data.overview && (
              <div className="datails-container" id="details-main-summary">
                <h4 className="underlined-text">Summary</h4>
                <h3 className="normal-text">{data.overview}</h3>
              </div>
            )}
            {trailers.length > 0 && (
              <div className="datails-container" id="details-main-summary">
                <h4 className="underlined-text">Videos</h4>
                <Swiper
                  grabCursor={true}
                  spaceBetween={10}
                  slidesPerView={"auto"}
                >
                  {trailers.map((trailer, id) => {
                    if (trailer.site === "YouTube") {
                      return (
                        <SwiperSlide key={id}>
                          <TrailerCard
                            data={trailer}
                            id={id}
                            playTrailer={(pos) => {
                              showTrailerPlayer(true, pos);
                            }}
                          />
                        </SwiperSlide>
                      );
                    }
                  })}
                </Swiper>
              </div>
            )}
            {cast.length > 0 && (
              <div className="datails-container" id="cast-bg">
                <h4 className="underlined-text">Cast member</h4>
                <div id="casts-container">
                  <Swiper
                    grabCursor={true}
                    spaceBetween={10}
                    slidesPerView={"auto"}
                  >
                    {cast?.map((member, i) => {
                      try {
                        return (
                          <SwiperSlide key={i}>
                            <UserCard data={member} type="cast" />
                          </SwiperSlide>
                        );
                      } catch (error) {
                        console.log(error);
                      }
                    })}
                  </Swiper>
                </div>
              </div>
            )}
            {crew.length > 0 && (
              <div className="datails-container" id="crew-bg">
                <h4 className="underlined-text">Crew member</h4>
                <div id="casts-container">
                  <Swiper
                    grabCursor={true}
                    spaceBetween={10}
                    slidesPerView={"auto"}
                  >
                    {crew.map((member, i) => {
                      try {
                        return (
                          <SwiperSlide key={i}>
                            <UserCard data={member} type="crew" />
                          </SwiperSlide>
                        );
                      } catch (error) {
                        console.log(error);
                      }
                    })}
                  </Swiper>
                </div>
              </div>
            )}
            <SectionGroups
              name={"Similar"}
              type={type}
              mode="similar"
              id={id}
            />
          </div>
        </div>
      {/* </div> */}
      {showTrailer && (
        <TrailerPlayer
          data={trailers}
          pos={trailerPos}
          close={() => {
            showTrailerPlayer(false);
          }}
        />
      )}
      {showDownloaderBtm && (
        <DownloaderBtm
          targetData={data}
          close={() => {
            setShowDownloaderBtm(false);
          }}
        />
      )}
    </section>
  );
};

export default Details;
