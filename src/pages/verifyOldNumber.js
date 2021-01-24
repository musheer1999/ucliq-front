import React, { Component } from "react";
import NavSection from "../components/organisms/nav-section";
import "./loginStyle.css";
import {
  Container,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Button,
} from "reactstrap";
import "./loginStyle.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { changePhoneNumber } from "../actions/authActions";
import classnames from "classnames"

class verifyOldNumber extends Component {

  constructor() {
    super();
    this.state = {
      phoneNo: "",
      errors: {},
    };
    this.handleOTPRequest = this.handleOTPRequest.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleOTPRequest(e) {
    e.preventDefault();

    const Number = {
      phoneNo: this.state.phoneNo,
    };


    this.props.changePhoneNumber(Number, this.props.history);


  }


  componentWillReceiveProps(nextProps) {
    // if (nextProps.auth.isAuthenticated) {
    //   this.props.history.push("/dashboard");
    // }
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
          <div className="form">
            <h2>Change Phone Number</h2>
            <div>
              <InputGroup size="sm" className="input-grp">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Old Phone no. &nbsp; </InputGroupText>
                </InputGroupAddon>
                <Input
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.phoneNo,
                  })}
                  type="text"
                  name="phoneNo"
                  value={this.state.phoneNo}
                  placeholder="example: 9876543210"
                  onChange={this.onChange}
                />
                {errors.phoneNo && (
                  <div className="invalid-feedback">{errors.phoneNo}</div>
                )}
              </InputGroup>
              <br />
              <Button color="primary" onClick={this.handleOTPRequest}>
                Get OTP
              </Button>
            </div>
          </div>
        </Container>

      </div>
    );
  }
}

verifyOldNumber.propTypes = {
  changePhoneNumber: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});


export default connect(mapStateToProps, { changePhoneNumber })(withRouter(verifyOldNumber));
