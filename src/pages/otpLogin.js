import React, { Component } from "react";
import {
  Container,
  Button,
} from "reactstrap";
import NavSection from "../components/organisms/nav-section";
import "./loginStyle.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userOtp } from "../actions/authActions";
import OtpInput from "react-otp-input";
import "./otpLogin.css";
class OtpLogin extends Component {
  constructor() {
    super();
    this.state = {
      OTP: "",
      errors: {},
    };
    this.handleOTPSubmit = this.handleOTPSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
console.log("cdm")
    console.log(this.props)
    if (this.props.auth.isAuthenticated) {
      console.log("0")
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("cwrp")
    console.log(nextProps)
    if (nextProps.auth.isSetupRequired && nextProps.auth.isAuthenticated) {
      console.log("1")
      this.props.history.push("/setup");
    } else if (nextProps.auth.isAuthenticated) {
      console.log("2")
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      console.log("3")
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ "OTP": e });
  }

  handleOTPSubmit(e) {
    e.preventDefault();
    const userData = {
      phoneNo: this.props.auth.phoneNo,
      OTP: this.state.OTP,
    };                           
    this.props.userOtp(userData, this.props.history);
  }

  render() {
    // const { errors } = this.state;
    return (
      <div>
        <NavSection />
        <Container>
          <div style={{ height: "auto" }} className="form">
            <div className="back">
              <Link onClick={() => this.props.history.goBack()}>
                <FaArrowLeft />
              </Link>
            </div>
            <h2
              style={{
                fontWeight: "600",
                fontFamily: "Proxima Nova Th",
                padding: "0.5em",
                marginTop: '-40px'
              }}
            >
              LOGIN TO UCLIQ
            </h2>
            <div>
              <br />
              <div
                className="otp-input"
                style={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  padding: "0.5em",
                  width: '23vw',
                }}
              >
                <OtpInput
                  inputStyle={{
                    width: "2rem",
                    height: "2rem",
                    margin: "10px 0.3rem",
                    fontSize: "2rem",
                    border: "none",
                    borderBottom: "1px solid black",
                    position: 'relative',
                    left: '100%'
                  }}
                  name="OTP"
                  className="otp-input"
                  value={this.state.OTP}
                  onChange={this.onChange}
                  numInputs={6}
                />
              </div>
              <br />
              <div
                style={{
                  color: "red",
                  fontSize: "15px",
                  marginLeft: "5px",
                  marginTop: "-15px",
                }}
              >
                Enter One Time Password
              </div>
              <Button
                style={{
                  backgroundColor: "yellow",
                  color: "black",
                  fontWeight: "600",
                  border: "none",
                  fontSize: "18px",
                  width: "200px",
                  borderRadius: "10px",
                  position: "relative",
                  left: "15%",
                  padding: "0.8em",
                  marginTop: "25px",
                  fontFamily: "Proxima Nova Rg",
                }}
                onClick={this.handleOTPSubmit}
              >
                VERIFY OTP
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

OtpLogin.propTypes = {
  userOtp: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { userOtp })(withRouter(OtpLogin));
