const apiConfig = {
  baseUrl:"https://api.themoviedb.org/3/",
  apiKey: "b6f44cc6b4ddd661af0a740d6ff894d2",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export const fileApiConfig = {
  
}

export default apiConfig;