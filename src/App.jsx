import React, { Suspense, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import CoverPhoto from "./components/CoverPhoto/CoverPhoto";
import Header from "./components/Header/Header";
import Movies from "./pages/Movies";
import Category from "./pages/Category";
import Details from "./pages/Details";
import TvSeries from "./pages/TvSeries";
import Auth from "./pages/auth";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

function App() {
  // const { pathname } = useLocation();

  return (
    <BrowserRouter>
      <>
        <CoverPhoto />
        <Header />
        <main>
          <Suspense fallback={<SplashScreen show={true} />} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tv" element={<TvSeries />} />
            <Route path="/movie" element={<Movies />} />
            <Route path="/:type" element={<Category />} />
            <Route path="/:type/search/:keyword" element={<Category />} />
            <Route path="/:type/details/:id" element={<Details />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
          </Routes>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
