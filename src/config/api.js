import { dbClient, filesClient } from "./axiosClient";

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
    return dbClient.get(url, params);
  },
  getTvList: (type, params) => {
    const url = "tv/" + tvType[type];
    return dbClient.get(url, params);
  },
  getTrendingList: (type, timeWindow = "day") => {
    const url = "trending/" + type + "/" + timeWindow;
    return dbClient.get(url, { params: {} });
  },
  getMoviesGenre: () => {
    const url = "genre/movie/list";
    return dbClient.get(url, { params: {} });
  },
  getTvGenre: () => {
    const url = "genre/tv/list";
    return dbClient.get(url, { params: {} });
  },
  getGenre: (type) => {
    const url = 'genre/' + type + '/list';
    return dbClient.get(url, { params: {} });
  },
  getVideos: (category, id) => {
    const url = type[category] + "/" + id + "/videos";
    return dbClient.get(url, { params: {} });
  },
  search: (category, params) => {
    const url = "search/" + type[category];
    return dbClient.get(url, params);
  },
  globalSearch: (params) => {
    const url = "search/multi";
    return dbClient.get(url, params);
  },
  details: (category, id, params) => {
    const url = type[category] + "/" + id;
    return dbClient.get(url, params ? params : { params: {} });
  },
  credits: (category, id) => {
    const url = type[category] + "/" + id + "/credits";
    return dbClient.get(url, { params: {} });
  },
  similar: (category, id) => {
    const url = type[category] + "/" + id + "/similar";
    return dbClient.get(url, { params: {} });
  },
  discover: (path, params) => {
    // Path should either be "movie | tv | people"
    const url = "discover/" + path;
    return dbClient.get(url, params);
  },
};

export const getFiles = (query) => {
  return filesClient.get({q: query})
}

export default tmdbAPI;
