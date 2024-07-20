import React, { useState } from "react";
import "./CommentTile.css";
import placeholder from "/images/profile.png";

const CommentTile = ({ isReply = false }) => {
  const [userProfilePic, setUserProfilePic] = useState(placeholder);
  // const [isReply, setIsReply] = useState(true)

  const handleLike = () => {};
  const handleReport = () => {};
  const handleReply = () => {};

  return (
    <div className={`comment-tile-bg ${isReply ? "reply" : ""}`}>
      <img src={userProfilePic} alt="" className="user-comment-profile" />
      <div className="comment-tile-info-bg">
        <div className="comment-tile-card">
          <h6 className="user-comment-name">Name</h6>
          <p className="user-comment sub-text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            dicta.
          </p>
          <div className="comment-tile-action-bg">
            <h6 className="comment-tile-action" onClick={() => handleLike}>
              Like
            </h6>
            <h6 className="comment-tile-action" onClick={() => handleReport}>
              Report
            </h6>
            <h6 className="comment-tile-action" onClick={() => handleReply}>
              Reply
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentTile;
