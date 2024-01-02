import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";
import GenreTab from "../components/GenreTab/GenreTab";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { useParams } from "react-router-dom";
import "../styles/Search.css";
import SectionGroups from "../components/SectionGroups/SectionGroups";
import tmdbAPI from "../config/api";
import { shuffleArray } from "../config/util";
import GridShimmer from "../components/Shimmer/GridShimmer";
import MoviesTile from "../components/MoviesTile/MoviesTile";

const Search = ({ withId = false }) => {
  const [params, setParams] = useState("");
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const shimmers = [];

  if (withId) {
    const { genreid } = useParams();
  }

  useEffect(() => {}, []);

  const search = async () => {
    event.preventDefault();
    setIsFetching(true)
    const sparams = { query: params, page: currentPage };
    try {
      const response =
        type === ""
        ? await tmdbAPI.globalSearch({
          sparams,
        })
        : await tmdbAPI.search(type, sparams);
        const fdata = response.data.results;
        setData([...data, ...shuffleArray(fdata)]);
        setIsFetching(false)
      } catch (e) {
      setIsFetching(false)
      console.log(e);
    }
  };

  for (let i = 20; i > 0; i--) {
    shimmers.push(<GridShimmer key={i} />);
  }

  return (
    <section id="search-bg">
      <div className="search-header main-action-bar">
        <div id="search-search-box">
          <input
            type="text"
            autoFocus
            onChange={(e) => {
              setParams(e.target.value);
            }}
            value={params}
            className="search-search-bar"
            placeholder="Search anything..."
            required
          />
          <button className="relative-btn search-filter"><i className="fa-solid fa-sliders-simple"></i></button>
          <button className="btn search-btn" onClick={search} disabled={params === ''}>
            Search
          </button>
        </div>
      </div>

      <div className="search-body">
        <div className="main-list-bg grid-view">
          {isFetching
            ? shimmers
            : data?.map((movieItem) => {
                return (
                  <MoviesTile
                    key={movieItem.id}
                    data={movieItem}
                    type={movieItem.mediaType}
                  />
                );
              })}
        </div>

        <SectionGroups
          name={"Trending movies"}
          category={"popular"}
          type={"movie"}
          mode="trending"
          children={
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
          }
        />
        <SectionGroups
          name={"Trending TvSeries"}
          category={"popular"}
          type={"tv"}
          mode="trending"
          children={
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
          }
        />
      </div>

      <div id="search-filter-bg">
        
      </div>
    </section>
  );
};

export default Search;
