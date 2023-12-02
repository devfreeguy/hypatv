import React, { useState, useEffect } from "react";
import MoviesTile from "../MoviesTile/MoviesTile";
import "./SectionGroups.css";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbAPI, { type, movieType, tvType } from "../../config/api";
import "swiper/css";
import { useNavigate } from "react-router-dom";

const SectionGroups = ({ name, type, category, mode = 'normal' }) => {
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
          setData(response.data.results);
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
          setData(response.data.results);
        } catch (e) {
          console.log(e);
        }
      };
      getMovies();
    }
  } else {
      const getTrendingMovies = async () => {
        try {
          const response = await tmdbAPI.getTrendingList(type)
          setData(response.data.results);
        } catch (error) {
          console.log(e);
        }
      }
      getTrendingMovies();
    }
  }, []);

  const handleSeeMore = () =>{
    navigate(`/${type}`)
  }

  return (
    data.length > 0 && (
      <section
        id="section-group-tile"
        className={mode === "relative" ? "card" : ""}
      >
        <div id="section-group-header">
          <h3>{name.trim()}</h3>
          <button
            onClick={handleSeeMore}
            className={`secondary-btn ${mode === "relative" ? "card" : ""}`}
          >
            See more
          </button>
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
