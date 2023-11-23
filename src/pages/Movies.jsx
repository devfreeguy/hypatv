import React, { useEffect, useRef, useState } from "react";
import tmdbAPI, { movieType } from "../config/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";
import SearchBar from "../components/SearchBar/SearchBar";
import MoviesTile from "../components/MoviesTile/MoviesTile";
import Dropdown from "../components/Dropdown/Dropdown";
import GenreTab from "../components/GenreTab/GenreTab";
import { useNavigate } from "react-router-dom";
import "../styles/variables.css";
import "../styles/Styles.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

export const Movies = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("Popular");
  const [currentPage, setCurrentPage] = useState(1);

  
  const navigate = useNavigate();

  let category = "Popular";

  useEffect(() => {
    getMovies();
  }, []);
  
  // useEffect(() => {
  //   setCurrentPage(1);
  //   getMovies()
  // }, [currentCategory]);

  useEffect(() => {
    setCurrentPage(currentPage + 1);
  }, [moviesData]);


  const LoadMore = () => {
    if (category !== currentCategory) {
      setMoviesData([]);
      category = currentCategory;
    }
    getMovies();
  };

  const getMovies = async () => {
    const params = { page: currentPage };
    try {
      const response = await tmdbAPI.getMoviesList(
        movieType[currentCategory.replace(" ", "_").toLowerCase().trim()],
        {
          params,
        }
      );
      const data = response.data.results;
      setMoviesData([...moviesData, ...data]);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section>
      <div className="main-action">
        <div className="main-genre-bg">
          <Swiper
            direction={"horizontal"}
            slidesPerView={"auto"}
            freeMode={true}
            scrollbar={true}
            mousewheel={true}
            modules={[FreeMode, Scrollbar, Mousewheel]}
          >
            <SwiperSlide>
              <GenreTab direction="horizontal" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="main-bg">
          <div className="main-action-bar">
            {/* <CategoryTile /> */}
            <Dropdown
              type="movie"
              update={(updatedData) => {
                setCurrentCategory(updatedData);
              }}
            />
            <SearchBar />
          </div>
          <div className="main-list-bg">
            {moviesData?.map((movieItem) => {
              return (
                <MoviesTile key={movieItem.id} data={movieItem} type="movie" />
              );
            })}
          </div>
          <div className="main-button-bg">
            <button onClick={LoadMore} className="secondary-btn">
              Load more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Movies;
