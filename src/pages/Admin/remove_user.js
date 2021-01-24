import React, {  Component } from "react";
import Sidebar from "./sideBar";
import {
  Button,
  Form,
  Input,
  CardTitle,
  CardImg,
  CardBody,
  Card,
  InputGroupAddon, InputGroupText,
} from "reactstrap";
import axios from "axios";
import './remove_user.css'
import C from '../../resource/values'

class Remove_user extends Component {
  constructor() {
    super();
    this.state = {
      isshowing: false,
      phonenumber: "",
      email: "",
      user_response: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      isshowing: true,
    });
  }
  handleClick(e) {
    e.preventDefault();
    const request =
      C.SERVER_CALL + "/admin/delete/" + this.state.phonenumber;
    let response = axios.delete(request);
    this.setState({
      user_response: response.data,
    });
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <div className="container  contain shadow p-3 mb-5 bg-white rounded ">
        <Sidebar />
        <h1 className="text-center my-4">Welcome to the Admin Panel</h1>
        <h3 className="h3 text-center">
          You can remove a user by entering following Details{" "}
        </h3>
        <Form onSubmit={this.handleSubmit}>
          <div className='userform'>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Phone No.+91</InputGroupText>
            </InputGroupAddon>

            <Input
              type="tel"
              name="phonenumber"
              id="exampleEmail"
              placeholder="Enter user PhoneNo."
              onChange={this.handleChange}
              required
              maxLength="10"
            />
          </div>

          <br />
          <Button className='btn btn-primary'>Fetch User</Button>
          <h3 className="text-center">User is: </h3>
          {this.state.isshowing ? (
            <div>
              <div className="container to_be_removed">
                <Card disabled={this.state.isshowing}>
                  <CardImg
                    top
                    width="100%"
                    src={this.state.user_img}
                    alt="User image"
                  />
                  <CardBody>
                    <CardTitle style={{ fontSize: '20px' }}>
                      <b>PhoneNumber:</b>
                      {this.state.phonenumber}
                    </CardTitle>

                    <Button color="danger" onClick={this.handleClick}>
                      Remove User
                    </Button>
                  </CardBody>
                </Card>
              </div>
            </div>
          ) : null}
        </Form>
      </div>
    );
  }
}

export default Remove_user;
