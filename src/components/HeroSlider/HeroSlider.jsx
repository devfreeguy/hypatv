import React, { useRef, useEffect, useState } from "react";
import BigMovieTile from "../MoviesTile/BigMovieTile";
import tmdbAPI, { type, movieType, tvType } from "../../config/api";
import apiConfig from "../../config/apiconfg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "./HeroSlider.css";
import "swiper/css";

const HeroSlider = () => {
  const navigate = useNavigate();
  const [animateIn, setAnimateIn] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [heroMovies, setHeroMovie] = useState([]);
  const [welcomeMovies, setWelcomeMovie] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbAPI.getMoviesList(movieType.popular, {
          params,
        });
        setHeroMovie(response.data.results.slice(0, 8));
        setWelcomeMovie(response.data.results.slice(0, 3));
      } catch (e) {
        console.log(e);
      }
    };
    getMovies();

    const jhwviibibciussicvkv = sessionStorage.getItem("jhwviibibciussicvkv");
    jhwviibibciussicvkv ? setIsLoggedIn(true) : setIsLoggedIn(false)
  }, []);

  // const goToDetails = (id) => {
  //   navigate(`/movie/${id}`);
  // };

  const animate = () => {
    setAnimateIn(true);
  };
  useEffect(() => {
    animate();
  }, []);

  return (
    <section>
      {isLoggedIn ? (
        <Swiper
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"1"}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          pagination={false}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          onSlideChange={() => animate()}
          onSwiper={(swiper) => animate()}
        >
          {heroMovies.map((movie) => {
            try {
              return (
                <SwiperSlide key={movie.id}>
                  <HeroSlide data={movie} animateIn={animateIn} />
                </SwiperSlide>
              );
            } catch (error) {
              console.log(error);
            }
          })}
        </Swiper>
      ) : (
        <div id="hero-slider-bg">
          <img
            src="./images/movie-poster-collage.jpg"
            className="hero-slider-img"
          />
          <div className="hero-overlay">
            <div id="hero-slider-welcome">
              <div className="hero-welcome-side">
                <div className="hero-side-details" id="hero-welcome-details">
                  <h1 className={` ${animateIn ? "active" : ""}`}>
                    Unlimited Movies and Tv series
                  </h1>
                  <h3 className={`sub-text ${animateIn ? "active" : ""}`}>
                    Welcome to the world of Entertainment. Where you can get all
                    Movies and Tv series for free and download is available in
                    all formats.
                    <br />
                    Proceed to sign in if you have an account, else sign up to
                    create a new account
                  </h3>
                  <div
                    id="hero-welcome-buttons"
                    className={`hero-buttons ${animateIn ? "active" : ""}`}
                  >
                    <button className="btn" onClick={() => navigate("signup")}>
                      <h4>Sign up</h4>
                    </button>
                    <button
                      className="relative-btn"
                      onClick={() => navigate("login")}
                    >
                      <h4>Sign in</h4>
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="hero-welcome-side"
                onClick={() => navigate("login")}
              >
                {welcomeMovies.map((series, i) => {
                  if (i === 1) {
                    return (
                      <BigMovieTile
                        size="large"
                        isActive={animateIn ? "active" : ""}
                        key={series.id}
                        data={series}
                      />
                    );
                  } else {
                    return (
                      <BigMovieTile
                        size="small"
                        isActive={animateIn ? "active" : ""}
                        key={series.id}
                        data={series}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const HeroSlide = ({ data, animateIn }) => {
  const navigate = useNavigate();

  const goToDetails = (id) => {
    console.log("going");
    navigate(`/movie/details/${id}`);
  };

  return (
    <div id="hero-slider-bg">
      <img
        src={apiConfig.originalImage(
          data?.backdrop_path ? data?.backdrop_path : data?.poster_path
        )}
        className="hero-slider-img"
      />
      <div className="hero-overlay">
        <div id="hero-slider-main">
          <div id="hero-main-poster">
            <BigMovieTile size={"large"} data={data} />
          </div>
          <div className="hero-main-side">
            <div id="hero-main-details" className="hero-side-details">
              <h1 className={` ${animateIn ? "active" : ""}`}>{data.title}</h1>
              <h3 className={`sub-text ${animateIn ? "active" : ""}`}>
                {data.overview}
              </h3>
              <div className={`hero-buttons ${animateIn ? "active" : ""}`}>
                <button
                  className="btn"
                  onClick={() => {
                    goToDetails(data.id);
                  }}
                >
                  <h4>Watch now</h4>
                </button>
                <button className="relative-btn">
                  <h4>Watch trailer</h4>
                </button>
                {/* <button className="secondary-btn">
                  <i className="fa-solid fa-download normal-icon"></i>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
