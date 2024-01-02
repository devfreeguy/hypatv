import React from "react";
import "./Breadcrumb.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { firstLetterUppercase, isLastOnList } from "../../config/util";

const Breadcrumb = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pathNames, setPathNames] = useState([]);

  useEffect(() => {
    const currentLocation = location?.pathname?.split("/").filter((p) => p);
    setPathNames(currentLocation);
  }, [location]);

  const goToDestination = (path) => {
    navigate(path);
  };

  return (
    <div id="breadcrumb">
      <i
        className="breadcrumbs fa-solid fa-home small-icon"
        onClick={() => pathNames && goToDestination("/")}
      ></i>
      {pathNames !== null ? (
        pathNames.map((path, i) => {
          return (
            <span key={i} className="path-holder">
              <i className="fa-solid fa-angle-right small-icon sub-text"></i>
              <span
                className={`breadcrumbs ${
                  i === pathNames.length - 1 && "is-last"
                }`}
                onClick={() =>
                  !isLastOnList(i, pathNames) &&
                  goToDestination("/" + pathNames.slice(0, i + 1).join("/"))
                }
              >
                <h6>
                  {isLastOnList(i, pathNames) && isFinite(path)
                    ? location?.state?.name
                      ? location?.state?.name
                      : firstLetterUppercase(path)
                    : firstLetterUppercase(path)}
                </h6>
              </span>
            </span>
          );
        })
      ) : (
        <i className="breadcrumbs fa-solid fa-home small-icon"></i>
      )}
    </div>
  );
};

export default Breadcrumb;
