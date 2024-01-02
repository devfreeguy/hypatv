import React from "react";
import Tab from "../components/Tabs/Tab";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tmdbAPI from "../config/api";
import apiConfig from "../config/apiconfg";
import MoviesTile from "../components/MoviesTile/MoviesTile";
import Pager from "../components/Pager/Pager";

const Discover = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState(0);
  const [activePath, setActivePath] = useState("");
  const [fetchParams, setFetchParams] = useState({
    page: page
  });
  const [pageNumber, setPageNumber] = useState({});

  useEffect(()=>{

  },[])

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
      if (activePath) {
        const response = await tmdbAPI.discover(activePath, {
          params: {
            page: page,
          },
        });
        setData([])
        setData(response.data.results);
        setPageNumber({
          page: response.data.page,
          total_pages: response.data.total_pages,
        })
        console.log(response.data);
      }
    })();
  }, [activePath || page || []]);

  const handleSelectedValue = (id) => {
    setSelectedValue(id);
    setActivePath(discoverTab[id].fetchPath);
  };

  return (
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
              return <MoviesTile key={i} data={movie} type={activePath} />;
            })}
        </div>
        <Pager pageData={pageNumber} setPage={page_id => setPage(page_id)} />
      </div>
    </section>
  );
};

export default Discover;
