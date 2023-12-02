export const RouteList = {
  TvShow: "/",
  Movies: "/movies",
  Category: "/:category",
  // Category: "/:category/search/:keyword",
  // Details: "/:category/:id",
};

export const savedUserdata = JSON.parse(sessionStorage.getItem("usersdata"));