import React, { useEffect, useRef, useState } from "react";
import tmdbAPI, { movieType } from "../config/api";
import MoviesTile from "../components/MoviesTile/MoviesTile";
import Dropdown from "../components/Dropdown/Dropdown";
import { useNavigate } from "react-router-dom";
import "../styles/variables.css";
import "../styles/Styles.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { moviesCategory, shuffleArray } from "../config/util";
import SectionGroups from "../components/SectionGroups/SectionGroups";
import GridShimmer from "../components/Shimmer/GridShimmer";
import SearchBar from "../components/SearchBar/SearchBar";
import CategoryTab from "../components/Tabs/CategoryTab";

export const Movies = () => {
  // let category = "Popular";
  const [moviesData, setMoviesData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(
    moviesCategory ? moviesCategory : "Popular"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [trending, setTrending] = useState(false);
  const [isfetching, setIsfetching] = useState(true);
  const [fixedBar, setFixedBar] = useState(false);

  const shimmers = [];

  useEffect(() => {
    setTimeout(() => {
      setTrending(true);
    }, 5000);

    window.addEventListener("scroll", () => {
      setFixedBar(
        document.body.scrollTop > 100 ||
          document.documentElement.scrollTop > 100
      );
    });
  }, []);

  useEffect(() => {
    getMovies();
  }, [currentPage, currentCategory]);

  const LoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleCategoryChange = (category) => {
    sessionStorage.setItem("moviesCategory", category);
    setCurrentCategory(category);
    setCurrentPage(1);
    setMoviesData([]);
  };

  const getMovies = async () => {
    setIsfetching(true);
    const params = { page: currentPage };
    try {
      const response = await tmdbAPI.getMoviesList(
        movieType[
          currentCategory.replaceAll(" ", "_").toLowerCase().trim().toString()
        ],
        {
          params,
        }
      );
      const data = response.data.results;
      setMoviesData([...moviesData, ...shuffleArray(data)]);
      setIsfetching(false);
    } catch (e) {
      console.log(e);
    }
  };

  for (let i = 20; i > 0; i--) {
    shimmers.push(<GridShimmer key={i} />);
  }

  return (
    <section>
      <div className="main-action">
        <div className="main-bg">
          <div className={`main-action-bar ${fixedBar && "fixed"}`}>
            <h2 className="main-title">Movies</h2>
            {/* <SearchBar/> */}
            <CategoryTab
              type="movie"
              value={currentCategory}
              update={(updatedData) => {
                handleCategoryChange(updatedData);
              }}
            />
            {/* <Dropdown
              type="movie"
              category={moviesCategory}
              update={(updatedData) => {
                handleCategoryChange(updatedData);
              }}
            /> */}
          </div>
          <div className="main-list-bg">
            {!isfetching &&
              moviesData?.map((movieItem, i) => {
                return <MoviesTile key={i} data={movieItem} type="movie" />;
              })}
            {isfetching && shimmers}
          </div>
          <div className="main-button-bg">
            {!isfetching && (
              <button onClick={LoadMore} className="secondary-btn">
                Load more
              </button>
            )}
          </div>

          {trending && (
            <SectionGroups
              name={"Recommended"}
              category={currentCategory}
              type={"movie"}
              mode="trending"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Movies;
