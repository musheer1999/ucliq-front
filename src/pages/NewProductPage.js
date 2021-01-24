import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Spinner,
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";
import NavSection from "../components/organisms/nav-section/index";
import C from "../resource/values";
import axios from "axios";
import store from "../store";
export default class NewProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      added: false,
      isAuth: false,
      minqty: 0,
    };
  }

  btnStyleText = {
    backgroundColor: "white",
    padding: "6px",
    border: "0",
    color: "#fea500",
    fontWeight: "700",
    fontSize: "28px",
    margin: "0",
  };

  btnStyle = {
    backgroundColor: "white",
    padding: "6px",
    border: "0",
    color: "black",
    fontSize: "28px",
    margin: "0",
  };

  smallText = {
    fontSize: "16px",
    fontWeight: "400",
  };

  content = `
  • No Cost EMI: Avail No Cost EMI on select cards for orders above ₹3000.
• Bank Offer (2): 10% Amazon Pay Cashback on purchase of Rs.500 or more with newly saved VISA cards.
• 5% Instant discount with HSBC Cashback card 
• Cashback: Get 10% up to ₹150 back, pay with Amazon Pay UPI. Valid once per customer on 1st Amazon Pay UPI transaction on App. Click here to check eligibility.
• Partner Offers (4): Get FLAT 5% BACK with Amazon Pay ICICI Bank Credit card for Prime members. Flat 3% BACK for non-Prime members.
• Buy now & pay next month at 0% interest or pay in EMIs with Amazon Pay Later. Instant credit upto ₹20,000. Check eligibility here! 
  `;

  componentDidMount() {
    axios
      .get(C.SERVER_CALL + `/products/${this.props.match.params.id}/public`)
      .then((res) => {
        // console.log(res.data);
        this.setState({
          product: res.data.product,
          minqty: res.data.product.qty,
        });
      })
      .catch((error) => { }
        //  console.log({ error })
      );
  }

  showPrices() {
    if (store.getState().auth.isAuthenticated == false) {
      return "Please Sign in.";
    } else if (store.getState().auth.user.isDocVerified == false) {
      return "Please verify your documents first.";
    } else {
      return (
        "Rs. " +
        parseInt(
          this.state.product.price -
          (this.state.product.price * this.state.product.discount) / 100
        )
      );
    }
  }

  addToCart = async (shouldBuyNow) => {
    if (
      store.getState().auth.user.isDocVerified === false ||
      store.getState().auth.user.isDocVerified === undefined
    ) {
      this.props.history.push("/dashboard/businessprofile?route=buynow");
    } else {
      let res = await axios.post(C.SERVER_CALL + "/products/addtocart", {
        productId: this.props.match.params.id,
        quantity: this.state.minqty,
        displayImg: this.state.product.images[0].image,
        price: this.state.product.price * this.state.minqty,
        prodName: this.state.product.product_name,
        gst: this.state.product.gst,
      });
      if (shouldBuyNow) {
        this.props.history.push("/orderAddress");
      } else {
        this.setState({ added: !this.state.added });
        setTimeout(() => {
          this.setState({ added: !this.state.added });
        }, 3000);
      }
    }
  };

  incrementqty = () => {
    this.setState((prevState) => ({
      minqty: prevState.minqty + 5,
    }));
  };
  decrementqty = () => {
    if (this.state.minqty > this.state.product.qty) {
      this.setState((prevState) => ({
        minqty: prevState.minqty - 1,
      }));
    }
  };

  render() {
    return (
      <>
        <NavSection />
        {this.state.added ? (
          <div
            style={{
              position: "absolute",
              right: "3%",
              zIndex: "10",
              width: "300px",
            }}
          >
            <div className="p-3 my-2 rounded">
              <Toast>
                <ToastHeader>
                  <em>Cart Update</em>
                </ToastHeader>
                <ToastBody>
                  {this.state.product.product_name} is added into cart.
                </ToastBody>
              </Toast>
            </div>
          </div>
        ) : null}
        <Container style={{ backgroundColor: "white", minHeight: "90vh" }}>
          {this.state.product === null ? (
            <Spinner
              style={{
                width: "3rem",
                height: "3rem",
                margin: "30% calc(50% - 1.5rem)",
              }}
            />
          ) : (
              <>
                <Row>
                  <Col>
                    {this.state.product.category} &gt;{" "}
                    {this.state.product.subcategory} &gt;{" "}
                    {this.state.product.product_name}
                  </Col>
                </Row>
                <Row>
                  {" "}
                  <hr />
                </Row>
                <Row>
                  <Col md="2">
                    {this.state.product.images.map((item) => {
                      return <img style={{ margin: "1px" }} src={item.image} />;
                    })}
                  </Col>
                  <Col md="4">
                    <img
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                      src={this.state.product.images[0].image}
                    />
                  </Col>
                  <Col md="6">
                    <Row>
                      <Col>
                        <h2>{this.state.product.product_name}</h2>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        Sold by:{" "}
                        <span style={{ color: "#85A4CB" }}>
                          {this.state.product.seller_name}
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <hr width="95%" />
                      <Col
                        xs="6"
                        style={{ borderRight: "1px solid", margin: "auto" }}
                      >
                        {store.getState().auth.isAuthenticated &&
                          store.getState().auth.user.isDocVerified ? (
                            <Row>
                              <Col>
                                M.R.P. :{" "}
                                <del style={{ color: "crimson" }}>
                                  Rs. {this.state.product.price}
                                </del>
                              </Col>
                            </Row>
                          ) : (
                            <></>
                          )}
                        <Row>
                          <Col>{this.showPrices()}</Col>
                        </Row>
                      </Col>
                      <Col
                        xs="6"
                        style={{
                          margin: "auto",
                          paddingLeft: "2em",
                        }}
                      >
                        <Row>
                          <Col>Quantity</Col>
                        </Row>
                        <Row>
                          <ButtonGroup size="md">
                            <Button
                              onClick={this.incrementqty}
                              style={this.btnStyle}
                            >
                              {" "}
                            +{" "}
                            </Button>
                            <Button style={this.btnStyleText}>
                              {" "}
                              {this.state.minqty}{" "}
                            </Button>
                            <Button
                              onClick={this.decrementqty}
                              style={this.btnStyle}
                            >
                              {" "}
                            -{" "}
                            </Button>
                          </ButtonGroup>
                        </Row>
                      </Col>
                    </Row>
                    <hr width="95%" />
                    <Row>
                      <Col>
                        <Button
                          onClick={() => this.addToCart(false)}
                          color="warning"
                        >
                          Add to cart
                      </Button>
                      </Col>
                      <Col>
                        <Button
                          onClick={() => this.addToCart(true)}
                          style={{
                            backgroundColor: "whitesmoke",
                            color: "black",
                          }}
                        >
                          Buy now
                      </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>Description</Col>
                    </Row>
                    <Row>
                      <Col style={this.smallText}>
                        {this.state.product.description}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>
            )}
        </Container>
      </>
    );
  }
}
