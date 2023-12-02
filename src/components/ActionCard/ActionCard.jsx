import React, { useEffect, useState } from "react";
import "./ActionCard.css";
import { getData, signout } from "../../config/firebaseConfig";
// import { savedUserdata } from "../../config/config";
import CustomAlert from "../CustomAlert/CustomAlerts";
import { useNavigate } from "react-router-dom";

const ActionCard = ({ close }) => {
  const navigate = useNavigate();
  const savedUserdata = JSON.parse(sessionStorage.getItem("usersdata"));
  const [profilePic, setProfilePic] = useState("/images/profile.png");
  const [userdata, setUserdata] = useState({});
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isClosing, setIsClosing] = useState(true);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const usersdata = await getData("usersdata");
        usersdata.map((user) => {
          if (user.uid === savedUserdata.uid) {
            setUserdata(user);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUsersData();
  }, []);

  const handleClose = () => {
    close();
  };

  return (
    <div className="action-card-bg">
      {isLoggingOut && (
        <CustomAlert
          type="dialog"
          title="Confirm action"
          message={`Are you sure you want to log out?`}
          button={{
            positive: {
              text: "No",
              perform: () => {
                setIsLoggingOut(false);
              },
            },
            negative: {
              text: "Yes",
              perform: () => {
                signout((error) => {
                  setIsLoggingOut(false);
                  if (error) {
                    console.log(error);
                  } else {
                    navigate("/login");
                  }
                });
              },
            },
          }}
        />
      )}
      <div className="action-card dialog-card">
        {userdata !== null ? (
          <>
            <i
              className="fa-solid fa-close normal-icon close-btn action-card-close"
              onClick={handleClose}
            ></i>
            <img src={profilePic} alt="Profile" id="action-card-profile" />
            <h3 className="action-card-name">{`${
              userdata?.firstname ? userdata?.firstname : ""
            } ${userdata?.lastname ? userdata?.lastname : ""}`}</h3>
            <h5 className="action-card-email sub-text">
              {savedUserdata?.email}
            </h5>
            {!userdata?.isEmailVerified && (
              <h5 className="action-card-error-text error-text">
                Your account needs verification
              </h5>
            )}

            <div className="action-card-other">
              <span className="secondary-btn action-card-tile">
                <i className="fa-solid fa-bell medium-icon action-card-tile-icon"></i>
                <h5 className="sub-text action-card-tile-text">
                  Notifications
                </h5>
                <i className="fa-solid fa-angle-right small-icon action-card-tile-angle-icon"></i>
              </span>
            </div>

            <div className="action-card-action-btn-bg">
              <button className="action-card-action-btn btn">
                <h5>
                  {userdata?.isEmailVerified
                    ? "Edit profile"
                    : "Verify account"}
                </h5>
              </button>
              <button
                className="action-card-action-btn relative-btn"
                onClick={() => {
                  setIsLoggingOut(true);
                }}
              >
                <h5>Log out</h5>
              </button>
            </div>
          </>
        ) : (
          <div className="dialog-card">
            <span className="sub-text">Fetching data...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionCard;
