export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 2)) + min;
}

export const moviesCategory = sessionStorage.getItem("moviesCategory");
export const tvCategory = sessionStorage.getItem("tvCategory");