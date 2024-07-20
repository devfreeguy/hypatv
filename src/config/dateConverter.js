const dateConverter = (date = "", individualType = "") => {
  if (date !== "") {
    const [year = 0, month = 0, day = 0] = date.split("-");
    if (individualType === "") {
      return `${monthIdToText[month.toString()]} ${day}, ${year}`;
    } else if (individualType === "month") {
      return monthIdToText[month.toString()];
    } else if (individualType === "day") {
      return day;
    } else if (individualType === "year") {
      return year;
    }
  } else {
    return "";
  }
};

const monthIdToText = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  10: "October",
  11: "November",
  12: "December",
};

export default dateConverter;
