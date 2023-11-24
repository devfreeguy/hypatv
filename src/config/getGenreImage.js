import React from "react";

const getGenreImage = (name) => {

  // const cleanName = name.replace("&", "");

  const simplifiedName = name?.replace(" ", "-").toLowerCase().trim();

  return (`./images/genre-images/${simplifiedName}.jpg`);
};

export default getGenreImage;
