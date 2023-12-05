import React, { useEffect, useState } from "react";
import "./ProfileInfo.css";
import CountryDialog from "../CountryDialog/CountryDialog";
import { getData, saveData } from "../../config/firebaseConfig";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
  const navigate = useNavigate();
  const userid = sessionStorage.getItem("usersdata").uid;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [usersdata, setUsersdata] = useState([]);
  const [country, setCountry] = useState("");
  const [countryPhoneCode, setCountryPhoneCode] = useState("");
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [error, setError] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsesData = async () => {
      setUsersdata(await getData("usersdata"));
    };
    getUsesData();
  }, []);

  const handleSubmit = async () => {
    event.preventDefault();

    if (
      firstName &&
      lastName &&
      username &&
      phoneNo &&
      country &&
      countryPhoneCode &&
      age
    ) {
      usersdata.forEach((user) => {
        if (user.username === username) {
          setError("Username exist");
        } else if (user.phone_no === phoneNo) {
          setError("Sorry you cannot use this phone number");
        } else {
          setLoading(true);
          saveData(
            {
              age,
              country,
              firstname: firstName,
              lastname: lastName,
              phone_no: phoneNo,
              username,
              uid: userid,
              isEmailVerified: false,
            },
            "usersdata",
            (response, error) => {
              setLoading(false);
              response ? navigate("/") : setError(error);
            }
          );
        }
      });
    }else{
      setError('All feilds are required')
    }
  };

  const getCountry = (name) => {
    setCountry(name);
    setShowCountryPicker(!showCountryPicker);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="profile-info-card dialog-card">
        <h2 className="profile-info-top-text">More informations</h2>
        <h4 className="profile-info-sub-text sub-text">
          These are needed to setup your profile
        </h4>

        {error && <h5 className="error-text">{error}</h5>}
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
                required
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
                required
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
                required
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
                required
              />
            </span>
          </label>

          {!showCountryPicker && (
            <label
              htmlFor="auth-country"
              onClick={() => {
                setShowCountryPicker(true);
              }}
            >
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
                  required
                  readOnly
                />
              </span>
            </label>
          )}

          {showCountryPicker && (
            <CountryDialog
              getCountryData={(countryName, dailling_code) => {
                getCountry(countryName);
                setCountryPhoneCode(dailling_code);
              }}
            />
          )}

          <label htmlFor="auth-phone-no">
            <span className="auth-input-feilds secondary-btn">
              <i className="fa-duotone fa-phone normal-icon"></i>
              {countryPhoneCode && (
                <input
                  type="number"
                  placeholder={countryPhoneCode}
                  onChange={(e) => {
                    setCountryPhoneCode(e.target.value);
                  }}
                  id="country-code"
                  readOnly
                  disabled
                />
              )}
              <input
                type="number"
                id="auth-phone-no"
                placeholder="Phone number"
                className="auth-inputs"
                value={phoneNo}
                onChange={(e) => {
                  setPhoneNo(e.target.value);
                }}
                required
              />
            </span>
          </label>

          <button className="btn auth-btn" type="submit" onClick={handleSubmit}>
            <h4>Submit</h4>
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
