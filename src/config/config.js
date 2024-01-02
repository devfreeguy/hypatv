export const RouteList = {
  TvShow: "/",
  Movies: "/movies",
  Category: "/:category",
  // Category: "/:category/search/:keyword",
  // Details: "/:category/:id",
};
export const savedUserdata = JSON.parse(sessionStorage.getItem("usersdata"));

export const roundUpNumber = (to = 1, number = 0)=> Math.round(number * (to * 100)) / (to * 100)