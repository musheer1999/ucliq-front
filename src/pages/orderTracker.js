import React, { Component } from "react";
import NavSection from "../components/organisms/nav-section";
import { Container } from "reactstrap";
import { TiTick } from "react-icons/ti";
import { GrFormRefresh } from "react-icons/gr";
import { AiOutlineArrowRight } from "react-icons/ai";
import { IoMdCall } from "react-icons/io";
import "./orderTracker.css";
import axios from "axios";
import C from "../resource/values";

class orderTracker extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
      address: []
    };
  }

  componentDidMount = async () => {
    let p = await axios.get(
      C.SERVER_CALL + `/seller/view/${this.props.match.params.id}`
    );
    this.setState({
      address: p.data.address
    })
    this.setState({ product: p.data });
  };
  render() {
    return (
      <div>
        <NavSection />
        <Container>
          <div className="container">
            <div className="tracker-statusdiv">
              <h2 className="text-center">Order Status:</h2>
              <hr />
              <ul className="tracker-order-progressbar">
                <li className="tracker-order-li active">
                  <p className="tracker-icons active">
                    <TiTick
                      className="tracker-reacticon"
                      style={{
                        fontSize: "35px",
                        marginTop: "7px",
                        marginLeft: "2px",
                      }}
                    />
                  </p>

                  <p className="tracker-name active ">
                    Confirmed
                  </p>
                  <p className="tracker-date">
                    16 July,2020
                  </p>
                </li>
                <li className="tracker-order-li">
                  <p className="tracker-icons">
                    <GrFormRefresh
                      className="tracker-reacticon"
                      style={{
                        fontSize: "35px",
                        marginTop: "7px",
                        marginLeft: "2px",
                      }}
                    />
                  </p>
                  <p className="tracker-name">Ready</p>
                  <p className="tracker-date">16 July,2020</p>
                </li>
                <li className="tracker-order-li">
                  <p className="tracker-icons">
                    <GrFormRefresh
                      className="tracker-reacticon"
                      style={{
                        fontSize: "35px",
                        marginTop: "7px",
                        marginLeft: "2px",
                      }}
                    />
                  </p>
                  <p className="tracker-name">Dispatched</p>
                  <p className="tracker-date">16 July,2020</p>
                </li>
                <li className="tracker-order-li">
                  <p className="tracker-icons-last">
                    <GrFormRefresh
                      style={{
                        fontSize: "35px",
                        marginTop: "7px",
                        marginLeft: "2px",
                      }}
                    />
                  </p>
                  <p className="tracker-name ">Delivered</p>
                  <p className="tracker-date">16 July,2020</p>
                </li>
              </ul>
            </div>
            <hr />
          </div>
          <div className="tracker-newdiv">
            <div className="tracker-div">
              <div
                style={{ boxShadow: "2px 2px 2px 2px gray" }}
                className="tracker-productdetail"
              >
                <h1 className="tracker-heading">Order Item</h1>
                <div className="tracker-orderlist col-md-8">
                  <hr />
                  <div className="tracker-suborderlist">
                    <img
                      src={this.state.product.productImg}
                      alt="Product"
                      className="tracker-orderimg "
                    />

                    <div className="tracker-sublist text-left">
                      <p className="tracker-sublistp">
                        <b>
                          {this.state.product.productName}
                        </b>
                      </p>
                      <p className="trackerproduct-price">
                        Categry:{this.state.product.category}
                        <br />
                        Sub-category:{this.state.product.subcategory}
                        <br />
                        Total Price:₹{this.state.product.totalPrice}
                      </p>
                      <p>QTY: {this.state.product.quantity} </p>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
              <div
                style={{
                  padding: "1em",
                  borderRadius: "10px",
                  boxShadow: "1px 1px 1px 2px gray",
                }}
                className="tracker-productsummmary"
              >
                <h1 className="tracker-summaryh1">Order Summary</h1>
                <hr />
                <div style={{ display: "inline-flex" }}>
                  <p className="tracker-orderID">
                    Order ID:<b>#7878718481</b>
                  </p>
                  <p className="tracker-orderdate">
                    {this.state.product.date}
                  </p>
                </div>
                <hr />
                <div style={{ display: "inline-flex" }}>
                  <p>
                    Total Amount:<b>₹{this.state.product.totalPrice}</b>
                  </p>
                  <p className="tracker-orderqty">Qty:{this.state.product.quantity} items</p>
                </div>
              </div>
              <hr />
            </div>
            <div className="tracker-div-2">
              <div
                style={{ boxShadow: "2px 2px 2px 2px gray" }}
                className="tracker-costsummary "
              >
                <h1 className="tracker-cost-h1">Cost Summary</h1>
                <hr />
                <p>
                  Total Goods Amount
                    <span style={{ float: "right", clear: "both" }}>
                    <b>₹{this.state.product.totalPrice}</b>
                  </span>
                </p>
                <p>
                  Total{" "}
                  <span style={{ float: "right", clear: "both" }}>
                    <b>₹{this.state.product.totalPrice}</b>
                  </span>
                </p>
              </div>
              <div
                style={{ boxShadow: "2px 2px 2px 2px gray" }}
                className="tracker-address"
              >
                <h1 style={{ fontFamily: " Arial, Helvetica, sans-serif" }}>
                  Delivery Address
                  </h1>
                <hr />
                <p>
                  {this.state.address.hno}
                </p>
                <p>
                  {this.state.address.line1}
                </p>
                <p>
                  {this.state.address.state}
                </p>
                <p>
                  {this.state.address.city}
                </p>
              </div>
            </div>
            <div>
              <div
                style={{ boxShadow: "2px 2px 2px 2px gray" }}
                className="tracker-support text-left"
              >
                <h2>Support</h2>
                <hr />
                <p>
                  Change Order
                    <span style={{ float: "right" }}>
                    <AiOutlineArrowRight />
                  </span>
                </p>
                <hr />
                <p>
                  U-CLIQ Support
                    <span style={{ float: "right" }}>
                    <AiOutlineArrowRight />
                  </span>
                </p>
                <hr />
                <p>
                  Call Supplier
                    <span style={{ float: "right" }}>
                    <IoMdCall style={{ fontSize: "20px", color: "blue" }} />
                  </span>
                </p>
                <hr />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
export default orderTracker;
