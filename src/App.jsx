import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
const Home = React.lazy(() => import("./pages/Home"));
const CoverPhoto = React.lazy(() =>
  import("./components/CoverPhoto/CoverPhoto")
);
const Header = React.lazy(() => import("./components/Header/Header"));
const Movies = React.lazy(() => import("./pages/Movies"));
const Category = React.lazy(() => import("./pages/Category"));
// const Details = React.lazy(() => import("./pages/Details"));
import Details from "./pages/Details";
const TvSeries = React.lazy(() => import("./pages/TvSeries"));
const Auth = React.lazy(() => import("./pages/Auth"));
const StatusPage = React.lazy(() =>
  import("./components/StatusPage/StatusPage")
);
const Search = React.lazy(() => import("./pages/Search"));
const Footer = React.lazy(() => import("./components/Footer/Footer"));
const Documents = React.lazy(() => import("./pages/Documents"));
const NoUserPrompt = React.lazy(() =>
  import("./components/NoUserPrompt/NoUserPrompt")
);
import NavBar from "./components/NavBar/NavBar";
import { savedUserdata } from "./config/config";
import "./App.css";
import Genres from "./pages/Genres";
import Discover from "./pages/Discover";

function App() {
  const { pathname } = useLocation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [isAtTheTop, setIsAtTheTop] = useState(true);
  // const [navBarRedZone, setNavBarRedZone] = useState(false);
  const [headerRedZone, setHeaderRedZone] = useState(false);

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("usersdata")) === null) {
      if (pathname == "/login" || pathname == "/signup" || pathname == "/") {
        setShowPrompt(false);
      } else {
        setShowPrompt(true);
      }
    } else {
      setShowPrompt(false);
    }

    // setNavBarRedZone(
    //   pathname.includes("/login") ||
    //     pathname.includes("/signup") ||
    //     pathname.includes("/more-info") ||
    //     pathname.includes("/movie/details") ||
    //     pathname.includes("/tv/details")
    // );

    setHeaderRedZone(
      pathname.includes("/login") ||
        pathname.includes("/signup") ||
        pathname.includes("/more-info")
    );
    scrollToTop();
  }, [pathname || []]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        setIsAtTheTop(false);
      } else {
        setIsAtTheTop(true);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      {showPrompt && <NoUserPrompt />}
      {/* {pathname !== "/" && <CoverPhoto />} */}
      <Header />
      <NavBar />
      <main className={headerRedZone ? "active" : ""}>
        <Suspense fallback={() => <SplashScreen />}>
          <div id="main-bg">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/tv" element={<TvSeries />} />
              <Route path="/movie" element={<Movies />} />

              <Route path="/search" element={<Search />} />
              <Route path="/:type/search/:keyword" element={<Category />} />

              <Route path="/signup" element={<Auth />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/more-info" element={<Auth />} />
              <Route path="/:type" element={<Category />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/discover/movies" element={<Discover />} />
              <Route path="/discover/tv" element={<Discover />} />
              <Route path="/discover/:type/genre/:id" element={<Discover />} />
              <Route path="/:type/:id" element={<Details />} />
              <Route path="/status/:statusType" element={<StatusPage />} />
              <Route path="/docs/privacy-policy" element={<Documents />} />
              <Route path="/docs/disclaimer" element={<Documents />} />
              <Route path="/docs/terms-of-service" element={<Documents />} />
            </Routes>
            <Footer />
          </div>
        </Suspense>
      </main>
      <div
        id="back-to-top"
        onClick={scrollToTop}
        className={!isAtTheTop && "active"}
      >
        <i className="fa-solid fa-angle-up"></i>
      </div>
    </>
  );
}

export default App;
