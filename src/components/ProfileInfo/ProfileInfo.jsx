import React, { useEffect, useState } from "react";
import "./ProfileInfo.css";
import CountryDialog from "../CountryDialog/CountryDialog";

const ProfileInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [age, setAge] = useState("");
  // const { register, reset } = useForm();

  const handleSubmit = () => {
    event.preventDefault();
    // reset();
  };

  const getCountry = (name) => {
    setCountry(name);
    setShowCountryPicker(!showCountryPicker);
  };

  return (
    <div className="profile-info-bg">
      <div className="profile-info-card dialog-card">
        <h2 className="profile-info-top-text">More informations</h2>
        <h4 className="profile-info-sub-text sub-text">
          These are needed to setup your porfile
        </h4>
        <form className="dialog-form">

          <label htmlFor="auth-first-name">
            <span className="auth-input-feilds secondary-btn">
              <i className="fa-duotone fa-user normal-icon"></i>
              <input
                type="text"
                id="auth-first-name"
                placeholder="First name"
                className="auth-inputs"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </span>
          </label>

          <label htmlFor="auth-lastname">
            <span className="auth-input-feilds secondary-btn">
              <i className="fa-duotone fa-user normal-icon"></i>
              <input
                type="text"
                id="auth-lastname"
                placeholder="Last name"
                className="auth-inputs"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </span>
          </label>

          <label htmlFor="auth-username">
            <span className="auth-input-feilds secondary-btn">
              <i className="fa-duotone fa-user normal-icon"></i>
              <input
                type="text"
                id="auth-username"
                placeholder="Username"
                className="auth-inputs"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </span>
          </label>

          <label htmlFor="auth-age">
            <span className="auth-input-feilds secondary-btn">
              <i className="fa-duotone fa-input-numeric normal-icon"></i>
              <input
                type="number"
                id="auth-age"
                placeholder="Age"
                className="auth-inputs"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
            </span>
          </label>

          {!showCountryPicker && (
            <label htmlFor="auth-country"
                  onClick={() => {
                    setShowCountryPicker(true);
                  }}>
              <span
                className="auth-input-feilds secondary-btn"
                onClick={() => {
                  setShowCountryPicker(true);
                }}
              >
                <i className="fa-duotone fa-globe normal-icon"></i>
                <input
                  type="text"
                  id="auth-country"
                  placeholder="Country"
                  className="auth-inputs"
                  value={country}
                  // disabled
                />
              </span>
            </label>
          )}

          {showCountryPicker && (
            <CountryDialog
              getCountryName={(countryName) => {
                console.log(countryName);
                getCountry(countryName);
              }}
            />
          )}

          <button className="btn auth-btn" type="submit" onClick={handleSubmit}>
            <h4>Submit</h4>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
