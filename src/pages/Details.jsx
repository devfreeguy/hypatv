import tmdbAPI from "../config/api";
import "../styles/Details.css";
import "swiper/css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import apiConfig from "../config/apiconfg";
import dateConverter from "../config/dateConverter";
import UserCard from "../components/UserCard/UserCard";
import { Swiper, SwiperSlide } from "swiper/react";
import TrailerCard from "../components/TrailerCard/TrailerCard";
import SeasonsCard from "../components/SeasonsCard/SeasonsCard";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import TrailerPlayer from "../components/TrailerPlayer/TrailerPlayer";
import { getData, updateData } from "../config/firebaseConfig";
import DownloaderBtm from "../components/DownloaderBtm/DownloaderBtm";
import SectionGroups from "../components/SectionGroups/SectionGroups";
import CommentTile from "../components/Comments/CommentTile";
import { roundUpNumber } from "../config/config";
import EmptyState from "../components/EmptyState/EmptyState";
import MiniSeasonCard from "../components/MiniSeasonCard/MiniSeasonCard";

export let openMoreOption = false;

export const handleMenu = (choice = false) => {
  openMoreOption = choice;
};

const Details = () => {
  const posterHeightRef = useRef(null);
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
  const [date, setDate] = useState("");
  const [posterHeight, setPosterHeight] = useState(0);

  useLayoutEffect(() => {
    document.onreadystatechange = () => {
      setPosterHeight(posterHeightRef.current.clientHeigth);
    };
  }, []);

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
        setDate(
          dateConverter(
            type === "movie" ? data.release_date : data.first_air_date
          )
        );
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
  }, [id, pathname]);

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
      <div id="details-main">
        {/* New update */}

        <div id="details-main-bg">
          <div id="details-hero-bg">
            <div id="details-info-bg">
              <img
                ref={posterHeightRef}
                className="thumbnail"
                src={apiConfig.backdropImage(
                  data?.backdrop_path ? data?.backdrop_path : data?.poster_path
                )}
              />
              {/* <VideoPlayer
                title={type === "tv" ? data.name : data.title}
                thumbnail={apiConfig.backdropImage(
                  data?.backdrop_path ? data?.backdrop_path : data?.poster_path
                )}
              /> */}
              <div id="details-info">
                {/* Movie title / Tv series name */}
                <h1 id="details-hero-data-title">
                  {type === "tv" ? data.name : data.title}
                </h1>
                {/* Rating, Date and Languages */}
                <span id="details-bullets-bg">
                  {data.vote_average && (
                    <span className="details-bullets-holder">
                      <span className="details-bullets">
                        <i className="fa-solid fa-star warning-text"></i>
                        <h5 className="details-bullet-text">
                          {data.vote_average > 0
                            ? roundUpNumber(1, data.vote_average)
                            : "No Rating"}
                        </h5>
                      </span>
                    </span>
                  )}
                  {date && (
                    <span className="details-bullets-holder">
                      <span className="details-bullets">
                        <i className="fa-regular fa-calendar-days blue-text"></i>
                        <h5 className="details-bullet-text">{date}</h5>
                      </span>
                    </span>
                  )}
                  {language && (
                    <span className="details-bullets-holder">
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
                    </span>
                  )}
                </span>

                <div id="details-genre-cta-holder">
                  {/* Genres */}
                  <span id="details-genre-list">
                    {genre?.map((genre) => {
                      return (
                        <button
                          key={genre.id}
                          className="relative-btn details-genre"
                          onClick={() => {
                            navigate(`/discover/${type}/genre/${genre.id}`, {
                              state: { name: genre.name },
                            });
                          }}
                        >
                          {genre.name}
                        </button>
                      );
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="hero-meta-bg">
              {/*<h4 className="">{type === "tv" ? `Seasons` : `Trailer`}</h4>*/}
              <div className="hero-meta-data">
                <h3 className="underlined-text">Summary</h3>
                <h4 className="normal-text">{data.overview}</h4>
                {/*{type === "tv" ? (
                  seasons?.length > 0 ? (
                    seasons?.slice(0, 5)?.map((season, i) => {
                      try {
                        return <MiniSeasonCard key={i} data={season} />;
                      } catch (error) {
                        console.log(error);
                      }
                    })
                  ) : (
                    <EmptyState />
                  )
                ) : (
                  trailers?.slice(0, 3).map((trailer, id) => {
                    return (
                      <TrailerCard
                        fit={true}
                        data={trailer}
                        id={id}
                        playTrailer={(pos) => {
                          showTrailerPlayer(true, pos);
                        }}
                      />
                    );
                  })
                )}*/}
              </div>

              {/* Action button */}
              <button className="btn hero-action-btn">
                <i className="fa-solid fa-play"></i> <span>Watch now</span>
              </button>
            </div>
            {/*  */}
          </div>
          {/* Tv seasons */}
          {seasons?.length > 0 && (
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
          {/* Movie / Tv summary
          {data.overview && (
            <div className="datails-container" id="details-main-summary">
              <h4 className="underlined-text">Summary</h4>
              <h4 className="sub-text">{data.overview}</h4>
            </div>
          )} */}
          {/* Trailers */}
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
          {/* Casts */}
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
          {/* Crews */}
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
          {/* Similar */}
          <SectionGroups
            name={`Similar ${type === "movie" ? "movies" : "series"}`}
            type={type}
            mode="similar"
            id={id}
          />
        </div>
      </div>

      {/* Comments or review tab */}
      {/* <div id="details-review-bg">
        <h3 id="details-review">Comments</h3>
        <CommentTile />
        <CommentTile />
      </div> */}

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
