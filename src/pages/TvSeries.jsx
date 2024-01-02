import React, { useEffect, useRef, useState } from "react";
import tmdbAPI, { tvType } from "../config/api";
import MoviesTile from "../components/MoviesTile/MoviesTile";
import Dropdown from "../components/Dropdown/Dropdown";
import "../styles/variables.css";
import "../styles/Styles.css";
import { shuffleArray, tvCategory } from "../config/util";
import SectionGroups from "../components/SectionGroups/SectionGroups";
import GridShimmer from "../components/Shimmer/GridShimmer";
import Popup from "../components/Popup/Popup";
import CategoryTab from "../components/Tabs/CategoryTab";

const TvSeries = () => {
  const [tvData, setTvData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(
    tvCategory ? tvCategory : "Popular"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [trending, setTrending] = useState(false);
  const [isfetching, setIsfetching] = useState(true);
  const [fixedBar, setFixedBar] = useState(false);
  const [message, setMessage] = useState("");

  const shimmers = [];

  useEffect(() => {
    setTimeout(() => {
      setTrending(true);
    }, 5000);

    window.addEventListener("scroll", () => {
      setFixedBar(
        document.body.scrollTop > 300 ||
          document.documentElement.scrollTop > 300
      );
    });
  }, []);

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
    setIsfetching(true);
    const params = { page: currentPage };
    try {
      let fetchCategory = currentCategory.replaceAll(" ", "_").toLowerCase();
      const response = await tmdbAPI.getTvList(tvType[fetchCategory], {
        params,
      });
      const data = response.data.results;
      console.log(response.data.results);
      setTvData([...tvData, ...shuffleArray(data)]);
      setIsfetching(false);
    } catch (e) {
      console.log(e);
      setMessage(e);
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
            <h2 className="main-title">TvSeries</h2>
            <CategoryTab
              type="tv"
              value={currentCategory}
              update={(updatedData) => {
                handleCategoryChange(updatedData);
              }}
            />
            {/* <Dropdown
              type="tv"
              category={tvCategory}
              update={(updatedData) => {
                handleCategoryChange(updatedData);
              }}
            /> */}
          </div>
          <div className="main-list-bg">
            {tvData?.map((tvItem, i) => {
              return <MoviesTile key={i} data={tvItem} type="tv" />;
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
              type={"tv"}
              mode="trending"
            />
          )}
        </div>
      </div>
      {message && <Popup messageType={message} message={""} action={{}} />}
    </section>
  );
};

export default TvSeries;
