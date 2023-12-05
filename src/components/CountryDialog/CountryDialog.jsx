import React, { useState, useEffect } from "react";
import countriesData from "../../assets/docs/countriesData";
import "./CountryDialog.css";
// import  from ;

const CountryDialog = ({ getCountryData = () => {} }) => {
  const [backup, setBackup] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");

  useEffect(() => {
    setCountries(countriesData);
    setBackup(countriesData);
  }, []);

  const handleSearch = (value) => {
    setCountrySearch(value);
    setCountries(
      value ? countries.filter((c) => c.name.toLowerCase().trim().includes(value.toLowerCase().trim())) : backup
    );
  };

  return (
    <div className="country-dialog-bg">
      <div className="dialog-card">
        <h3>Select your country</h3>
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
          {countries.map((country, i) => {
            return (
              <div
                key={i}
                className="country-dialog-tile secondary-btn"
                onClick={() => {
                  getCountryData(country.name, country.dialling_code);
                }}
              >
                {/* <img
                  src={country.flag}
                  className="country-dialog-tile-flag"
                ></img> */}
                <h4 className="sub-text single-line-text country-dialog-cname">
                  {country.name}
                </h4>

                <h4 className="sub-text single-line-text">{country.code}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CountryDialog;
