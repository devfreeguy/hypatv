import React, { useEffect, useRef, useState } from "react";
import tmdbAPI, { tvType } from "../config/api";
import SearchBar from "../components/SearchBar/SearchBar";
import MoviesTile from "../components/MoviesTile/MoviesTile";
import Dropdown from "../components/Dropdown/Dropdown";
// import { useNavigate } from "react-router-dom";
import "../styles/variables.css";
import "../styles/Styles.css";
import { tvCategory } from "../config/util";

const TvSeries = () => {
  const [tvData, setTvData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(
    tvCategory ? tvCategory : "Popular"
  );
  const [currentPage, setCurrentPage] = useState(1);

  // const navigate = useNavigate();

  useEffect(() => {
    getTvSeries();
  }, [currentPage, currentCategory]);

  const LoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleCategoryChange = (category) => {
    sessionStorage.setItem("tvCategory", category);
    setCurrentCategory(category);
    setCurrentPage(1);
    setTvData([]);
  };

  const getTvSeries = async () => {
    const params = { page: currentPage };
    try {
      const response = await tmdbAPI.getTvList(
        tvType[currentCategory.toLowerCase().trim().replaceAll(" ", "_")],
        {
          params,
        }
      );
      const data = response.data.results;
      console.log(response.data.results);
      setTvData([...tvData, ...data]);
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
              type="tv"
              category={tvCategory}
              update={(updatedData) => {
                handleCategoryChange(updatedData);
              }}
            />
            <SearchBar />
          </div>
          <div className="main-list-bg">
            {tvData?.map((tvItem) => {
              return <MoviesTile key={tvItem.id} data={tvItem} type="tv" />;
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

export default TvSeries;
