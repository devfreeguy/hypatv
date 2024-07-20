import React, { Suspense } from "react";
import HeroSlider from "../components/HeroSlider/HeroSlider"
import SectionGroups from "../components/SectionGroups/SectionGroups";
import SuspenseLoading from "../components/SuspenseLoading/SuspenseLoading";

const Home = () => {
  return (
    <Suspense fallback={()=>{
      return <SuspenseLoading/>
    }}>
    <HeroSlider />
    <SectionGroups name="Popular movies" type="movie" category="popular"/>
    <SectionGroups name="Popular series" type="tv" category="popular"/>
    <SectionGroups name="Top rated movies" type="movie" category="top_rated"/>
    <SectionGroups name="Top rated series" type="tv" category="top_rated"/>
    </Suspense>
  );
};

export default Home;
