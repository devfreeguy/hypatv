import React from "react";
import { useState } from "react";
import { filterOptions } from "../../config/util";
import './Tab.css'

const CategoryTab = ({ type, value, update }) => {
  const [selectedTab, setSelectedTab] = useState(value)

  const handleTabChanged = (val) => {
    setSelectedTab(val)
    update(val);
  }

  return (
    <section className="tab">
      {filterOptions[type].map((tab, i) => {
        return (
          <div key={i} className="tabOption">
            <input
              type="radio"
              id={tab.replaceAll(" ", "")}
              className="tabInput"
              name="categoryTab"
              value={tab}
              checked={selectedTab === tab}
              onChange={(e) => {
                handleTabChanged(e.target.value);
              }}
            />
            <label htmlFor={tab.replaceAll(" ", "")} className="tabText">
              {tab}
            </label>
          </div>
        );
      })}
    </section>
  );
};

export default CategoryTab;
