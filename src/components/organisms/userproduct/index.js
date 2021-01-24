import React, { Component } from "react";
import NavSection from "../nav-section/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import axios from "axios";
import { Link } from "react-router-dom";
import edit from "../../../assets/images/edit.png";
import trash from "../../../assets/images/trash.png";
import C from "../../../resource/values"

class Deletemodal extends Component {
  render() {
    return (
      <div>
        <div className="popup_del">
          <div className="popup_inner_del">
            <div className="del-header">Delete Item</div>
            <div className="del-content">Are you sure you want to delete ?</div>
            <div className="del-footer">
              <div>
                <button
                  className="btn btn-secondary"
                  style={{ marginRight: "4px" }}
                  onClick={this.props.toggleDelete}
                >
                  No
                </button>
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "4px" }}
                  onClick={this.props.confirmDelete}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class userproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      deleteitem: false,
      todelete: "",
    };
  }
  increase() {
    document.getElementById("product_images").style.display = "block";
    document.getElementById("view_all").style.display = "none";
    document.getElementById("hide_all").style.display = "block";
  }
  decrease() {
    document.getElementById("product_images").style.display = "none";
    document.getElementById("view_all").style.display = "inline-block";
    document.getElementById("hide_all").style.display = "none";
  }
  componentDidMount = async () => {
    let p = await axios.post(
      C.SERVER_CALL + '/products/getuserproducts'
    );
    this.setState({ product: p.data });
  };

  confirmDeleteModal = async () => {
    let res = await axios.delete(
      C.SERVER_CALL + `/products/removeproduct/${this.state.todelete}`
    );
    window.location.reload();
    this.setState({ deleteitem: !this.state.deleteitem });
  };

  toggleDeleteModal = () => {
    this.setState({ deleteitem: !this.state.deleteitem });
  };
  sourceImg = "https://ucliq.s3.ap-south-1.amazonaws.com/1596021387429.jpg";
  render() {
    return (
      <div>
        <NavSection />
        <div className="row">
          <div className="container">
            {this.state.product.map((i) => (
              <>
                <div className="each-product" style={{ overflow: "hidden" }}>
                  <div className="p-content col-10">
                    <div className="product-iamges-div">
                      <img
                        style={{ margin: "10px" }}
                        src={i.images[0].image}
                        alt="product-image"
                      />

                      <div
                        className="product_images"
                        style={{ display: "none" }}
                        id="product_images"
                      >
                        {i.images.map((image, index) => (
                          <div>
                            <p>
                              <b>{index + 1}.</b>
                              <img
                                src={image.image}
                                style={{
                                  marginTop: "10px",
                                  marginRight: "10px",
                                }}
                              />
                            </p>
                          </div>
                        ))}
                      </div>
                      <button
                        style={{ height: "40px", marginTop: "20px" }}
                        id="view_all"
                        onClick={this.increase}
                        className="btn btn-primary"
                      >
                        View All
                      </button>
                      <button
                        style={{
                          display: "none",
                          height: "40px",
                          marginTop: "20px",
                        }}
                        id="hide_all"
                        onClick={this.decrease}
                        className="btn btn-primary"
                      >
                        Close
                      </button>
                    </div>
                    <div className="p-title">{i.product_name}</div>
                    <div className="p-details">
                      <div className="col-2 pro-d">
                        <div className="pro-h">Price</div>
                        <div className="pro">&#8377; {i.price}</div>
                      </div>

                      <div className="col-2 pro-d">
                        <div className="pro-h">Min. Qty</div>
                        <div className="pro">{i.qty}</div>
                      </div>

                      <div className="col-4 pro-d">
                        <div className="pro-h">Category</div>
                        <div className="pro">{i.category}</div>
                      </div>

                      <div className="col-4 pro-d">
                        <div className="pro-h">Sub-Category</div>
                        <div className="pro">{i.subcategory}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-btn col-2">
                    <div className="p-res">
                      <Link
                        to={`/dashboard/sellercentral/updateproduct/${i._id}`}
                      >
                        <div
                          className="btn p-btn-e col-6"
                          style={{
                            textAlign: "center",
                            backgroundColor: "#ffc107",
                          }}
                        >
                          <img src={edit} className="pro-img" />
                        </div>
                      </Link>
                    </div>
                    <div className="p-res">
                      <div
                        className="btn p-btn-e col-6"
                        onClick={async () => {
                          await this.setState({ todelete: i._id });
                          this.toggleDeleteModal();
                        }}
                        style={{
                          textAlign: "center",
                          backgroundColor: "#8f9691",
                        }}
                      >
                        <img src={trash} className="pro-img" />
                      </div>
                    </div>
                  </div>

                  {this.state.deleteitem ? (
                    <Deletemodal
                      confirmDelete={this.confirmDeleteModal}
                      toggleDelete={this.toggleDeleteModal}
                    />
                  ) : null}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default userproduct;
