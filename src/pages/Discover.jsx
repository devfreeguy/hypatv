import React from "react";
import Tab from "../components/Tabs/Tab";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tmdbAPI from "../config/api";
import apiConfig from "../config/apiconfg";
import MoviesTile from "../components/MoviesTile/MoviesTile";
import Pager from "../components/Pager/Pager";
import { shuffleArray } from "../config/util";
import "../styles/Discover.css";
import Popup from "../components/Popup/Popup";

const Discover = ({ tab = "" }) => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState(0);
  const [activePath, setActivePath] = useState(tab);
  const [fetchParams, setFetchParams] = useState({
    page: page,
  });
  const [pageNumber, setPageNumber] = useState({});
  const [notification, setNotification] = useState("");

  const discoverTab = [
    {
      name: "Discover",
      path: "",
      fetchPath: "",
      id: 0,
    },
    {
      name: "Discover Movies",
      path: "/movies",
      fetchPath: "movie",
      id: 1,
    },
    {
      name: "Discover Tv Shows",
      path: "/tv",
      fetchPath: "tv",
      id: 2,
    },
  ];

  useEffect(() => {
    (async () => {
      if (activePath === "") {
        try {
          const movieResponse = await tmdbAPI.getMoviesList("upcoming", {
            params: {
              page: page,
            },
          });

          const tvResponse = await tmdbAPI.getTvList("on_the_air", {
            params: {
              page: page,
            },
          });

          const movieData = movieResponse.data.results.map(
            (movie) => (movie = { ...movie, type: "movie" })
          );

          const tvData = tvResponse.data.results.map(
            (tv) => (tv = { ...tv, type: "tv" })
          );

          // setData([]);
          setData(shuffleArray([...data, ...movieData, ...tvData]));
        } catch (e) {
          setNotification(e);
        }
      } else {
        setData([]);
        const response = await tmdbAPI.discover(activePath, {
          params: {
            page: page,
          },
        });
        setData(response.data.results);
        setPageNumber({
          page: response.data.page,
          total_pages: response.data.total_pages,
        });
        console.log(response.data);
      }
    })();
  }, [activePath || page || []]);

  const LoadMore = () => {
    setPage(page + 1);
  };

  const handleSelectedValue = (id) => {
    setSelectedValue(id);
    setActivePath(discoverTab[id].fetchPath);
    // setData([]);
  };

  return (
    <>
      <section id="discover">
        <div className={`main-action-bar `}>
          <h2 className="main-title">Discover</h2>
          <Tab
            tabs={discoverTab}
            name="discoverTab"
            selected={selectedValue}
            update={(id) => {
              handleSelectedValue(id);
            }}
          />
        </div>
        <div id="discover-body">
          <div className="grid-view">
            {data &&
              data.map((movie, i) => {
                return (
                  <MoviesTile
                    key={i}
                    data={movie}
                    type={activePath || movie.type}
                  />
                );
              })}
          </div>
          {activePath ? (
            <Pager
              pageData={pageNumber}
              setPage={(page_id) => setPage(page_id)}
            />
          ) : (
            <span className="discover-more-btn-bg">
              <button onClick={LoadMore} className="secondary-btn">
                Load more
              </button>
            </span>
          )}
        </div>
      </section>
      <Popup message={notification} />
    </>
  );
};

export default Discover;
