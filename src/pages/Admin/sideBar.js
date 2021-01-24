import React, { Component } from "react";
import "./nav.css";
import { Link } from "react-router-dom";

class Nav extends Component {
  openNav() {

    document.getElementById("mySidenav").style.width = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  render() {
    return (
      <div>
        <div id="mySidenav" class="sidenav">
          <a
            href="javascript:void(0)"
            className="closebtn"
            onClick={this.closeNav}
          >
            &times;
          </a>
          <Link to="/admin/additem">Add Product</Link>
          <Link to="/admin/remove_product">Delete Product</Link>
          <Link to="/admin/remove_user">Remove User</Link>
          <Link to="/admin/verify">Document Verify</Link>
          <Link to="/admin/productbyno">Check Products By Number</Link>
          <Link to="/admin/allOrders">All Orders</Link>
          <Link to="/admin/all">Update/Delete</Link>
          <Link to="/admin/unvarified">Unvarified Product</Link>
          <Link to="/admin/chat">Chat</Link>
        </div>

        <span
          className="span mx-3 text-center"
          id="opentab"
          onClick={this.openNav}
        >
          &#9776; Admin Options
        </span>
      </div>
    );
  }
}
export default Nav;
