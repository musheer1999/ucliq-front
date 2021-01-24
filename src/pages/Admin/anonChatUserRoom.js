import React, { Component } from "react";
import { Col, Form, FormGroup, Input, Button } from "reactstrap";
import socketIOClient from "socket.io-client";
import C from "../../resource/values";
import { BsFillChatSquareFill } from "react-icons/bs";

export default class anonChatUserRoom extends Component {
  constructor() {
    super();
    this.state = {
      chat: [],
    };
    this.socket = socketIOClient(C.SOCKET_CALL + "/anon");
  }

  componentDidMount = () => {
    this.socket.on("connect", () => {
      this.socket.emit("enterroom", {
        phoneNo: this.props.match.params.phoneNo,
      });
      this.socket.on("getchat", (res) => {
        this.setState({ chat: res });
      });
    });
  };

  UNSAFE_componentWillMount = () => {
    this.socket.on("getmsgadmin", (res) => {
      this.setState({ chat: res });
    });
  };

  sendmsg = (event) => {
    event.preventDefault();
    this.socket.emit("sendmsgadmin", {
      msg: this.state.msg,
      phoneNo: this.props.match.params.phoneNo,
    });
    this.socket.on("getmsgadmin", (res) => {
      this.setState({ chat: res });
    });
    event.target.reset();
  };

  onchangemsg = (event) => {
    this.setState({ msg: event.target.value });
  };

  render() {
    return (
      <div className="container shadow p-3 mb-5 bg-white rounded my-3">
        <div className="container chat-ui-div">
          <div className="chat-header">
            <p
              style={{
                fontSize: "20px",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              <BsFillChatSquareFill />
              <b>UCLIQ CHAT</b>
            </p>
          </div>
          <div className="chat-messages">
            {this.state.chat.map((c) =>
              c.type === "admin" ? (
                <div className="chat-received-msg" style={{ padding: "5px" }}>
                  <img
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                    }}
                    src="https://previews.123rf.com/images/kahovsky/kahovsky1711/kahovsky171100063/89471041-cute-smiling-chat-bot-working-in-headphones-with-mic-behind-laptop-vector-flat-modern-line-style-car.jpg"
                  />
                  <div className="chat-content">
                    <p>
                      <b>ADMIN</b>
                    </p>
                    <p>{c.msg}</p>
                  </div>
                </div>
              ) : (
                  <div className="chat-sent-msg" style={{ padding: "5px" }}>
                    <img
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                      }}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"
                    />
                    <div className="chat-content-sent">
                      <p>
                        <b>{c.type}</b>
                      </p>
                      <p>{c.msg}</p>
                    </div>
                  </div>
                )
            )}
          </div>

          <hr />
          <div className="chat-entermessage">
            <Form onSubmit={this.sendmsg} className="chat-message">
              <FormGroup row>
                <Col>
                  <Input
                    type="textarea"
                    name="msg"
                    id="msg"
                    placeholder="Enter query"
                    onChange={this.onchangemsg}
                  />
                </Col>
              </FormGroup>
              <Button className="btn btn-success chat-send">SEND</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
