import React, { Component } from "react";
import NavSection from "../components/organisms/nav-section";
import { Container} from "reactstrap";
import "./paymentDetails.css";
import axios from "axios";
import C from "../resource/values";

class paymentDetails extends Component {
  constructor() {
    super();
    this.state = {
      address: [],
      mode: "",
      shipping: 30,
    };
  }

  componentDidMount = async () => {
    this.setState({ address: this.props.location.state.address });
  };

  selectMode = (event) => {
    this.setState({ mode: event.target.name });
  };

  pay = async () => {
    let prcedPay = await axios.post(C.SERVER_CALL + "/cart/order/push", {
      address: this.state.address,
      totalPrice: this.props.location.state.subTotal + this.state.shipping,
      modeOfPayment: this.state.mode,
    });
    if (prcedPay) this.props.history.push("/orderPlaced");
  };

  render() {
    return (
      <div>
        <NavSection />
        <div className="container">
          <ul className="order-progressbar">
            <li className="order-li active">Step 1</li>
            <li className="order-li active">Step 2</li>
            <li className="order-li">Step 3</li>
          </ul>
        </div>
        <Container>
          <div className="payment-maindiv">
            <div className="payment-options">
              <h3 classNam="text-center">Payment Settings</h3>
              <form className="payment-form">
                <input
                  type="radio"
                  name="cod"
                  checked={this.state.mode === "cod"}
                  onChange={this.selectMode}
                ></input>
                <label className="order-radiolabel">COD</label>
                <br />
                <hr />
                <input
                  disabled="true"
                  type="radio"
                  name="debit"
                  checked={this.state.mode === "debit"}
                  onChange={this.selectMode}
                ></input>
                <label className="order-radiolabel text-muted">
                  Debit Card
                </label>
                <br />
                <hr />
                <input
                  disabled="true"
                  type="radio"
                  name="credit"
                  checked={this.state.mode === "credit"}
                  onChange={this.selectMode}
                ></input>
                <label className="order-radiolabel text-muted">
                  Credit Card
                </label>
                <br />
                <hr />
                <input
                  disabled="true"
                  type="radio"
                  name="net"
                  checked={this.state.mode === "net"}
                  onChange={this.selectMode}
                ></input>
                <label className="order-radiolabel text-muted">
                  Net Banking
                </label>

                <hr />
              </form>
            </div>
            <div className="payment-summary">
              <div className="order-content">
                <p className="order-itemname">{"Bill summary"}</p>
                <p>Sub total : {this.props.history.location.state.subTotal}</p>
                <p>Shipping : {this.state.shipping}</p>
              </div>
              <p className="payment-summaryp">
                Total Amount:₹
                <b>
                  {this.props.history.location.state.subTotal +
                    this.state.shipping}
                </b>
              </p>
              {this.state.mode.length > 0 ? (
                <>
                  {/* <Link to={'/orderPlaced'}> */}
                  <button
                    style={{ backgroundColor: "#fecc36" }}
                    className="payment-btn btn "
                    onClick={this.pay}
                  >
                    Proceed To Buy
                  </button>
                  {/* </Link> */}
                </>
              ) : (
                  <button
                    style={{ backgroundColor: "#fecc36" }}
                    className="payment-btn btn "
                    disabled="true"
                  >
                    Proceed To Buy
                  </button>
                )}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
export default paymentDetails;
