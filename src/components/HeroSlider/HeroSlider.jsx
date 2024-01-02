import React, { useRef, useEffect, useState } from "react";
import BigMovieTile from "../MoviesTile/BigMovieTile";
import tmdbAPI, { type, movieType, tvType } from "../../config/api";
import apiConfig from "../../config/apiconfg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "./HeroSlider.css";
import "swiper/css";
import { shuffleArray } from "../../config/util";
import { roundUpNumber } from "../../config/config";

const HeroSlider = () => {
  const navigate = useNavigate();
  const [animateIn, setAnimateIn] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [heroMovies, setHeroMovie] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [genres, setGenres] = useState([]);

  const updateIndex = (pos) => {
    const currentSlide = currentIndex == heroMovies.length - 1 ? 0 : pos;
    setCurrentIndex(currentSlide);
  };

  useEffect(() => {
    (async () => {
      const params = { page: 1 };

      try {
        const movieResponse = await tmdbAPI.getMoviesList(movieType.popular, {
          params,
        });

        const movieData = movieResponse.data.results
          .slice(0, 10)
          .map((movie) => (movie = { ...movie, type: "movie" }));

        const tvResponse = await tmdbAPI.getTvList(tvType.popular, {
          params,
        });

        const tvData = tvResponse.data.results
          .slice(0, 10)
          .map((tv) => (tv = { ...tv, type: "tv" }));

        const tvGenresResponse = await tmdbAPI.getGenre("tv");
        const movieGenresResponse = await tmdbAPI.getGenre("movie");

        const genresResponse = [
          ...tvGenresResponse.data.genres.map(
            (genre) => (genre = { ...genre, type: "tv" })
          ),
          ...movieGenresResponse.data.genres.map(
            (genre) => (genre = { ...genre, type: "movie" })
          ),
        ];

        setGenres(genresResponse);

        setHeroMovie(shuffleArray([...heroMovies, ...movieData, ...tvData]));
      } catch (e) {
        console.log(e);
      }
    })();

    const user = sessionStorage.getItem("usersdata");

    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);

  return (
    <section id="hero-section">
      {heroMovies ? (
        <Swiper
          grabCursor={true}
          centeredSlides={true}
          // loop={true}
          slidesPerView={"1"}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          pagination={false}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          onRealIndexChange={(e) => {
            updateIndex(e.realIndex);
          }}
        >
          {heroMovies.map((movie, i) => {
            try {
              return (
                <SwiperSlide key={i}>
                  <HeroSlide
                    data={movie}
                    animation={currentIndex === i}
                    genres={genres}
                  />
                </SwiperSlide>
              );
            } catch (error) {
              console.log(error);
            }
          })}
        </Swiper>
      ) : (
        <>
          <HeroSlide shimmer={true} />
          <div id="hero-login-banner">
            <h3 className="hero-login-header-text">
              Unlimited Movies and Tv series
            </h3>
            <p className="hero-login-sub-text">
              Welcome to the world of Entertainment. Where you can get all
              Movies and Tv series for free
            </p>
            <button
              className="hero-buttons btn"
              onClick={() => navigate("/signup")}
            >
              <h5>Create an account</h5>
            </button>
          </div>
        </>
      )}
    </section>
  );
};

const HeroSlide = ({ shimmer = false, data, animation = false, genres }) => {
  const navigate = useNavigate();

  const goToDetails = (id, type) => {
    console.log("going");
    navigate(`/${type}/${id}`);
  };

  const getGenreName = (id) => {
    genres.map((genre) => {
      if (genre.type === type && genre.id === id) return genre.name;
    });
  };

  return (
    <div id="hero-slider-bg">
      {shimmer ? (
        <>
          <span className="hero-slider-img shimmer"></span>
        </>
      ) : (
        <>
          <img
            src={apiConfig.originalImage(
              data.backdrop_path ? data.backdrop_path : data.poster_path
            )}
            className="hero-slider-img"
          />
          <div className="hero-overlay">
            <div
              id="hero-slider-main"
              onClick={() => {
                goToDetails(data.id, data.type);
              }}
            >
              <div id="hero-details">
                <h1
                  className={`hero-movie-title slide-in-animation ${
                    animation ? "active" : ""
                  }`}
                >
                  {data.title ? data.title : data.name}
                </h1>

                <div
                  className={`hero-meta-data slide-in-animation ${
                    animation ? "active" : ""
                  }`}
                >
                  <span className="hero-data-rating-bg">
                    <i className="fa-solid fa-star warning-text small-icon"></i>
                    {roundUpNumber(1, data.vote_average)}
                  </span>
                  {data.genre_ids.map((genreId, i) => {
                    return (
                      <span key={i} className="hero-data-rating-bg">
                        {getGenreName(genreId)}
                      </span>
                    );
                  })}
                </div>

                {data.overview && (
                  <h3
                    className={`hero-overview-text slide-in-animation sub-text single-line-text ${
                      animation ? "active" : ""
                    }`}
                  >
                    {data.overview}
                  </h3>
                )}
                <button className="hero-buttons btn">
                  <h5>More details</h5>
                </button>
              </div>
              <div
                id={`hero-main-poster`}
                className={` pop-up-animation ${animation ? "active" : ""}`}
              >
                <BigMovieTile size={""} data={data} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HeroSlider;
