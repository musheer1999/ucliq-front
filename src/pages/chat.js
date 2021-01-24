import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Col, Form, FormGroup, Input, Button } from "reactstrap";

import NavSection from "../components/organisms/nav-section/index";
import store from "../store";
import { BsFillChatSquareFill } from "react-icons/bs";
import "./chat.css";
import C from "../resource/values";

class chat extends Component {
  constructor() {
    super();
    this.messagesEndRef = React.createRef();
    this.state = {
      phoneNo: "",
      chat: [],
      msg: "",
    };
    this.socket = socketIOClient(C.SOCKET_CALL);
  }
  componentDidMount = () => {
    this.setState({
      phoneNo: store.getState().auth.user.phoneNo,
    });
    this.socket.on("connect", () => {
      this.socket.emit("enableroom", {
        phoneNo: store.getState().auth.user.phoneNo,
      });
      this.socket.on("initialDet", (res) => {
        this.setState({ chat: res });
      });
    });
    this.scrollToBottom();
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  UNSAFE_componentWillMount = () => {
    this.socket.on("getmsg", (res) => {
      this.setState({ chat: res });
    });
  };

  sendmsg = (event) => {
    event.preventDefault();
    this.socket.emit("sendmsg", { msg: this.state.msg });
    this.socket.on("getmsg", (res) => {
      this.setState({ chat: res });
    });
    event.target.reset();
  };

  onchangemsg = (event) => {
    this.setState({ msg: event.target.value });
  };

  onKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.socket.emit("sendmsg", { msg: this.state.msg });
      this.socket.on("getmsg", (res) => {
        this.setState({ chat: res });
      });
      event.target.value = "";
    }
  };
  render() {
    return (
      <div>
        <NavSection />
        <div className="container shadow p-3 mb-5 bg-white rounded my-3">
          <div className="container chat-ui-div">
            <div className="chat-header">
              <p
                style={{
                  fontSize: "15px",
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
              >
                <BsFillChatSquareFill />
                <b>UCLIQ CHAT SUPPORT</b>
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
                      <div style={{ float: "right", fontSize: "12px" }}>
                        <p style={{ marginTop: "10px" }}>
                          <b>{new Date(c.date).toLocaleDateString()}</b>
                        </p>
                        <br />
                        <p style={{ marginTop: "-10px" }}>
                          <b>{new Date(c.date).toLocaleTimeString()}</b>
                        </p>
                      </div>
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
                        <div style={{ float: "right", fontSize: "12px" }}>
                          <p style={{ marginTop: "10px" }}>
                            <b>{new Date(c.date).toLocaleDateString()}</b>
                          </p>
                          <br />
                          <p style={{ marginTop: "-10px" }}>
                            <b>{new Date(c.date).toLocaleTimeString()}</b>
                          </p>
                        </div>
                      </div>
                    </div>
                  )
              )}
              <div ref={this.messagesEndRef} />
            </div>

            <hr />
            <div>
              <Form onSubmit={this.sendmsg} className="chat-entermessage">
                <FormGroup className="chat-message">
                  <Col>
                    <Input
                      type="textarea"
                      name="msg"
                      id="msg"
                      placeholder="Enter query..."
                      onChange={this.onchangemsg}
                      onKeyDown={this.onKeyDown}
                    />
                  </Col>
                </FormGroup>
                <FormGroup className="chat-message">
                  <Button className="btn btn-success chat-send">SEND</Button>
                </FormGroup>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default chat;
