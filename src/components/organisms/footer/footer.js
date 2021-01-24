import React from "react";
import "./style.css";

import logo from "../../../assets/images/new-logo.png";
import { Link } from "react-router-dom";
import UP from "../../../assets/images/keyboard_arrow_up 2.png";
import FB from "../../../assets/images/fb.svg";
import LINKEDIN from "../../../assets/images/linkedin.svg";
import INSTA from "../../../assets/images/insta.svg";

export default function footer() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <div className="footer-backtotop text-center" onClick={scrollTop}>
        <img
          alt=""
          src={UP}
          className="top-icon"
          style={{
            color: "white",
            fontSize: "7px",
            margin: "0",
            marginTop: "-15px",
            padding: "0.3em",
            cursor: "pointer",
          }}
        />
        <p
          style={{
            color: "white",
            textAlign: "center",
            margin: "0",
            padding: "0",
            marginTop: "-15px",
          }}
        >
          BACK TO TOP
        </p>
      </div>
      <div className="footer">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div className="social-icons">
            <img className="footer-logo" src={logo} alt="logo" />
            <div className="footer-icons-div">
              <p className="contact-us-footer">
                <b>Connect with Us</b>
              </p>
              <div className="footer-icons">
                <img
                  src={INSTA}
                  alt=""
                  style={{ fontSize: "5px", cursor: "pointer" }}
                />
                <img
                  src={FB}
                  alt=""
                  style={{
                    fontSize: "3px",
                    marginLeft: "15px",
                    cursor: "pointer",
                  }}
                />
                <img
                  src={LINKEDIN}
                  alt=""
                  style={{
                    fontSize: "6px",
                    marginLeft: "15px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="footer-info">
            <ul className="footer-ui">
              <li className="footer-ui-1">Make Money with UCLIQ</li>

              <li>
                <Link to="/dashboard/sellercentral">Sell on UCLIQ</Link>
              </li>

              <a>
                <li>Terms and Conditions</li>
              </a>
              <a>
                <li>About Ucliq</li>
              </a>
              {/* <a>
                <li>Become an Afffiliate</li>
              </a> */}
            </ul>
            {/* <ul className="footer-ui">
              <li className='footer-ui-1'>Make Money with UCLIQ</li>
              <a>
                <li>Sell on UCLIQ</li>
              </a>
              <a>
                <li>Fullfilled by UCLIQ</li>
              </a>
              <a>
                <li>Advertise your product</li>
              </a>
              <a>
                <li>Become an Afffiliate</li>
              </a>
            </ul> */}
          </div>
          <div className="contact-us-div">
            <p>
              Contact Us : &nbsp;
              <span style={{ color: "white" }}>
                <a href="tel:+91-8882664898">+91-8882664898</a>
              </span>
            </p>
          </div>
        </div>
        <div className="footer-terms text-center">
          <p style={{ marginTop: "20px" }}>
            &copy; Terms and Condition of use &amp; sale
          </p>
        </div>
      </div>
    </>
  );
}
