import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import NavSection from "../components/organisms/nav-section";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import axios from "axios";
import "./productpage.css";
import C from "../resource/values";
import store from "../store";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import footer from "../components/organisms/footer/footer";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

export default class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      p: null,
      imgData: [],
      showurl: "",
      added: false,
      isAuth: false,
      prod: null,
      minqty: 0,
    };
  }
  componentDidMount = async () => {
    this.setState({ isAuth: store.getState().auth.isAuthenticated });
    store.subscribe(() => {
      this.setState({
        isAuth: store.getState().auth.isAuthenticated,
      });
    });
    if (!this.state.isAuth) {
      return axios
        .get(C.SERVER_CALL + `/products/${this.props.match.params.id}/public`)
        .then((res) => {
          this.setState({ prod: res.data.product });
          // console.log({ prod: this.state.product, fetchedData: res.data });
          this.setState({ minqty: res.data.product.qty });
          if (res.data.product.images.length > 0)
            this.setState({ showurl: res.data.product.images[0].image });
        })
        .catch((e) =>
          alert("some error has occured. try again later")
          // console.log({ e })
        );
    } else {
      return axios
        .get(C.SERVER_CALL + `/products/${this.props.match.params.id}`)
        .then((res) => {
          this.setState({ prod: res.data.product });
          // console.log({ prod: this.state.product, fetchedData: res.data });
          this.setState({ minqty: res.data.product.qty });
          if (res.data.product.images.length > 0)
            this.setState({ showurl: res.data.product.images[0].image });
        })
        .catch((e) =>
          // console.log({ e })
          alert("some error has occured. try again later")
        );
    }
  };

  addToCart = async (shouldBuyNow) => {
    if (
      store.getState().auth.isDocVerified === false ||
      store.getState().auth.isDocVerified === undefined
    ) {
      this.props.history.push("/login");
    } else {
      let res = await axios.post(C.SERVER_CALL + "/products/addtocart", {
        productId: this.props.match.params.id,
        quantity: this.state.minqty,
        displayImg: this.state.prod.images[0].image,
        price: this.state.prod.price * this.state.minqty,
        prodName: this.state.prod.product_name,
        gst: this.state.prod.gst,
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
    if (this.state.minqty > this.state.prod.qty) {
      this.setState((prevState) => ({
        minqty: prevState.minqty - 1,
      }));
    }
  };
  isDocVerified = store.getState().auth.user.isDocVerified;

  render() {
    return (
      <div>
        <NavSection />
        <div className="row product-categorybar">
          <p className="product-category-sub">
            <pre>CATEGORY &gt; SUBCATEGORY</pre>
          </p>
        </div>
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
                  {this.state.prod.product_name} is added into cart.
                </ToastBody>
              </Toast>
            </div>
          </div>
        ) : null}
        <Container className="no-margin-active">
          <Row className="no-margin-active">
            {this.state.prod ? (
              <div className="main-div">
                <div className="sub-div">
                  <div className="images-prod">
                    {this.state.prod.images.map((m) =>
                      m.image == this.state.showurl ? (
                        <ul className="showurl">
                          <li className="showurlli">
                            <div className="showmain-div">
                              <img
                                src={m.image}
                                alt=""
                                className="showmain"
                                onClick={() => {
                                  this.setState({ showurl: m.image });
                                }}
                              />
                            </div>
                          </li>
                        </ul>
                      ) : (
                          <ul className="showurl">
                            <li>
                              <img
                                src={m.image}
                                alt=""
                                className="notshowmain"
                                onClick={() => {
                                  this.setState({ showurl: m.image });
                                }}
                              />
                            </li>
                          </ul>
                        )
                    )}
                  </div>
                  <div className="main-imgurl">
                    <img className="urlimage" alt="" src={this.state.showurl} />
                  </div>
                </div>
                <div className="my-product-details col-md-8 col-sm-12">
                  <h3>{this.state.prod.product_name}</h3>
                  <h6>SELLER</h6>
                  <div className="product-newdescription">
                    <div className="product-basicdetails">
                      <p className="product-price">
                        <b>PRICE:</b>
                        <span style={{ color: "blue" }}>
                          {" "}
                          {this.isDocVerified ? (
                            <strike>${this.state.prod.price}</strike>
                          ) : (
                              "locked (please verify)"
                            )}
                        </span>
                      </p>
                      <p className="product-discount">
                        <pre>Discount: 30%</pre>
                      </p>
                    </div>
                    <div
                      style={{
                        borderBottom: "1px solid gray",
                        maxWidth: "420px",
                      }}
                    ></div>
                    <br />
                    <div
                      className="product-minquantity"
                      style={{ display: "flex" }}
                    >
                      <p>
                        <b>MIN QUNATITY:</b>
                      </p>
                      <button
                        style={{
                          backgroundColor: "#FECC36",
                          border: "none",
                          width: "35px",
                          borderRadius: "5px",
                        }}
                        onClick={this.decrementqty}
                      >
                        <AiOutlineMinusCircle style={{ marginBottom: "5px" }} />
                      </button>{" "}
                      <p
                        style={{
                          backgroundColor: "#DCDCDC",
                          width: "30px",
                          textAlign: "center",
                        }}
                      >
                        {this.state.minqty}
                      </p>
                      <button
                        style={{
                          backgroundColor: "#FECC36",
                          border: "none",
                          width: "35px",
                          borderRadius: "5px",
                        }}
                        onClick={this.incrementqty}
                      >
                        <AiOutlinePlusCircle style={{ marginBottom: "5px" }} />
                      </button>
                    </div>
                    <div className="product-buttons">
                      <button
                        onClick={() => this.addToCart(false)}
                        className="btn"
                        style={{
                          backgroundColor: "#F35F54",
                          fontWeight: "600",
                        }}
                      >
                        ADD TO CART <FaShoppingCart />
                      </button>
                      <button
                        style={{
                          backgroundColor: "#FECC36",
                          fontWeight: "500",
                          padding: ".5em",
                        }}
                        className="btn  mx-3"
                        onClick={() => this.addToCart(true)}
                      >
                        BUY NOW
                      </button>
                    </div>
                    <div className="product-description-desc">
                      <p>
                        <b>PRODUCT DESCRIPTION</b>
                      </p>
                      <p style={{ textAlign: "justify" }}>
                        LOREM IPSUM GENERATOR Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
                <></>
              )}
          </Row>
          <hr />
          <div className="product-product-similar-div">
            <p>
              <b>PRODUCT SIMILAR TO THIS ITEM</b>
            </p>
            <div className="similar-products">
              <div className="similarprods-div">
                <div>
                  <img
                    className="similar-prods-image"
                    alt=""
                    src="https://images-na.ssl-images-amazon.com/images/I/51jKm1MY43L._SX569_.jpg"
                  />
                </div>
                <div
                  style={{
                    backgroundColor: "#DCDCDC",
                    textAlign: "left",
                    padding: "0.5em",
                  }}
                >
                  <p>Product-name</p>
                  <p style={{ margin: "0", padding: "0", marginTop: "-10px" }}>
                    $300
                  </p>
                </div>
              </div>
              <div className="similarprods-div">
                <div>
                  <img
                    alt=""
                    className="similar-prods-image"
                    src="https://images-na.ssl-images-amazon.com/images/I/51jKm1MY43L._SX569_.jpg"
                  />
                </div>
                <div
                  style={{
                    backgroundColor: "#DCDCDC",
                    textAlign: "left",
                    padding: "0.5em",
                  }}
                >
                  <p>Product-name</p>
                  <p style={{ margin: "0", padding: "0", marginTop: "-10px" }}>
                    $300
                  </p>
                </div>
              </div>
              <div className="similarprods-div">
                <div>
                  <img
                    alt=""
                    className="similar-prods-image"
                    src="https://images-na.ssl-images-amazon.com/images/I/51jKm1MY43L._SX569_.jpg"
                  />
                </div>
                <div
                  style={{
                    backgroundColor: "#DCDCDC",
                    textAlign: "left",
                    padding: "0.5em",
                  }}
                >
                  <p>Product-name</p>
                  <p style={{ margin: "0", padding: "0", marginTop: "-10px" }}>
                    $300
                  </p>
                </div>
              </div>
              <div className="similarprods-div">
                <div>
                  <img
                    alt=""
                    className="similar-prods-image"
                    src="https://images-na.ssl-images-amazon.com/images/I/51jKm1MY43L._SX569_.jpg"
                  />
                </div>
                <div
                  style={{
                    backgroundColor: "#DCDCDC",
                    textAlign: "left",
                    padding: "0.5em",
                  }}
                >
                  <p>Product-name</p>
                  <p style={{ margin: "0", padding: "0", marginTop: "-10px" }}>
                    $300
                  </p>
                </div>
              </div>
              <div className="similarprods-div">
                <div>
                  <img
                    alt=""
                    className="similar-prods-image"
                    src="https://images-na.ssl-images-amazon.com/images/I/51jKm1MY43L._SX569_.jpg"
                  />
                </div>
                <div
                  style={{
                    backgroundColor: "#DCDCDC",
                    textAlign: "left",
                    padding: "0.5em",
                  }}
                >
                  <p>Product-name</p>
                  <p style={{ margin: "0", padding: "0", marginTop: "-10px" }}>
                    $300
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="customer-review-div">
            <div className="customer-reviews-stars">
              <p>
                <b>CUSTOMER REVIEWS</b>
              </p>
              <div style={{ display: "inline-flex" }}>
                <span className="checked">
                  <AiFillStar />
                </span>
                <span className="checked">
                  <AiFillStar />
                </span>
                <span className="">
                  <AiFillStar />
                </span>
                <span className="">
                  <AiFillStar />
                </span>
                <span className="">
                  <AiFillStar />
                </span>
                <p
                  style={{
                    marginLeft: "20px",
                    marginTop: "2px",
                    fontSize: "15px",
                  }}
                >
                  {" "}
                  2 out of 5 stars
                </p>
              </div>
              <p style={{ marginTop: "-10px", fontSize: "15px" }}>
                500 customer reviews
              </p>
              <hr />
              <button
                style={{
                  backgroundColor: "#C8C8C8",
                  border: "none",
                  padding: "0.5em",
                  fontWeight: "500",
                }}
              >
                REVIEW THIS PRODUCT
              </button>
            </div>
            <div className="customer-reviews">
              <p>
                <b>CUSTOMER IMAGES</b>
              </p>
              <div className="customer-review-images">
                <img
                  alt=""
                  src="https://grist.files.wordpress.com/2011/05/coke-coca-cola-can-flickr-oleg-sklyanchuk-500.jpg"
                  className="customer-images"
                />
                <img
                  alt=""
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTJ5Es5eu9bxEBZh1OGr7gadVaOI2mvNWs0GQ&usqp=CAU"
                  className="customer-images"
                />
                <img
                  alt=""
                  src="https://i.dailymail.co.uk/1s/2020/04/12/17/27105462-8212421-image-a-1_1586709026623.jpg"
                  className="customer-images"
                />
                <img
                  alt=""
                  src="https://grist.files.wordpress.com/2011/05/coke-coca-cola-can-flickr-oleg-sklyanchuk-500.jpg"
                  className="customer-images"
                />
                <img
                  alt=""
                  src="https://5.imimg.com/data5/DC/LX/CM/SELLER-13176868/2-litre-thums-up-soft-drinks-500x500.jpg"
                  className="customer-images"
                />
              </div>
              <hr />
              <div className="customer-written-reviews">
                <div style={{ display: "flex" }}>
                  <img
                    alt=""
                    src=""
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "60%",
                      backgroundColor: "gray",
                      marginRight: "20px",
                    }}
                  />
                  <div>
                    <p>UCLIQ CUSTOMER</p>
                    <span className="checked">
                      <AiFillStar />
                    </span>
                    <span className="checked">
                      <AiFillStar />
                    </span>
                    <span className="checked">
                      <AiFillStar />
                    </span>
                    <span className="">
                      <AiFillStar />
                    </span>
                    <span className="">
                      <AiFillStar />
                    </span>
                  </div>
                </div>
                <p className="review-details">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
              </div>
              <hr />
              <div className="customer-written-reviews">
                <div style={{ display: "flex" }}>
                  <img
                    alt=""
                    src=""
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "60%",
                      backgroundColor: "gray",
                      marginRight: "20px",
                    }}
                  />
                  <div>
                    <p>UCLIQ CUSTOMER</p>
                    <span className="checked">
                      <AiFillStar />
                    </span>
                    <span className="checked">
                      <AiFillStar />
                    </span>
                    <span className="checked">
                      <AiFillStar />
                    </span>
                    <span className="">
                      <AiFillStar />
                    </span>
                    <span className="">
                      <AiFillStar />
                    </span>
                  </div>
                </div>
                <p className="review-details">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
              </div>
              <hr />
              <div className="customer-written-reviews">
                <div style={{ display: "flex" }}>
                  <img
                    alt=""
                    src=""
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "60%",
                      backgroundColor: "gray",
                      marginRight: "20px",
                    }}
                  />
                  <div>
                    <p>UCLIQ CUSTOMER</p>
                    <span className="checked">
                      <AiFillStar />
                    </span>
                    <span className="checked">
                      <AiFillStar />
                    </span>
                    <span className="checked">
                      <AiFillStar />
                    </span>
                    <span className="">
                      <AiFillStar />
                    </span>
                    <span className="">
                      <AiFillStar />
                    </span>
                  </div>
                </div>
                <p className="review-details">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
              </div>
              <hr />
              <div className="customer-written-reviews">
                <div style={{ display: "flex" }}>
                  <img
                    alt=""
                    src=""
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "60%",
                      backgroundColor: "gray",
                      marginRight: "20px",
                    }}
                  />
                  <div>
                    <p>UCLIQ CUSTOMER</p>
                    <span className="checked">
                      <AiFillStar />
                    </span>
                    <span className="checked">
                      <AiFillStar />
                    </span>
                    <span className="checked">
                      <AiFillStar />
                    </span>
                    <span className="">
                      <AiFillStar />
                    </span>
                    <span className="">
                      <AiFillStar />
                    </span>
                  </div>
                </div>
                <p className="review-details">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
          <hr />

          <hr />
        </Container>
        {footer()}
      </div>
    );
  }
}
