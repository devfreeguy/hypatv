import { dbAxiosClient } from "./axiosClient";

export const type = {
  movie: "movie",
  tv: "tv",
};

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType = {
  on_the_air: "on_the_air",
  popular: "popular",
  top_rated: "top_rated",
};

const tmdbAPI = {
  getMoviesList: (type, params) => {
    const url = "movie/" + movieType[type];
    return dbAxiosClient.get(url, params);
  },
  getTvList: (type, params) => {
    const url = "tv/" + tvType[type];
    return dbAxiosClient.get(url, params);
  },
  getTrendingList: (type, timeWindow = "day") => {
    const url = "trending/" + type + "/" + timeWindow;
    return dbAxiosClient.get(url, { params: {} });
  },
  getMoviesGenre: () => {
    const url = "genre/movie/list";
    return dbAxiosClient.get(url, { params: {} });
  },
  getTvGenre: () => {
    const url = "genre/tv/list";
    return dbAxiosClient.get(url, { params: {} });
  },
  getVideos: (category, id) => {
    const url = type[category] + "/" + id + "/videos";
    return dbAxiosClient.get(url, { params: {} });
  },
  search: (category, params) => {
    const url = "search/" + type[category];
    return dbAxiosClient.get(url, params);
  },
  details: (category, id, params) => {
    const url = type[category] + "/" + id;
    return dbAxiosClient.get(url, params);
  },
  credits: (category, id) => {
    const url = type[category] + "/" + id + "/credits";
    return dbAxiosClient.get(url, { params: {} });
  },
  similar: (category, id) => {
    const url = type[category] + "/" + id + "/similar";
    return dbAxiosClient.get(url, { params: {} });
  },
};

export default tmdbAPI;
