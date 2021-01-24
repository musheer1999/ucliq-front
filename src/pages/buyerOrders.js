import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  Button,
} from "reactstrap";
import NavSection from "../components/organisms/nav-section";
import "./buyerOrders.css";
import axios from "axios";
import C from "../resource/values";
import { Link } from "react-router-dom";

class buyerOrder extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    };
  }

  componentDidMount = async () => {
    axios
      .get(C.SERVER_CALL + "/cart/bills")
      .then((orders) => {
        this.setState({ orders: orders.data });
      })
      .catch((err) => {
      });
  };

  render() {
    return (
      <div>
        <NavSection />
        <Container fluid={true}>
          <h1>Your Orders</h1>
          <hr />
          {this.state.orders.map((i) => {
            return (
              <div className="buyerorders">
                <div className="buyerordres-heading">
                  <p className="buyerorder-placed">ORDER PLACED</p>
                  <p className="buyerorder-date">{i.date}</p>
                  <p className="buyerorder-status">
                    STATUS:<span>{i.status}</span>
                  </p>
                </div>
                <div className="buyerorder-maindiv">
                  <div className="buyerorders-div">
                    <img src={i.productImg} className="buyer-image" />
                    <div>
                      <p className="buyerorder-productname">
                        <h3>{i.productName}</h3>
                        <b>{i.desc}</b>
                      </p>
                      <p className="buyerorder-sold">
                        <b>Sold By:</b>
                        {i.sellerName}
                      </p>
                      <div className="buyerorder-basicdetials">
                        <p>
                          <b>Price:</b>
                          {i.totalPrice}
                        </p>
                        <p>
                          <b>Qty:</b>
                          {i.quantity}
                        </p>
                        <p>
                          <b>Mode of Payment:</b>
                          {i.modeOfPayment}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="buyerorders-options">
                    {i.status == "Order Cancelled" ? (
                      <>
                        <button className="recieved-order-confirm btn btn-danger mx-5">
                          Order Cancelled
                        </button>
                      </>
                    ) : (
                        <></>
                      )}
                    {i.status !== "Order Cancelled" ? (
                      <>
                        <Link to={`/trackOrder/${i._id}`}>
                          <button className="buyerorders-btn btn btn-secondary">
                            Track Order
                          </button>
                        </Link>
                        <button className="buyerorders-btn btn btn-secondary">
                          Return or replace item
                        </button>
                        <Link to={`/cancelOrder/${i._id}`}>
                          <button className="buyerorders-btn btn btn-secondary">
                            Cancel Order
                          </button>
                        </Link>
                      </>
                    ) : (
                        <></>
                      )}
                  </div>
                </div>
              </div>
            );
          })}{" "}
          {this.state.orders.map((i) => {
            let billPrice = 0;
            return (
              <>
                <ListGroup>
                  {i.bill.map((item) => {
                    billPrice += item.totalPrice;
                    return (
                      <ListGroupItem>
                        {item.productName} - &#8377; {item.totalPrice}
                      </ListGroupItem>
                    );
                  })}
                  <ListGroupItem>
                    <Row>
                      <Col xs="6">
                        {" "}
                        <strong>Bill: &#8377; {billPrice}</strong>
                      </Col>
                      <Col xs="6">
                        <Button style={{ margin: "0.4em" }}>Track Order</Button>
                        <Button style={{ margin: "0.4em" }}>
                          Return/Replace
                        </Button>
                        <Button style={{ margin: "0.4em" }}>
                          Write a review
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
                <hr />
              </>
            );
          })}
        </Container>
      </div>
    );
  }
}
export default buyerOrder;
