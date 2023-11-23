import { useNavigate } from "react-router-dom";
import getGenreImage from "../../config/getGenreImage";
import "./GenreTile.css"


const GenreTile = (props) => {
  const data = props.data;

  const navigate = useNavigate();
  const imageUrl = getGenreImage(data?.name);
  // console.log(imageUrl);

  return (
    <div className="genre-bg">
      <div
        className={`genre-tile ${props.size === "small" ? "small" : ""}`}
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={imageUrl} className="genre-icon" />
        <h4 className="genre-name single-line-text">{data?.name}</h4>
      </div>
    </div>
  );
};

export default GenreTile;
