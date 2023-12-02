import React, { useEffect, useState } from "react";
import "./Dropdown.css";

const Dropdown = ({ type, category, update = ()=>{} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(category);

  const options = {
    tv: ["On the air", "Popular", "Top rated"],
    movie: ["Upcoming", "Popular", "Top rated"],
  };

  useEffect(()=>{
    update(selected)
  },[selected])

  const handleDropdown = () => {
    setIsOpen(!isOpen)
  }

  useEffect(()=>{
    setSelected("Popular")
  },[type])

  return (
    <div className="dropdown-bg">
      <button className="flex-outlined-btn" onClick={handleDropdown}>
        <h5 className="sub-text">{selected}</h5>
        <i className="fa-solid fa-angle-down small-icon"></i>
      </button>
      <span className={`dropdown ${isOpen ? "active" : ""}`}>
        {options[type].map((item) => {
          return (
            <li
            key={item}
              className="dropdown-list-item"
              onClick={() => {
                if(item == selected){
                  handleDropdown()
                }else {
                  setSelected(item);
                  // selectOption();
                }
              }}
            >
              <h4
                className={`single-line-text ${
                  selected === item ? "active" : ""
                }`}
              >
                {item}
              </h4>
            </li>
          );
        })}
      </span>
    </div>
  );
};

export default Dropdown;
