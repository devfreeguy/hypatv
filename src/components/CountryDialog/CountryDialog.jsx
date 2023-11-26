import React, { useState, useEffect } from "react";
import "./CountryDialog.css";

const CountryDialog = ({getCountryName = () => {}}) => {
  const [backup, setBackup] = useState([]);
  const [country, setCountry] = useState([]);
  const countriesUrl = "/docs/countries.json";
  const [countrySearch, setCountrySearch] = useState("");

  useEffect(() => {
    const fetchCountry = async () => {
      await fetch(countriesUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((countriesData) => {
          setCountry(countriesData);
          setBackup(countriesData)
        });
    };
    fetchCountry();
  }, []);

  const handleSearch = (value) => {
    setCountrySearch(value);
    setCountry(backup);
    setCountry(value ? country.filter((c) => c.country.toLowerCase().includes(countrySearch)) : backup);
  };

  return (
    <div className="country-dialog-bg">
      <span className="secondary-btn country-dialog-form">
        <input
          type="text"
          placeholder="Search country"
          id="country-dialog-searcher"
          value={countrySearch}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <i className="fa-duotone fa-search normal-icon"></i>
      </span>
      {/* <h5 className="sub-text">Select your country</h5> */}
      <div className="country-dialog-card">
        {country.map((country, i) => {
          return (
            <div key={i} className="country-dialog-tile secondary-btn" onClick={()=>{getCountryName(country.country)}}>
              <img
                src={country.flag}
                className="country-dialog-tile-flag"
              ></img>
              <h4 className="sub-text single-line-text">{country.country}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CountryDialog;
