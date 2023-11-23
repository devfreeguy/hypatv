import axiosClient from "./axiosClient"

export const type = {
  movie: "movie",
  tv: "tv"
}

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
}

export const tvType = {
  on_the_air: "on_the_air",
  popular: "popular",
  top_rated: "top_rated",
}

const tmdbAPI = {
  getMoviesList: (type, params) => {
    const url = 'movie/' + movieType[type];
    return axiosClient.get(url, params);
  },
  getTvList: (type, params) => {
    const url = 'tv/' + tvType[type];
    return axiosClient.get(url, params);
  },
  getMoviesGenre: () => {
    const url = 'genre/movie/list';
    return axiosClient.get(url, {params: {}});
  },
  getTvGenre: () => {
    const url = 'genre/tv/list';
    return axiosClient.get(url, {params: {}});
  },
  getVideos: (category, id) => {
    const url = type[category] + 'tv/' + id + "/videos";
    return axiosClient.get(url, {params: {}});
  },
  search: (category, params) => {
    const url = 'search/'+ type[category];
    return axiosClient.get(url, params);
  },
  details: (category, id, params) => {
    const url = type[category] + '/' + id;
    return axiosClient.get(url, params);
  },
  credits: (category, id) => {
    const url = type[category] + '/' + id + "/credits";
    return axiosClient.get(url, { params: {} });
  },
  similar: (category, id) => {
    const url = type[category] + '/' + id + "/similar";
    return axiosClient.get(url, { params: {} });
  },
}

export default tmdbAPI;