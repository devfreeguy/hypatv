import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";
import GenreTab from "../components/GenreTab/GenreTab";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";


const Search = ({withId = false}) => {
  return (
    <div>
      <div className="main-genre-bg">
          <Swiper
            direction={"horizontal"}
            slidesPerView={"auto"}
            freeMode={true}
            scrollbar={true}
            mousewheel={true}
            modules={[FreeMode, Scrollbar, Mousewheel]}
          >
            <SwiperSlide>
              <GenreTab direction="horizontal" />
            </SwiperSlide>
          </Swiper>
        </div>
    </div>
  );
}

export default Search