export const apiConfig = {
  baseUrl:"https://api.themoviedb.org/3/",
  apiKey: "b6f44cc6b4ddd661af0a740d6ff894d2",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export const fileApiConfig = {
  baseUrl: "https://filepursuit.p.rapidapi.com/",
  apiKey: "c8f1d4aaaemshe22eeb8540ca399p15fb1djsn8425fd660bf4",
};

export default apiConfig;