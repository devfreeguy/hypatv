import React from "react";
import Logo from "../../assets/logo.png";
import "./Footer.css";
import { useNavigate, Link } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const date = new Date();
  return (
    <footer>
      <section className="footer-overlay">
        <div className="footer-grid">
          <div className="footer-sections">
            <img
              src={Logo}
              alt="HypaTv"
              className="footer-logo"
              onClick={() => {
                navigate("/");
              }}
            />
            <h4 className="sub-text footer-description">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus
              quidem consequuntur architecto iure ut pariatur eum praesentium
              exercitationem optio aliquid.
            </h4>
          </div>
          <div className="footer-sections">
            <h4 className="footer-sections-header">Useful links</h4>
            <ul className="footer-list">
              <li
                className="footer-links"
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
                <Link to={"/"} className="sub-text"></Link>
              </li>
              <li
                className="footer-links"
                onClick={() => {
                  navigate("/tv");
                }}
              >
                Tv Series
              </li>
              <li
                className="footer-links"
                onClick={() => {
                  navigate("/movie");
                }}
              >
                Movies
              </li>
            </ul>
          </div>
          <div className="footer-sections">
            <h4 className="footer-sections-header">Contact us</h4>
            <ul className="footer-list">
              <li
                className="footer-links"
                onClick={() => {
                  navigate("/");
                }}
              >
                Reach out
              </li>
              <li
                className="footer-links"
                onClick={() => {
                  navigate("/");
                }}
              >
                Report issue
              </li>
              <li
                className="footer-links"
                onClick={() => {
                  navigate("/");
                }}
              >
                Developers team
              </li>
            </ul>
            <span className="footer-social-link-list">
              <Link
                to="https://facbook.com/hypatv"
                className="sub-text footer-social-links"
              >
                <i className="fa-brands fa-facebook normal-icon"></i>
              </Link>
              <Link
                to="https://instagram.com/hypatv"
                className="sub-text footer-social-links"
              >
                <i className="fa-brands fa-instagram normal-icon"></i>
              </Link>
              <Link
                to="https://twitter.com/hypatv"
                className="sub-text footer-social-links"
              >
                <i className="fa-brands fa-twitter normal-icon"></i>
              </Link>
            </span>
          </div>
          <div className="footer-sections">
            <h4 className="footer-sections-header">Documents</h4>
            <ul className="footer-list">
              <li
                className="footer-links"
                onClick={() => {
                  navigate("/docs/privacy-policy");
                }}
              >
                Privacy policy
                <Link to={"/"} className="sub-text"></Link>
              </li>
              <li
                className="footer-links"
                onClick={() => {
                  navigate("/docs/disclaimer");
                }}
              >
                Disclaimer
              </li>
              <li
                className="footer-links"
                onClick={() => {
                  navigate("/docs/terms-of-service");
                }}
              >
                Terms of service
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-copyright">
          <h5 className="footer-copyright-text sub-text">&copy; All right reserved {date.getFullYear()}</h5>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
