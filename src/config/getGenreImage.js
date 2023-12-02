import React from "react";

const getGenreImage = (name) => {

  // const cleanName = name.replace("&", "");

  const simplifiedName = name?.replaceAll(" ", "-").toLowerCase().trim();

  return (`../../assets/genre-images/${simplifiedName}.jpg`);
};

export default getGenreImage;
