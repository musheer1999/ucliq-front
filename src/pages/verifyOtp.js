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
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { verifyOTP } from "../actions/authActions";
import classnames from "classnames";

class verifyOtp extends Component {
  constructor() {
    super();
    this.state = {
      OTP: "",
      errors: "",
    };
    this.handleOTPSubmit = this.handleOTPSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleOTPSubmit(e) {
    e.preventDefault();
    const userData = {
      OTP: this.state.OTP,
    };
    this.props.verifyOTP(userData, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <NavSection />
        <Container>
          <div className="form">
            <h2>Change Phone Number</h2>
            <div>
              <InputGroup size="sm" className="input-grp">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>OTP: &nbsp; </InputGroupText>
                </InputGroupAddon>
                <Input
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors
                  })}
                  placeholder="xxxxxx"
                  type="text"
                  name="OTP"
                  value={this.state.OTP}
                  onChange={this.onChange}
                />
                {errors && (
                  <div className="invalid-feedback">{errors}</div>
                )}
              </InputGroup>
              <br />
              <Button color="primary" onClick={this.handleOTPSubmit}>
                Verify
              </Button>

            </div>
          </div>
        </Container>
      </div>
    );
  }
}

verifyOtp.propTypes = {
  verifyOTP: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});


export default connect(mapStateToProps, { verifyOTP })(withRouter(verifyOtp));
