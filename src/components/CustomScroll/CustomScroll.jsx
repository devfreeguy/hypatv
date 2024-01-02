import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

// import required modules
import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';


const CustomScroll = ({direction = 'vertical', children}) => {
  return (
    <Swiper
      direction={direction}
      slidesPerView={"auto"}
      freeMode={true}
      scrollbar={true}
      mousewheel={true}
      modules={[FreeMode, Scrollbar, Mousewheel]}
      className="mySwiper"
    >
      <SwiperSlide>
        {children}
      </SwiperSlide>
    </Swiper>
  );
}

export default CustomScroll