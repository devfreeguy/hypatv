import React, { Suspense, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import CoverPhoto from "./components/CoverPhoto/CoverPhoto";
import Header from "./components/Header/Header";
import Movies from "./pages/Movies";
import Category from "./pages/Category";
import Details from "./pages/Details";
import TvSeries from "./pages/TvSeries";
import Auth from "./pages/Auth";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import StatusPage from "./components/StatusPage/StatusPage";
import Search from "./pages/Search";
import Footer from "./components/Footer/Footer";
import Documents from "./pages/Documents";
// import './App.css'

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
            <Route path="/search" element={<Search />} />
            <Route path="/:type/search/:keyword" element={<Category />} />
            <Route path="/:type/details/:id" element={<Details />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
            <Route path="/more-info" element={<Auth />} />
            <Route path="/status/:statusType" element={<StatusPage/>} />
            <Route path="/docs/privacy-policy" element={<Documents/>} />
            <Route path="/docs/disclaimer" element={<Documents/>} />
            <Route path="/docs/terms-of-service" element={<Documents/>} />
          </Routes>
        <Footer/>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
