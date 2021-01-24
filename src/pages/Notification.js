import React, { Component } from "react";
import { Container } from "reactstrap";
import axios from "axios";
import NavSection from "../components/organisms/nav-section";
import footer from "../components/organisms/footer/footer";
import { AiOutlineClockCircle } from "react-icons/ai";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { FaBookReader } from "react-icons/fa";
import "./Notification.css";
import { Link } from "react-router-dom";
import C from "../resource/values";
import { times, takeRight } from "lodash";
class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: [],
    };
  }

  componentDidMount = async () => {
    let p = await axios.get(C.SERVER_CALL + "/notif/getAllNotification");
    this.setState({ notification: p.data });
  };

  hasread = async (id) => {
    await axios.post(C.SERVER_CALL + '/notif/onclick/' + id);
  };

  render() {
    return (
      <div>
        <NavSection />
        <Container>
          <h2>NOTIFICATIONS</h2>
          <hr />

          <div className="row">
            <div className="container">
              {this.state.notification.map((i) => (
                <>
                  <Link
                    to={i.messageurl}
                    onClick={() => this.hasread(i._id)}
                  >
                    <div
                      className={`${i.isRead // change all this.state.isRead to i.isRead
                        ? "notification-main-div-admin-unread"
                        : "notification-main-div-admin-read"
                        }`}
                    >
                      <div className="notification-close-div">
                        <p>
                          <AiOutlineCloseSquare
                            style={{
                              fontSize: "30px",
                              color: "black",
                              cursor: "pointer",
                            }}
                          />
                        </p>
                      </div>
                      <div className="notification-details">
                        <p>
                          <b> {i.message} </b>
                        </p>
                        <p
                          style={{ fontWeight: "500" }}
                          className="notification-props"
                        >
                          {i.message}
                        </p>
                      </div>
                      <div className="notification-date">
                        <p className="notification-date-time">
                          <AiOutlineClockCircle
                            style={{ fontSize: "25px", marginTop: "-4px" }}
                          />{" "}
                          {i.date}
                        </p>
                      </div>

                    </div>
                  </Link>
                </>
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default Notification;
