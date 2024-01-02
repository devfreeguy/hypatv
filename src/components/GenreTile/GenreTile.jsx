import { useNavigate } from "react-router-dom";
import "./GenreTile.css";

const GenreTile = (props) => {
  const navigate = useNavigate();
  
  const data = props.data;

  return (
    <div className="genre-bg">
      <div
        className={`genre-tile ${props.size === "small" ? "small" : ""}`}
        onClick={() => {
          navigate("/");
        }}
      >
        <span className="genre-name single-line-text">
          {props.custom_name ? props.custom_name : data?.name} {data.id}
        </span>
      </div>
    </div>
  );
};

export default GenreTile;
