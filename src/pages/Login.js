import React, { Component } from "react";
import {
  Container,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Button,
} from "reactstrap";
import NavSection from "../components/organisms/nav-section";
import "./loginStyle.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";
import { Spinner } from "reactstrap";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      phoneNo: "",
      errors: {},
      loader: false
    };
    this.handleOTPRequest = this.handleOTPRequest.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleOTPRequest(e) {
    e.preventDefault();
    this.setState({ loader: true })
    const newUser = {
      phoneNo: this.state.phoneNo,
    };
console.log("the history props"+this.props.history.push)
    this.props.loginUser(newUser, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <NavSection />
        <Container>
          {
            this.state.loader
              ?
              <Spinner
                color="dark"
                style={{
                  width: 50,
                  height: 50,
                  margin: "30vh auto",
                  justifySelf: "center",
                }}
              />
              :
              <div className="form">
                <div className="back">
                  <Link onClick={() => this.props.history.goBack()}>
                    <FaArrowLeft />
                  </Link>
                </div>
                <h2 style={{ fontWeight: "600", fontFamily: 'Proxima Nova Th', padding: '0.5em' }}>LOGIN TO UCLIQ</h2>
                <div>
                  <InputGroup size="sm" className="input-grp">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText
                        style={{
                          backgroundColor: "#ff0000",
                          color: "black",
                          fontWeight: "600",
                          width: "50px",
                          height: "40px",
                          borderTopLeftRadius: "20px",
                          borderBottomLeftRadius: "20px",
                        }}
                      >
                        +91&nbsp;{" "}
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.phoneNo,
                      })}
                      type="text"
                      name="phoneNo"
                      style={{ fontSize: "20px", fontWeight: '600', color: "black", height: '40px', width: '220px', borderTopRightRadius: "20px", borderBottomRightRadius: "20px" }}
                      value={this.state.phoneNo}
                      placeholder="xxxxxxxxxx"
                      onChange={this.onChange}
                    />
                    {/* <div style={{ color: "red", fontSize: "14px" }}>
                  Enter Your Phone Number
                 </div>   */}
                    {errors.phoneNo && (
                      <div className="invalid-feedback">{errors.phoneNo}</div>
                    )}
                  </InputGroup>
                  <br />
                  <div style={{ color: "red", fontSize: "12px", marginTop: "-35px", marginLeft: '10px' }}>
                    Enter Your Phone Number
                 </div>
                  <Button
                    style={{
                      backgroundColor: "yellow",
                      color: "black",
                      fontWeight: "600",
                      border: "none",
                      fontSize: "18px",
                      borderRadius: "10px",
                      position: "relative",
                      left: "17%",
                      padding: '0.5em',
                      marginTop: '25px',
                      fontFamily: 'Proxima Nova Th'
                    }}
                    onClick={this.handleOTPRequest}
                  >
                    Generate OTP
              </Button>
                </div>
              </div>
          }
        </Container>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
