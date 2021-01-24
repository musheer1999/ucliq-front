import React, { Component } from "react";
import NavSection from "../components/organisms/nav-section";
import { FormGroup, Label, Input, Button } from "reactstrap";
import { MdPermMedia } from "react-icons/md";
import axios from "axios";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./uploadDocs.css";
import C from "../resource/values"
export default class uploadDocs extends Component {
  constructor() {
    super();
    this.state = {
      gstin: false,
      shopLic: false,
      fssai: false,
      mcdcerti: false,
      anyoth: false,
    };
  }

  docs = new FormData();

  componentDidMount = () => {
    let d = this.props.location.state.docsVerify
    this.setState({
      gstin: d.gstin.submitted,
      shopLic: d.shopLic.submitted,
      fssai: d.fssai.submitted,
      mcdcerti: d.mcdcerti.submitted,
      anyoth: d.anyoth.submitted,
    })
  }

  validateFile = (f) => {
    if (f) {
      let size = f.size / 1000
      if (size <= 500 && size >= 20) return true
    }
    return false
  }

  onUpload = (e) => {
    if (e.target.id === "gstin") {
      if (!this.validateFile(e.target.files[0])) {
        alert("*File Size should be between 20KB and 500KB")
        return
      }
      this.docs.append("gstin", e.target.files[0], e.target.files[0].name);
      this.setState({
        gstin: true,
      });

    } else if (e.target.id === "shopLic") {
      if (!this.validateFile(e.target.files[0])) {
        alert("*File Size should be between 20KB and 500KB")
        return
      }
      this.docs.append("shopLic", e.target.files[0], e.target.files[0].name);
      this.setState({
        shopLic: true,
      });
    } else if (e.target.id === "fssai") {
      if (!this.validateFile(e.target.files[0])) {
        alert("*File Size should be between 20KB and 500KB")
        return
      }
      this.docs.append("fssai", e.target.files[0], e.target.files[0].name);
      this.setState({
        fssai: true,
      });
    } else if (e.target.id === "mcdcerti") {
      if (!this.validateFile(e.target.files[0])) {
        alert("*File Size should be between 20KB and 500KB")
        return
      }
      this.docs.append("mcdcerti", e.target.files[0], e.target.files[0].name);
      this.setState({
        mcdcerti: true,
      });
    } else if (e.target.id === "anyoth") {
      if (!this.validateFile(e.target.files[0])) {
        alert("*File Size should be between 20KB and 500KB")
        return
      }
      this.docs.append("anyoth", e.target.files[0], e.target.files[0].name);
      this.setState({
        anyoth: true,
      });
    }
  };

  submit = async () => {
    let res = await axios.post(C.SERVER_CALL + '/upload/documents/',
      this.docs
    );
    if (res) {
      this.props.history.push("/dashboard/businessprofile")
    }
  };

  render() {
    return (
      <div>
        <NavSection />
        <div style={{ textAlign: "center" }}>
          *File Size should be between 20KB and 500KB
        </div>
        <div className="uploaddocs-div">
          <FormGroup className="fileContainer">
            GSTIN
            <div>
              <Label className="label">
                upload
                <MdPermMedia className="text-center mx-2" />
                <Input
                  id="gstin"
                  type="file"
                  single
                  accept=".jpg, .jpeg, .png, .pdf"
                  onChange={this.onUpload}
                // disabled={this.state.gstin === true}
                />
              </Label>
            </div>
            <div>
              {this.state.gstin ?
                <FontAwesomeIcon className='uploaddocs-check' icon={faCheckCircle} />
                :
                <></>
              }
            </div>
          </FormGroup>
          <FormGroup className="fileContainer">
            Shop license
            <Label className="label">
              upload
              <MdPermMedia className="mx-2" />
              <Input
                id="shopLic"
                type="file"
                single
                accept=".jpg, .jpeg, .png, .pdf"
                onChange={this.onUpload}
              // disabled={this.state.shopLic === true}
              />
            </Label>
            <div>
              {this.state.shopLic ?
                <FontAwesomeIcon className='uploaddocs-check' icon={faCheckCircle} />
                :
                <></>
              }
            </div>
          </FormGroup>
          <FormGroup className="fileContainer">
            FSSAI certificate
            <Label className="label">
              upload
              <MdPermMedia className="mx-2" />
              <Input
                id="fssai"
                type="file"
                single
                accept=".jpg, .jpeg, .png, .pdf"
                onChange={this.onUpload}
              // disabled={this.state.fssai === true}
              />
            </Label>
            <div>
              {this.state.fssai ?
                <FontAwesomeIcon className='uploaddocs-check' icon={faCheckCircle} />
                :
                <></>
              }
            </div>
          </FormGroup>
          <FormGroup className="fileContainer">
            MCD shop certificate
            <Label className="label">
              upload
              <MdPermMedia className="mx-2" />
              <Input
                id="mcdcerti"
                type="file"
                single
                accept=".jpg, .jpeg, .png, .pdf"
                onChange={this.onUpload}
              // disabled={this.state.mcdcerti === true}
              />
            </Label>
            <div>
              {this.state.mcdcerti ?
                <FontAwesomeIcon className='uploaddocs-check' icon={faCheckCircle} />
                :
                <></>
              }
            </div>
          </FormGroup>
          <FormGroup className="fileContainer">
            Any other business certificate
            <Label className="label">
              upload
              <MdPermMedia className="mx-2" />
              <Input
                id="anyoth"
                type="file"
                single
                accept=".jpg, .jpeg, .png, .pdf"
                onChange={this.onUpload}
              // disabled={this.state.anyoth === true}
              />
            </Label>
            <div>
              {this.state.anyoth ?
                <FontAwesomeIcon className='uploaddocs-check' icon={faCheckCircle} />
                :
                <></>
              }
            </div>
          </FormGroup>
          <Button onClick={this.submit}>Submit</Button>
        </div>
      </div>
    );
  }
}
