import { useNavigate } from "react-router-dom";
import getGenreImage from "../../config/getGenreImage";
import "./GenreTile.css";
import apiConfig from "../../config/apiconfg";

const GenreTile = (props) => {
  const navigate = useNavigate();
  
  const data = props.data;
  const imageUrl =
    props?.custom_image !== null
      ? apiConfig.w500Image(props?.custom_image)
      : getGenreImage(data && data?.name);

  return (
    <div className="genre-bg">
      <div
        className={`genre-tile ${props.size === "small" ? "small" : ""}`}
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={imageUrl} className="genre-icon" />
        <h4 className="genre-name single-line-text">
          {props.custom_name ? props.custom_name : data?.name}
        </h4>
      </div>
    </div>
  );
};

export default GenreTile;
