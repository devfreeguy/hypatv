import React, { useState, useEffect } from "react";
import "./Tab.css";
import CustomScroll from "../CustomScroll/CustomScroll";

const Tab = ({ name = "tab", tabs, selected = 0, update }) => {
  const [selectedTab, setSelectedTab] = useState(selected);

  useEffect(()=>{
    update(selectedTab);
  },[selectedTab])
  
  const handleSelectedTab = (id) => {
    setSelectedTab(id);
    update(id);
  }

  return (
    <section className="tab">
      <CustomScroll direction="horizontal">
        {tabs?.map((tab, i) => {
          return (
            <div key={i} className="tabOption">
              <input
                type="radio"
                id={tab.name.replaceAll(" ", "") + tab.id}
                className="tabInput"
                name={name}
                value={tab.id.toString()}
                checked={selectedTab.toString() === tab.id.toString()}
                onChange={(e) => {
                  // handleSelectedTab(e.target.value);
                  handleSelectedTab(e.target.value);
                }}
              />
              <label
                htmlFor={tab.name.replaceAll(" ", "") + tab.id}
                className="tabText"
              >
                {tab.name}
              </label>
            </div>
          );
        })}
      </CustomScroll>
    </section>
  );
};

export default Tab;
