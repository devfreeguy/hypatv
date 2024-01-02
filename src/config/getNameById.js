import tmdbAPI from "./api";

const getNameById = async (type, id) => {
  // Declear a variable for placeholder
  let response = [];
  // Logigal syntax
  if (type === "tv") {
    response = await tmdbAPI.details(type, id, { params: {} });
    console.log(response.data.name);
    return response.data.name;
  } else if (type === "movie") {
    response = await tmdbAPI.details(type, id, { params: {} });
    console.log(response.data.title);
    return response.data.title;
  } else if (type === "genre") {
    response = await tmdbAPI.getGenre(type);
    console.log(response.data);
    return response.data[id].name;
  }
};

export default getNameById;
