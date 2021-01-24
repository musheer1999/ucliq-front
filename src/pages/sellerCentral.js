import React, { Component } from 'react';
import NavSection from '../components/organisms/nav-section/index'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import pic from "../assets/images/sell.png";
import pic1 from "../assets/images/items.png";
import "./sellerCentral.css";
import leftarrow from "../assets/images/leftarrow.png";

class sellerCentral extends Component {
    state = {}
    render() {
        return (<div>
            <NavSection />
            <div>
                <div className="container bread-sc">
                    <div className="bread-sc-pic">
                        <Link to={"/dashboard"}>
                            <img src={leftarrow} alt="" style={{ width: "30px" }} />
                        </Link>
                    </div>
                    <div className="bread-sc-crumb">
                        <Link to={"/dashboard"}>&nbsp;&nbsp;Dashboard </Link>&nbsp;/ Seller Central
                </div>
                </div>
                <ul className="ul-sc">
                    <li className="col-md-4 li-sc">
                        <div className="outer-div-sc">
                            <Link to={"/dashboard/sellercentral/sellproduct"} style={{ all: "unset" }}>
                                <div className="inner-div-sc">
                                    <div className="img-sc">
                                        <img alt='' src={pic} />
                                    </div>
                                    <div className="title-sc">
                                        Sell product
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </li>
                    <li className="col-md-4 li-sc">
                        <div className="outer-div-sc">
                            <Link to={"/dashboard/sellercentral/userproduct"} style={{ all: "unset" }}>
                                <div className="inner-div-sc">
                                    <div className="img-sc">
                                        <img alt='' src={pic1} />
                                    </div>
                                    <div className="title-sc">
                                        View all products
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </li>
                    <li className="col-md-4 li-sc">
                        <div className="outer-div-sc">
                            <Link to={"/orderReceived"}>
                                <div className="inner-div-sc">
                                    <div className="img-sc">
                                        <img alt='' src={pic} />
                                    </div>
                                    <div className="title-sc">
                                        Orders Recieved
                                </div>
                                </div>
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>);
    }
}

export default sellerCentral;