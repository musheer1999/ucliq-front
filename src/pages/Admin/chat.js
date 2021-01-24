import React, { Component } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";

import api from "../../resource/values";
import Sidebar from "./sideBar";

class chat extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      anonUsers: [],
    };
  }

  componentDidMount = async () => {
    let chat = await axios.get(api.SERVER_CALL + "/admin/getchats");
    let anonChat = await axios.get(api.SERVER_CALL + "/admin/anonChats");
    this.setState({ users: chat.data, anonUsers: anonChat.data });
  };

  render() {
    var sr = 0;
    return (
      <div className="container shadow p-3 mb-5 bg-white rounded my-3">
        <Sidebar />
        <h3 className="h3 text-center my-3">
          Received Chat of following users
        </h3>
        <div className="container">
          <Table hover className="table">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Name</th>
                <th>Chat</th>
              </tr>
            </thead>
            {this.state.users.map((u) => (
              <tr>
                <th scope="row">{(sr = sr + 1)}</th>
                <td>{u.name}</td>
                <td>
                  <Link to={`/admin/chat/${u.userid}/${u.name}`}>
                    <button className="btn btn-success">Chat</button>
                  </Link>
                </td>
              </tr>
            ))}
          </Table>
        </div>
        <div className="container">
          <Table hover className="table">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Name</th>
                <th>Chat</th>
              </tr>
            </thead>
            {this.state.anonUsers.map((u) => (
              <tr>
                <th scope="row">{(sr = sr + 1)}</th>
                <td>{u.name}</td>
                <td>
                  <Link to={`/admin/anonchat/${u.phoneNo}/${u.name}`}>
                    <button className="btn btn-success">Chat</button>
                  </Link>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>
    );
  }
}

export default chat;
