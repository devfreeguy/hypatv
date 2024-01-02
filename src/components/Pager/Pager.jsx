import React from "react";
import { useState, useEffect } from "react";
import "./Pager.css";

const Pager = ({ pageData, setPage = () => {} }) => {
  const [pagerPos, setPagerPos] = useState(1);

  useEffect(() => {
    setPage(pagerPos);
  }, [pagerPos]);

  const goToNextPage = () => {
    // Next page
    if (pageData?.total_pages !== pagerPos) {
      setPagerPos(pagerPos + 1);
    }
  };

  const goToPrevPage = () => {
    // Previous page
    if (pagerPos !== 1) {
      setPagerPos(pagerPos - 1);
    }
  };
  
  const goToPage = (page_id=1) => {};

  return (
    <section id="pager">
      <span
        className="pager-btn prev-page relative-btn"
        onClick={() => {
          goToPrevPage;
        }}
      >
        <i className="fa-solid fa-angle-left medium-icon"></i>
      </span>

      {[...Array(pageData.total_pages).slice(pagerPos, pagerPos + 3)].map(
        (x, i) => {
          return (
            <span
              key={i}
              className={`pager-btn page-number ${
                i + 1 === pagerPos ? "btn" : 'relative-btn'
              }`}
              onClick={() => {
                goToPage();
              }}
            >
              {pagerPos + i}
            </span>
          );
        }
      )}

      <span className="pager-btn next-page relative-btn" onClick={() => {}}>
        <i className="fa-solid fa-ellipsis medium-icon"></i>
      </span>
      <span
        className="pager-btn next-pager relative-btn"
        onClick={() => {
          goToNextPage;
        }}
      >
        <i className="fa-solid fa-angle-right medium-icon"></i>
      </span>
    </section>
  );
};

export default Pager;
