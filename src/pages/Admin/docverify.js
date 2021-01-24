import React, { Component } from "react";
import { Table } from "reactstrap";
import Sidebar from "./sideBar";
import { Link } from "react-router-dom";
import axios from "axios";
import C from "../../resource/values"

class Docverify extends Component {
  constructor() {
    super();
    this.state = {
      name: ["abc", "xyz"],
      id: "",
      lastname: ["abc", "xyz"],
      users: [],
    };

  }

  componentDidMount = async () => {
    let a = await axios.get(C.SERVER_CALL + `/admin/toverify`);

    this.setState({ users: a.data.users });
  };

  render() {
    var sr = 0;
    return (
      <div className="container shadow p-3 mb-5 bg-white rounded my-3">
        <Sidebar />
        <h1 className="text-center my-4">Welcome to the Admin Panel</h1>
        <h3 className="h3 text-center my-3">
          Verify The document of the following Users
        </h3>
        <div className="container">
          <Table hover className="table">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Name</th>
                <th>Phone No.</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((i) => (
                <tr>
                  <th scope="row">{(sr = sr + 1)}</th>
                  <td>{i.name}</td>
                  <td>{i.phoneNo}</td>
                  <td>
                    <Link to={`/admin/documents/${i._id}`}>
                      <button  className="btn btn-primary">
                        Verify Document
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
export default Docverify;
