
import "./SearchBar.css";

// import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  // const navigate = useNavigate();

  return (
    <div className="search-box flex-outlined-btn">
      <form>
        <input
          type="text"
          placeholder="Search anything..."
          className="search-bar"
        />
        <button>
          <i className="fa-solid fa-magnifying-glass small-icon"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
