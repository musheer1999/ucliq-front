import React, { Component } from "react";
import NavSection from "../components/organisms/nav-section";
import {
  Container,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Button,
  Form,
  FormGroup,
  Col,
} from "reactstrap";
import C from "../resource/values";
import socketIOClient from "socket.io-client";
import "./chat.css";
import store from "../store";
export default class Support extends Component {
  constructor(props) {
    super(props);
    this.messagesEndRef = React.createRef();

    this.state = {
      name: "",
      phoneNo: "",
      chat: [],
      isInfoSubmitted: false,
      msg: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.socket = socketIOClient(C.SOCKET_CALL + "/anon");
  }

  componentDidMount() {
    if (
      store.getState().anon.name !== "" &&
      store.getState().anon.phoneNo !== ""
    ) {
      let { name, phoneNo } = store.getState().anon;
      this.setState({
        isInfoSubmitted: true,
      });
      this.socket.on("connect", () => {
        this.socket.emit("enableroom", {
          phoneNo,
          name,
        });
        this.socket.on("initialDet", (res) => {
          this.setState({ chat: res });
        });
      }); // connection closes
    } else {
      this.setState({
        isInfoSubmitted: false,
      });
    }
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  scrollToBottom() {
    this.messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  }
  sendmsg = (event) => {
    event.preventDefault();
    let { phoneNo } = store.getState().anon;

    this.socket.emit("sendmsg", {
      msg: this.state.msg,
      phoneNo,
    });
    this.socket.on("getmsg", (res) => {
      this.setState({ chat: res });
    });
    this.scrollToBottom();
    event.target.reset();
  };
  handleSubmit() {
    this.setState({
      isInfoSubmitted: true,
    });
    store.dispatch({
      type: "SET_ANON_NAME",
      payload: this.state.name,
    });
    store.dispatch({
      type: "SET_ANON_PHONE",
      payload: this.state.phoneNo,
    });
    let { name, phoneNo } = store.getState().anon;

    this.socket.on("connect", () => {
      this.socket.emit("enableroom", {
        phoneNo,
        name,
      });
      this.socket.on("initialDet", (res) => {
        this.setState({ chat: res });
      });
    }); // connection closes
  }
  render() {
    return (
      <>
        <NavSection />
        <Container>
          <h3>Get help directly from our executives.</h3>
          <hr />
          {!this.state.isInfoSubmitted && (
            <>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Name:</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Your Name"
                  name="name"
                  onChange={this.handleInputChange}
                />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Phone: </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Your Phone number"
                  name="phoneNo"
                  onChange={this.handleInputChange}
                />
              </InputGroup>
              <br />
              <Button onClick={this.handleSubmit}>Submit</Button>
            </>
          )}
          {this.state.isInfoSubmitted && (
            <>
              <div className="chat-messages">
                {this.state.chat.map((c) =>
                  c.type === "admin" ? (
                    <div
                      className="chat-received-msg"
                      style={{ padding: "5px" }}
                    >
                      <img
                        style={{
                          width: "45px",
                          height: "45px",
                          borderRadius: "50%",
                        }}
                        alt=""
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
                          alt=""
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

              <Form onSubmit={this.sendmsg} className="chat-entermessage">
                <FormGroup className="chat-message">
                  <Col>
                    <Input
                      type="textarea"
                      name="msg"
                      id="msg"
                      placeholder="Enter query..."
                      onChange={this.handleInputChange}
                      onKeyDown={this.onKeyDown}
                    />
                  </Col>
                </FormGroup>
                <FormGroup className="chat-message">
                  <Button className="btn btn-success chat-send">SEND</Button>
                </FormGroup>
              </Form>
            </>
          )}
        </Container>
      </>
    );
  }
}
