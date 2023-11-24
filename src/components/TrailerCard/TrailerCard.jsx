import React from 'react'
import './TrailerCard.css'

const TrailerCard = ({data}) => {
  return (
    <div className="tcard-bg">
      <img
        className="tcard-img"
        src={`http://img.youtube.com/vi/${data.key}/sddefault.jpg`}
        alt=""
      />
      {/* <h6 className="tcard-type">{data.type}</h6> */}
      {/* <i className="fa-solid fa-play normal-icon tcard-playbtn"></i> */}
      <div className="tcard-data">
        <h4 className="single-line-text tcard-name">{data.name}</h4>
        <i className="fa-solid fa-play"></i>
      </div>
    </div>
  );
}

export default TrailerCard