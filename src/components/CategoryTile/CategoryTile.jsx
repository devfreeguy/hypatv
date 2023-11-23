import React, { useEffect, useState } from "react";

const CategoryTile = (type) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (type === "tv") {
      setCategories(["On the air", "Popular", "Top rated"]);
    } else if (type === "movie") {
      setCategories(["Popular", "Top rated", "Upcoming"]);
    }
  }, []);

  return (
    <div>
      {categories[0]}
      {categories.map((category) => {
        console.log(category);
        return (
          <li
            className="category-list"
            key={category.toLowerCase().replace(" ", "_")}
          >
            {category}
          </li>
        );
      })}
    </div>
  );
};

export default CategoryTile;
