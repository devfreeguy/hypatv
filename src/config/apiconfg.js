export const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "b6f44cc6b4ddd661af0a740d6ff894d2",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  backdropImage: (imgPath) => `https://image.tmdb.org/t/p/w1280/${imgPath}`,
  smallBackdropImage: (imgPath) => `https://image.tmdb.org/t/p/w300/${imgPath}`,
  posterImage: (imgPath) => `https://image.tmdb.org/t/p/w780/${imgPath}`,
  smallPosterImage: (imgPath) => `https://image.tmdb.org/t/p/w185/${imgPath}`,
};

export const fileApiConfig = {
  baseUrl: "https://filepursuit.p.rapidapi.com/",
  apiKey: "c8f1d4aaaemshe22eeb8540ca399p15fb1djsn8425fd660bf4",
};

export default apiConfig;
