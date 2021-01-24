import React, { Component } from "react";
import NavSection from "../components/organisms/nav-section";
import "./profile.css";
import { Link } from "react-router-dom";
import leftarrow from "../assets/images/leftarrow.png";
import Test from "../components/molecules/profileModal/test";
import axios from "axios";
import { MdPermMedia } from "react-icons/md";
import "../components/organisms/userproduct/index.css";
import {
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import C from "../resource/values";
import { Spinner, Alert } from "reactstrap";

import "./BusinessProfile.css"

class UploadDocs extends Component {
  render() {
    return (
      <div>
        <div className="popup_del">
          <div className="popup_inner_del">
            <div className="del-header">
              <FormGroup className="fileContainer">
                <Label className="label">
                  Choose an Image
                  <MdPermMedia className="mx-2" />
                  <Input
                    type="file"
                    multiple
                    accept=".jpg, .jpeg, .png,"
                    onChange={this.props.upload}
                  />
                </Label>
              </FormGroup>
              <div onClick={this.props.close} style={{ cursor: "pointer" }}>
                {" "}
                X{" "}
              </div>
            </div>
            <div className="del-footer">
              <div>
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "4px" }}
                  onClick={this.props.submit}
                >
                  Upload Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Businessprofile extends Component {
  state = {
    name: "",
    phoneNo: "",
    gstin: "",
    address: "",
    pincode: "",
    _id: "",
    account: "",
    iifsc: "",
    bankname: "",
    isdocs: false,
    docsVerify: [],
    isPhoneVerified: null,
    isDocSubmitted: null,
    isDocVerified: null,
    isSetupRequired: null,
    loader: false,
    alertForDoc: false
  };

  documents = new FormData();

  componentDidMount = async () => {
    this.setState({ loader: true })
    let prevRoute = new URLSearchParams(this.props.location.search).get('route')
    let user = await axios.get(C.SERVER_CALL + "/auth/profile");
    this.setState({
      name: user.data.name,
      phoneNo: user.data.phoneNo,
      gstin: user.data.taxDetails,
      address: user.data.address,
      pincode: user.data.pinCode,
      _id: user.data._id,
      docsVerify: user.data.docInfo,
      isPhoneVerified: user.data.isPhoneVerified,
      isDocSubmitted: user.data.isDocSubmitted,
      isDocVerified: user.data.isDocVerified,
      isSetupRequired: user.data.isSetupRequired,
    });
    if (user.data.bankDetails) {
      this.setState({
        bankname: user.data.bankDetails.bankname,
        iifsc: user.data.bankDetails.iifsc,
        account: user.data.bankDetails.accountnumber,
      })
    }
    this.setState({ loader: false })
    if (prevRoute === "buynow") {
      this.setState({ alertForDoc: true })
      setTimeout(() => {
        this.setState({ alertForDoc: false })
      }, 2000);
    }
  };
  closemodal = () => {
    this.setState({ isdocs: false });
  };

  onupload = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      this.documents.append("doc", e.target.files[i], e.target.files[i].name);
    }
  };

  onuploadsubmit = async () => {
    this.setState({ isdocs: false });
    let d = await axios.post(
      C.SERVER_CALL + "/upload/userdocs/",
      this.documents
    );
  };

  getUpdatedDetails = async (value, type) => {
    if (type === "name") {
      this.setState({ name: value.name });
      await axios.post(C.SERVER_CALL + "/auth/updatedetails", { name: value });
    } else if (type === "gstin") {
      this.setState({ gstin: value });
      await axios.post(C.SERVER_CALL + "/auth/updatedetails", {
        gstin: value,
        type: type,
      });
    } else if (type === "bankdetails") {
      this.setState({ bankname: value.bankname });
      this.setState({ iifsc: value.iifsc });
      this.setState({ account: value.accountnumber });
      const bankDetails = {
        bankname: value.bankname,
        iifsc: value.iifsc,
        accountnumber: value.accountnumber,
      };
      await axios.post(C.SERVER_CALL + "/auth/updatedetails", {
        bankDetails: bankDetails,
        type: type,
      });
    } else {
      this.setState({ pincode: value });
      await axios.post(C.SERVER_CALL + "/auth/updatedetails", {
        pinCode: value,
      });
    }
  };

  getDocStatus() {
    if (!this.state.isDocSubmitted) {
      return (
        <p className="p-p" style={{ color: "red" }}>
          <FontAwesomeIcon icon={faTimesCircle} />
          &nbsp;Not Submitted
        </p>
      );
    } else if (this.state.isDocSubmitted && this.state.isDocVerified) {
      return (
        <p className="p-p" style={{ color: "green" }}>
          &nbsp;Verified
        </p>
      );
    } else {
      return (
        <p className="p-p" style={{ color: "yellow" }}>
          &nbsp;Reviewing
        </p>
      );
    }
  }

  render() {
    return (
      <div>
        <NavSection />
        {
          this.state.loader
            ?
            <Spinner
              color="dark"
              style={{
                width: 75,
                height: 75,
                margin: "30vh auto",
                position: "absolute",
                left: "50%"
              }}
            />
            :
            <>
              <div className="li-p bread-p">
                <div>
                  <Link to={"/dashboard"}>
                    <img src={leftarrow} alt="" style={{ width: "30px" }} />
                  </Link>
                </div>
                <div>
                  <Link to={"/dashboard"}>&nbsp;&nbsp;Dashboard </Link>&nbsp;/ Profile
          </div>
              </div>
              <div className="div-p">
                <ul className="ul-p">
                  <li className="li-p">
                    <div className="inner-div-p">
                      <div style={{ display: "flex" }}>
                        <div className="col-md-3">
                          <h2 className="h2-p">Tax Details</h2>
                        </div>
                        <div className="col-md-6">
                          <p className="p-p">{this.state.gstin}</p>
                        </div>
                      </div>
                      <div>
                        <Test
                          func={this.getUpdatedDetails}
                          detailsType="GST Number"
                          type="EDIT"
                          oldDet={this.state.gstin}
                        />
                      </div>
                    </div>
                  </li>
                  <li className="li-p">
                    <div className="inner-div-p">
                      <div style={{ display: "flex" }}>
                        <div className="col-md-3">
                          <h2 className="h2-p">Bank Details</h2>
                        </div>
                        <div className="col-md-6">
                          <h3 className="h3-p">Bank Name :</h3>
                          <p className="p-p">{this.state.bankname}</p>
                          <h3 className="h3-p">Account Number :</h3>
                          <p className="p-p">{this.state.account}</p>
                          <h3 className="h3-p">IIFSC Code :</h3>
                          <p className="p-p">{this.state.iifsc}</p>
                        </div>
                      </div>
                      <div>
                        <Test
                          func={this.getUpdatedDetails}
                          detailsType="BankDetails"
                          type="EDIT"
                          oldDet={{
                            bankname: this.state.bankname,
                            account: this.state.account,
                            iifsc: this.state.iifsc,
                          }}
                        />
                      </div>
                    </div>
                  </li>
                  <li className="li-p">
                    <div className="inner-div-p">
                      <div style={{ display: "flex" }}>
                        <div className="col-md-3">
                          <h2 className="h2-p">Documents Status</h2>
                        </div>
                        <div className="col-md-6">
                          {this.getDocStatus.bind(this)()}
                        </div>
                      </div>
                      <div>
                        <Link
                          to={{
                            pathname: "/dashboard/profile/uploaddocs",
                            state: { docsVerify: this.state.docsVerify },
                          }}
                        >
                          <button
                            type="button"
                            className="btn btn-warning"
                            style={{ float: " right" }}
                          >
                            Upload
                    </button>
                        </Link>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </>
        }

        {
          this.state.alertForDoc
            ?
            <div className="alertForDocs">
              <Alert color="danger">
                Update your profile by submitting your <span style={{ color: "red" }}>DOCUMENTS</span>.
              </Alert>
            </div>
            :
            <></>
        }

        {this.state.isdocs ? (
          <UploadDocs
            close={this.closemodal}
            upload={this.onupload}
            submit={this.onuploadsubmit}
          />
        ) : (
            <></>
          )}
      </div>
    );
  }
}

export default Businessprofile;
