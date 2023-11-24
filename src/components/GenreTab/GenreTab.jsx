import React, { useState, useEffect } from "react";
import "./GenreTab.css";
import tmdbAPI from "../../config/api";
import GenreTile from "../GenreTile/GenreTile";

const GenreTab = ({ direction }) => {
  const [genresData, setGenresData] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      const response = await tmdbAPI.getMoviesGenre();
      setGenresData(response.data["genres"]);
    };
    getGenres();
  }, []);

  return (
    <div
      className={`main-genre-bg ${
        direction === "vertical" ? "vertical" : "horizontal"
      }`}
    >
      <h5>Genres</h5>
      {genresData.map((genre) => {
        return (
          <GenreTile
            to="movie"
            data={genre}
            size={direction === "vertical" ? "normal" : "small"}
            key={genre.id}
          />
        );
      })}
    </div>
  );
};

export default GenreTab;
