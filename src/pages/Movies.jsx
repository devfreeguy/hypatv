import React, { useEffect, useRef, useState } from "react";
import tmdbAPI, { movieType } from "../config/api";
import SearchBar from "../components/SearchBar/SearchBar";
import MoviesTile from "../components/MoviesTile/MoviesTile";
import Dropdown from "../components/Dropdown/Dropdown";
import { useNavigate } from "react-router-dom";
import "../styles/variables.css";
import "../styles/Styles.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { moviesCategory, shuffleArray } from '../config/util'
import SectionGroups from "../components/SectionGroups/SectionGroups";

export const Movies = () => {
  // let category = "Popular";
  const [moviesData, setMoviesData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(
    moviesCategory
      ? moviesCategory
      : "Popular"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [trending, setTrending] = useState(false)

  // const navigate = useNavigate();

  useEffect(() => {
    setTimeout(()=>{
      setTrending(true)
    }, 5000)
  }, [])
  

  useEffect(() => {
    getMovies();
  }, [currentPage, currentCategory]);

  const LoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleCategoryChange = (category) => {
    sessionStorage.setItem("moviesCategory", category)
    setCurrentCategory(category);
    setCurrentPage(1);
    setMoviesData([]);
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
      setMoviesData([...moviesData, ...shuffleArray(data)]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section>
      <div className="main-action">
        <div className="main-bg">
          <div className="main-action-bar">
            <Dropdown
              type="movie"
              category={moviesCategory}
              update={(updatedData) => {
                handleCategoryChange(updatedData);
              }}
            />
            <SearchBar />
          </div>
          {trending && (<SectionGroups
            name={"Recommended"}
            category={currentCategory}
            type={"movie"}
            mode="trending"
          />)}
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
