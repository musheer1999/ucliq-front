import React, { Component } from "react";
import NavSection from "../components/organisms/nav-section";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./dashboard.css";
import pic from "../assets/images/acc.png";
import store from "../store";

export default class Dashboard extends Component {
  isDocVerified = store.getState().auth.user.isDocVerified;

  render() {
    return (
      <div className="dash">
        <NavSection />
        <div>
          <ul className="ul-dash">
            <li className='li-dash'>
              <div className="outer-div-dash">
                <Link to={"/dashboard/ownerprofile"} style={{ all: "unset" }}>
                  <div className="inner-div-dash">
                    <img alt='' src={pic} />
                    Owner Profile
                  </div>
                </Link>
              </div>
            </li>
            <li className='li-dash'>
              <div className="outer-div-dash">
                <Link
                  to={"/dashboard/businessprofile"}
                  style={{ all: "unset" }}
                >
                  <div className="inner-div-dash">
                    <img alt='' src={pic} />
                    Business Profile
                  </div>
                </Link>
              </div>
            </li>
            <li className='li-dash'>
              <div className="outer-div-dash">
                <div className="inner-div-dash">
                  <img alt='' src={pic} />
                  Payment Settings
                </div>
              </div>
            </li>
            <li className='li-dash'>
              <div className="outer-div-dash">
                <Link to={"/dashboard/yourOrders"} style={{ all: "unset" }}>
                  <div className="inner-div-dash">
                    <img alt='' src={pic} />
                    Latest Orders
                  </div>
                </Link>
              </div>
            </li>
            {this.isDocVerified ? (
              <li className='li-dash'>
                <div className="outer-div-dash">
                  <Link to={"/dashboard/sellercentral"}>
                    <div className="inner-div-dash">
                      <img alt='' src={pic} />
                      Seller Central
                    </div>
                  </Link>
                </div>
              </li>
            ) : (
                <li className="li-dash">
                  <div className="outer-div-dash">
                    <Link to={"/dashboard/businessprofile"}>
                      <div className="inner-div-dash">
                        <img alt='' src={pic} />
                    Seller Central (verify to enter)
                  </div>
                    </Link>
                  </div>
                </li>
              )}

            {this.isDocVerified ? (
              <li className=" li-dash">
                <div className="outer-div-dash">
                  <Link to={"/chat"}>
                    <div className="inner-div-dash">
                      <img alt='' src={pic} />
                      Chat Support
                    </div>
                  </Link>
                </div>
              </li>
            ) : (
                <li className=" li-dash">
                  <div className="outer-div-dash">
                    <Link to={"/dashboard/businessprofile"}>
                      <div className="inner-div-dash">
                        <img alt='' src={pic} />
                    Chat Support (verify to enter)
                  </div>
                    </Link>
                  </div>
                </li>
              )}
          </ul>
        </div>
      </div>
    );
  }
}
