import React, { Component } from "react";
import { Container } from "reactstrap";
import NavSection from "../components/organisms/nav-section";
import footer from "../components/organisms/footer/footer";
import "./cancelOrder.css";
import axios from "axios";
import C from "../resource/values";

class Deletemodal extends Component {
  render() {
    return (
      <div>
        <div className="popup_del">
          <div className="popup_inner_del">
            <div className="del-header">Cancel Order</div>
            <div className="del-content">Are you sure, You want to cancel order?</div>
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

class cancelOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: '',
      option: '',
      isOther: false,
      deleteitem: false,
    }
  }
  handlechange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
      isOther: false
    })
    if (e.target.value === 'others') {
      this.setState({
        isOther: true
      })
    }
  }

  componentDidMount = async () => {
    let p = await axios.get(
      C.SERVER_CALL + `/seller/view/${this.props.match.params.id}`
    );
    this.setState({ item: p.data });

  };
  confirmDeleteModal = async () => {
    let st = "Order Cancelled";

    let setStatus = await axios.post(C.SERVER_CALL + `/seller/seller/status/${this.state.todelete}`, {
      status: st
    })


    this.props.history.push('/dashboard/yourOrders');
    this.setState({ deleteitem: !this.state.deleteitem });
  };


  toggleDeleteModal = () => {
    this.setState({ deleteitem: !this.state.deleteitem });
  };



  render() {
    return (
      <div>
        <NavSection />
        <Container className="cancel-container">
          <h1 className='cancel-h1'>ORDER CANCELLATION</h1>
          <hr />
          <h5 className='cancel-h5'>ORDER STATUS: NOT YET DISPATCHED</h5>
          <h4>ORDER DETAILS</h4>
          <div style={{ display: "flex", flexWrap: "wrap", flexDirection: 'row', justifyContent: 'space-between' }}>
            <div>
              <div className="buyerorders-div">
                <img
                alt=''
                  src={this.state.item.productImg}
                  className="buyer-image"
                />
                <div>
                  <p className="buyerorder-productname">
                    {/* <h3></h3> */}
                    <b>{this.state.item.productName}</b>
                  </p>
                  <p className="buyerorder-sold">
                    <b>Sold By:{this.state.item.sellerName}</b>
                  </p>
                  <div className="buyerorder-basicdetials">
                    <p>
                      <b>Price:{this.state.item.totalPrice}</b>
                    </p>
                    <p>
                      <b>Qty:{this.state.item.quantity}</b>
                    </p>
                    <p>
                      <b>Mode of Payment:{this.state.item.modeOfPayment}</b>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h5>
                  Reason for Cancellation:<span style={{ color: "red" }}>*</span>
                </h5>
                <select
                  onChange={this.handlechange}
                  className="cancellation-select"
                  required
                >
                  <option className="replacement-option">
                    SELECT CANCELLATION REASON
              </option>
                  <option className="cancellation-option">LOREM IPSUM</option>
                  <option className="cancellation-option">LOREM IPSUM</option>
                  <option className="cancellation-option">LOREM IPSUM</option>
                  <option className="cancellation-option">LOREM IPSUM</option>
                  <option className="cancellation-option">LOREM IPSUM</option>
                  <option className="cancellation-option">LOREM IPSUM</option>
                  <option className="cancellation-option">LOREM IPSUM</option>
                  <option className="cancellation-option">LOREM IPSUM</option>
                  <option className="cancellation-option">LOREM IPSUM</option>
                  <option value="others" className="cancellation-option">
                    OTHER
              </option>
                </select>
                <br />
                {this.state.isOther ? (
                  <input
                    placeholder="please state the reason here..."
                    className="reason-input-div"
                    required
                  />
                ) : null}
              </div>
            </div>
            <div style={{ padding: "1em" }} className="cancel-confirm">


              <div className="p-btn col-2">
                <div className="p-res">
                  <div
                    className="btn p-btn-e col-6"
                    onClick={async () => {
                      await this.setState({ todelete: this.state.item._id });
                      this.toggleDeleteModal();
                    }}
                  >
                    <button className="btn btn-danger mx-3 cancel-yes">Cancel Order</button>
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
          </div>

        </Container>
        {footer()}
      </div>
    );
  }
}

export default cancelOrder;
