import React from 'react'
import './TrailerCard.css'

const TrailerCard = ({data, id, playTrailer}) => {
  return (
    <div className="tcard-bg" onClick={()=>{playTrailer(id)}}>
      <img
        className="tcard-img"
        src={`http://img.youtube.com/vi/${data.key}/sddefault.jpg`}
        alt=""
      />
      <div className="tcard-data">
        <h4 className="single-line-text tcard-name">{data.name}</h4>
        <i className="fa-solid fa-play"></i>
      </div>
    </div>
  );
}

export default TrailerCard