import tmdbAPI from "./api";

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 2)) + min;
};

export const moviesCategory = sessionStorage.getItem("moviesCategory");

export const tvCategory = sessionStorage.getItem("tvCategory");

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const firstLetterUppercase = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const firstLetterLowercase = (text) => {
  return text.charAt(0).toLowerCase() + text.slice(1);
};

export const isLastOnList = (pos, list) => {
  return pos === list.length - 1;
};

export const isNumeric = (num) =>
  (typeof num === "number" || (typeof num === "string" && num.trim() !== "")) &&
  !isNaN();

export const getGenreById = async (type, id) => {
  const response = await tmdbAPI.getGenre(type);
  await response.data.genres.map((genre) => {
    if (genre.id == id) {
      console.log(genre.name);
      return genre.name;
    }
  });
};

export const filterOptions = {
  tv: ["Popular", "Top rated", "On the air"],
  movie: ["Popular", "Top rated", "Upcoming"],
};
