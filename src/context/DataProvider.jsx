// import React, { createContext, useState, useEffect } from "react";
// import tmdbAPI, { movieType } from "../config/api";

// export const MovieContext = createContext();

// const DataProvider = () => {
//   // All movies data
//   const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
//   const [popularMovies, setPopularMovies] = useState([]);
//   const [topRatedMovies, setTopRatedMovies] = useState([]);
//   const [upcomingMovies, setUpcomingMovies] = useState([]);
//   // All series data
//   const [popularSeries, setPopularSeries] = useState([]);
//   const [topRatedSeries, setTopRatedSeries] = useState([]);

//   useEffect(() => {
//     // Get now playing movies
//     const getNow = async () => {
//       const params = { page: 1 };
//       try {
//         const response = await tmdbAPI.getTvList(tvType[category], {
//           params,
//         });
//         setData(shuffleArray(response.data.results));
//       } catch (e) {
//         console.log(e);
//       }
//     };
//     getNow();

//     if (mode === "normal") {
//       if (type === "tv") {
//         const getTvSeries = async () => {
//           const params = { page: 1 };
//           try {
//             const response = await tmdbAPI.getTvList(tvType[category], {
//               params,
//             });
//             setData(shuffleArray(response.data.results));
//           } catch (e) {
//             console.log(e);
//           }
//         };
//         getTvSeries();
//       } else if (type === "movie") {
//         const getMovies = async () => {
//           const params = { page: 1 };
//           try {
//             const response = await tmdbAPI.getMoviesList(movieType[category], {
//               params,
//             });
//             setData(shuffleArray(response.data.results));
//           } catch (e) {
//             console.log(e);
//           }
//         };
//         getMovies();
//       }
//     } else if (mode === "trending") {
//       const getTrendingMovies = async () => {
//         try {
//           const response = await tmdbAPI.getTrendingList(type);
//           setData(shuffleArray(response.data.results));
//         } catch (error) {
//           console.log(error);
//         }
//       };
//       getTrendingMovies();
//     } else if (mode === "similar") {
//       const getSimilarMovies = async () => {
//         try {
//           const response = await tmdbAPI.similar(type, id);
//           setData(shuffleArray(response.data.results));
//         } catch (error) {
//           console.log(error);
//         }
//       };
//       getSimilarMovies();
//     }
//   }, [type, id]);

//   const getMovies = async (category) => {
//     const params = { page: 1 };
//     try {
//       const response = await tmdbAPI.getMoviesList(movieType[category], {
//         ...params,
//       });
//       return response.data.results;
//     } catch (e) {
//       // console.log(e);

//     }
//   };

//   return <div>DataProvider</div>;
// };

// export default DataProvider;
