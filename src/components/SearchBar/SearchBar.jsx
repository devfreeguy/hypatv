import { useCallback, useEffect, useRef, useState } from "react";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <form
        className="search-box relative-btn"
        onClick={() => {
          navigate("/search");
        }}
      >
        <input
          type="text"
          placeholder="Search anything..."
          className='search'
          disabled
          id="global-searchbar"
        />
          <i className="fa-solid fa-magnifying-glass small-icon"></i>
      </form>
    </>
  );
};

export default SearchBar;
