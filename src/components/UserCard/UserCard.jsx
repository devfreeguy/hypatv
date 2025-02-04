import React, { useState } from "react";
import "./UserCard.css";
import apiConfig from "../../config/apiconfg";

const UserCard = ({ data, type }) => {
  return (
    <div
      className="user-card"
    >
      <img
        src={
          data.profile_path
            ? apiConfig.w500Image(data.profile_path)
            : "/images/placeholder.jpg"
        }
        className="user-card-img"
      />
      <div className="user-card-details">
        <h5 className="sub-text user-card-users-name singleline-text">
          {type === "crew"
            ? data.known_for_department
            : `${data.original_name} as`}
        </h5>
        <h3 className="user-card-role-name">
          {type === "crew" ? data.name : data.character}
        </h3>
        <h5 className="sub-text user-card-users-name">
          {type === "crew" ? data.job : data.known_for_department}
        </h5>
      </div>
      <div className="user-card-rating-bg">
        <i className="fa-solid fa-fire normal-text user-rating-star"></i>
        <h5 className="sub-text user-rating">{data.popularity}</h5>
      </div>
    </div>
  );
};

export default UserCard;
