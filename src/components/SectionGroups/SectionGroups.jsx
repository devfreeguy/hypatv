import React, { useState, useEffect } from "react";
import MoviesTile from "../MoviesTile/MoviesTile";
import "./SectionGroups.css";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbAPI, { type, movieType, tvType } from "../../config/api";
import "swiper/css";
import { useNavigate } from "react-router-dom";

const SectionGroups = ({ name, type, category }) => {
  // const navigate = useNavigate(null);
  const [data, setData] = useState([]);

  useEffect(() => {
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
    } else {
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
  }, []);

  return (
    data && (
      <section id="section-group-tile">
        <div id="section-group-header">
          <h3>{name.trim()}</h3>
          <button
            // onClick={}
            className="secondary-btn"
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
