import React from 'react'
import './DownloaderBtm.css'
import { useState } from 'react';

const DownloaderBtm = ({targetData, close}) => {

  // const [name, setName] = useState(second)
  return (
    <div className="dialog downloader-btm-bg">
      <div className="dialog-card downloader-btm">
        <div className="downloader-btm-details">
          <h3 className="downloader-btm-title single-line-text">
            {targetData.title ? targetData.title : targetData.name}
          </h3>
          <div className="downloader-btm-list-view">
            <div className="downloader-btm-list-tile">
              <div className="downloader-btm-list-details">
                <h4 className="downloader-btm-list-details-title">File name</h4>
                <div className="downloade-btm-list-details-info">
                  <h5 className="sub-text downloader-btm-list-details-info-text">
                    MP4 | 1.0GB
                  </h5>
                </div>
              </div>
              <i className="fa-solid fa-download medium-icon"></i>
            </div>
          </div>
        </div>
        <button
          className="relative-btn downloader-btm-btn"
          onClick={() => {
            close();
          }}
        >
          <h4>Close</h4>
        </button>
        {/* <div className="downloader-btm-btn-bg">
        <button className="btn downloader-btm-btn">
          <h4>Download</h4>
        </button>

        </div> */}
      </div>
    </div>
  );
}

export default DownloaderBtm