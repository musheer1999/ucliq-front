import React, { Component } from "react";
import "./documents.css";
import axios from "axios";
import {
  faFilePdf,
  faImage,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaSearchPlus } from 'react-icons/fa';
import { FaSearchMinus } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Spinner } from 'reactstrap'
import api from "../../resource/values"

class DisplayImg extends Component {
  state = {
    indx: 1,
  };

  zoomin = () => {
    var myImg = document.getElementById("map");
    var currWidth = myImg.clientWidth;
    if (currWidth === 2500) return false;
    else {
      myImg.style.width = currWidth + 20 + "px";
    }
  };

  zoomout = () => {
    var myImg = document.getElementById("map");
    var currWidth = myImg.clientWidth;
    if (currWidth === 100) return false;
    else {
      myImg.style.width = currWidth - 20 + "px";
    }
  };

  render() {
    return (
      <div>
        <div className="popup_del">
          <div
            className="popup_inner_del"
            style={{
              width: "500px",
              height: "500px",
              maxWidth: "500px",
              maxHeight: "auto",
            }}
          >
            <div
              className="del-header"
              style={{ overflow: "scroll", height: "95%" }}
            >
              <div className="main dragscroll">
                <img
                alt=''
                  id="map"
                  src={this.props.link}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
            <div className="del-footer">
              <div style={{ display: "flex", paddingRight: "35%" }}>
                <div type="button" onClick={this.zoomout}>
                  <FaSearchMinus className='modal-upload-check mx-3' />
                </div>
                <div type="button" onClick={this.zoomin}>
                  <FaSearchPlus className='modal-upload-check mx-3 icon-flipped' />
                </div>
              </div>
              <div>
                <AiFillCloseCircle className='documents-close' onClick={this.props.close} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class DisplayPdf extends Component {
  render() {
    return (
      <div>
        <div className="popup_del">
          <div
            className="popup_inner_del"
            style={{
              width: "500px",
              height: "500px",
              maxWidth: "500px",
              maxHeight: "auto",
            }}
          >
            <div
              className="del-header"
              style={{ overflow: "auto", height: "95%" }}
            >
              <iframe
              title=''
                src={`https://docs.google.com/gview?url=${this.props.link}&embedded=true`}
                style={{ width: "100%", height: "100%" }}
                frameBorder="0"
              ></iframe>
            </div>
            <div className="del-footer">
              <div>
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "4px" }}
                  onClick={this.props.close}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class verifyDoc extends Component {
  constructor() {
    super();
    this.state = {
      docs: [],
      displayI: false,
      displayP: false,
      link: "",
      loader: false
    };
  }

  componentDidMount = async () => {
    let user = await axios.get(
      api.SERVER_CALL + `/admin/view/${this.props.match.params.id}`
    );
    user = user.data;
    let docs = []
    if (user.docs['anyoth']['submitted']) {
      docs.push({
        url: user.docs['anyoth']['doc'],
        isVerify: (user.docs['anyoth']['status'] === "verified"),
        type: 'anyoth'
      })
    }
    if (user.docs['fssai']['submitted']) {
      docs.push({
        url: user.docs['fssai']['doc'],
        isVerify: (user.docs['fssai']['status'] === "verified"),
        type: 'fssai'
      })
    }
    if (user.docs['gstin']['submitted']) {
      docs.push({
        url: user.docs['gstin']['doc'],
        isVerify: (user.docs['gstin']['status'] === "verified"),
        type: 'gstin'
      })
    }
    if (user.docs['shopLic']['submitted']) {
      docs.push({
        url: user.docs['shopLic']['doc'],
        isVerify: (user.docs['shopLic']['status'] === "verified"),
        type: 'shopLic'
      })
    }
    if (user.docs['mcdcerti']['submitted']) {
      docs.push({
        url: user.docs['mcdcerti']['doc'],
        isVerify: (user.docs['mcdcerti']['status'] === "verified"),
        type: 'mcdcerti'
      })
    }
    this.setState({ docs: docs });
  };

  isImg = (doc) => {
    if (
      doc.split(".").pop() === "png" ||
      doc.split(".").pop() === "jpeg" ||
      doc.split(".").pop() === "jpg"
    )
      return true;
    return false;
  };

  showDoc = (link) => {
    this.setState({ link: link });
    if (this.isImg(link)) {
      this.setState({ displayI: !this.state.displayI });
    } else {
      this.setState({ displayP: !this.state.displayP });
    }
  };

  closeImgViewer = () => {
    this.setState({ displayI: !this.state.displayI });
  };

  closePdfViewer = () => {
    this.setState({ displayP: !this.state.displayP });
  };

  verifyDoc = async (link, type) => {
    this.setState({ loader: true });
    let d = this.state.docs
    d.map(i => {
      if (i.url === link) {
        i.isVerify = true
      }
    })
    let res = await axios.post(api.SERVER_CALL + `/admin/verify/${this.props.match.params.id}`, {
      doc: type
    })
    if (res) {
      this.setState({ loader: false })
      this.setState({ docs: d })
    }
  }

  unVerifyDoc = async (link, type) => {
    this.setState({ loader: true });
    let d = this.state.docs
    d.map(i => {
      if (i.url === link) {
        i.isVerify = false
      }
    })
    let res = await axios.post(api.SERVER_CALL + `/admin/rmverify/${this.props.match.params.id}`, {
      doc: type
    })
    if (res) {
      this.setState({ loader: false })
      this.setState({ docs: d })
    }
  }

  render() {
    return (
      <>
        {
          this.state.loader
            ?
            <>
              <div className="loader-sell">
                <Spinner className='loader' animation="border" role="status" variant="light" />
                <div className='loader-content'>
                  Updating....
              </div>
              </div>
            </>
            :
            null
        }
        <div className="doc-verify-admin">
          {this.state.displayI ? (
            <DisplayImg close={this.closeImgViewer} link={this.state.link} />
          ) : (
              <></>
            )}
          {this.state.displayP ? (
            <DisplayPdf close={this.closePdfViewer} link={this.state.link} />
          ) : (
              <></>
            )}
          <div style={{ overflowX: 'auto' }}>
            <table className='documents-table'>
              <tr>
                <th className='documents-table-th'>SNo.</th>
                <th className='documents-table-th'>Files ( Click files to open )</th>
                <th className='documents-table-th'>Status</th>
              </tr>
              {this.state.docs.map((d, index) => (
                <>
                  {this.isImg(d.url) ? (
                    <>
                      <tr className='documents-table-tr'>
                        <th className='documents-table-th' scope="row">{index + 1}</th>
                        <td className='documents-table-td'>
                          <div
                            className="document-name"
                            onClick={() => {
                              this.showDoc(d.url);
                            }}
                          >
                            <FontAwesomeIcon
                              className="upload-check"
                              icon={faImage}
                            />
                            {d.url.split("/").pop()}
                          </div>
                        </td>

                        {
                          d.isVerify === false
                            ?
                            <td className='documents-table-td' >
                              <button className="btn btn-warning" onClick={() => (this.verifyDoc(d.url, d.type))}>verify</button>
                            </td>
                            :
                            <td className='documents-table-td' >
                              <button className="btn btn-success secondaryBtn">verified</button>
                              <br />
                              <button className="btn btn-danger secondaryBtn" onClick={() => (this.unVerifyDoc(d.url, d.type))}>remove Verification</button>
                            </td>
                        }

                      </tr>
                    </>
                  ) : (
                      <>
                        <tr className='documents-table-tr'>
                          <th className='documents-table-th' scope="row">{index + 1}</th>
                          <td className='documents-table-td'>
                            <div
                              className="document-name"
                              onClick={() => {
                                this.showDoc(d.url);
                              }}
                            >
                              <FontAwesomeIcon
                                className="upload-check"
                                icon={faFilePdf}
                              />
                              {d.url.split("/").pop()}
                            </div>
                          </td>
                          {
                            d.isVerify === false
                              ?
                              <td className='documents-table-td' >
                                <button className="btn btn-warning" onClick={() => (this.verifyDoc(d.url, d.type))}>verify</button>
                              </td>
                              :
                              <td className='documents-table-td' >
                                <button className="btn btn-success secondaryBtn">verified</button>
                                <br />
                                <button className="btn btn-danger secondaryBtn" onClick={() => (this.unVerifyDoc(d.url, d.type))}>remove Verification</button>
                              </td>
                          }
                        </tr>
                      </>
                    )}
                </>
              ))}
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default verifyDoc;
