import React, { useState, useEffect } from "react";
import MoviesTile from "../MoviesTile/MoviesTile";
import "./SectionGroups.css";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbAPI, { type, movieType, tvType } from "../../config/api";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import { shuffleArray } from "../../config/util";

const SectionGroups = ({ name = '', type = '', category = '', mode = 'normal', id = 0 }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (mode === 'normal'){
      if (type === "tv") {
        const getTvSeries = async () => {
        const params = { page: 1 };
        try {
          const response = await tmdbAPI.getTvList(tvType[category], {
            params,
          });
          setData(shuffleArray(response.data.results));
        } catch (e) {
          console.log(e);
        }
      };
      getTvSeries();
    } else if (type === "movie") {
      const getMovies = async () => {
        const params = { page: 1 };
        try {
          const response = await tmdbAPI.getMoviesList(movieType[category], {
            params,
          });
          setData(shuffleArray(response.data.results));
        } catch (e) {
          console.log(e);
        }
      };
      getMovies();
    }
  } else if(mode === 'trending') {
      const getTrendingMovies = async () => {
        try {
          const response = await tmdbAPI.getTrendingList(type)
          setData(shuffleArray(response.data.results));
        } catch (error) {
          console.log(error);
        }
      }
      getTrendingMovies();
    }else if(mode === 'similar') {
      const getSimilarMovies = async () => {
        try {
          const response = await tmdbAPI.similar(type, id)
          setData(shuffleArray(response.data.results));
        } catch (error) {
          console.log(error);
        }
      }
      getSimilarMovies();

    }
  }, []);

  const handleSeeMore = () =>{
    navigate(`/${type}`)
  }

  return (
    data.length > 0 && (
      <section
        id="section-group-tile"
        className={mode === "normal" ? "" : "card"}
      >
        <div id="section-group-header">
          <h3>{name.trim()}</h3>
          {mode == 'normal' && (<button
            onClick={handleSeeMore}
            className={`secondary-btn ${mode === "relative" ? "card" : ""}`}
          >
            See more
          </button>)}
        </div>
        <div id="section-group-main">
          <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
            {data.map((itemData) => {
              try {
                return (
                  <SwiperSlide key={itemData.id}>
                    <MoviesTile data={itemData} type={type} />
                  </SwiperSlide>
                );
              } catch (error) {
                console.log(error);
              }
            })}
          </Swiper>
        </div>
      </section>
    )
  );
};

export default SectionGroups;
