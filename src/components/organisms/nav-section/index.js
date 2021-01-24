import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import iconFmcg from "./icons8-fast-moving-consumer-goods-50 (1).png";
import iconMeat from "./icons8-meat-50.png";
import iconFood from "./icons8-natural-food-50.png";
import iconCart from "./icons8-shopping-cart-64.png";
import iconPlate from "./icons8-soup-plate-50.png";
import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import "./custom.css";
import { Link } from "react-router-dom";
import { logoutUser } from "../../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logo from '../../../assets/images/logo.png';
import search from "../../../assets/images/search.jpg"
import Hamburger from "../../../assets/images/Hamburger.png"
class NavSection extends Component {
  constructor(props) {
    super()
    this.state = {
      collapsed: true,
      data: [
        {
          _id: "5ec6bf92db07952fd6056c1e",
          icon: iconFood,
          name: "Food",
        },
        {
          _id: "5ec6c01d0aa60d3028408a19",
          icon: iconFmcg,
          name: "FMCG",
        },
        {
          _id: "5ec6c0760aa60d3028408a1a",
          icon: iconPlate,
          name: "Fruits and Veg.",
        },
        {
          _id: "5ec818ce94ba72744bc0145a",
          icon: iconMeat,
          name: "Meat",
        },
      ],
    };

    this.toggleNavbar = this.toggleNavbar.bind(this);
  }
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  componentDidMount() {
    const sidebar = document.querySelector(".sidebar");
    const closeIcon = document.querySelector(".close");
    const hamburger = document.querySelector(".hamburger");
    const overlay = document.querySelector(".overlay");
    const closeSideBar = () => {
      sidebar.classList.remove("reveal-sidebar");
      overlay.style.display = "none";
    };
    const openSideBar = () => {
      sidebar.classList.add("reveal-sidebar");
      overlay.style.display = "block";
    };
    closeIcon.addEventListener("click", closeSideBar);
    hamburger.addEventListener("click", openSideBar);
    overlay.addEventListener("click", closeSideBar);
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const guestLinks = (
      <>
        <div className="sidebar-item">
          <Link to="/">Home</Link>
        </div>
        <div className="sidebar-item">
          <Link to='/login'>Login / Signup</Link>
        </div>
        <div className="sidebar-item">
          <Link to="/">Shop by category</Link>
        </div>
        <div className="sidebar-item">
          <Link to="/">About ucliq</Link>
        </div>
        <div className="sidebar-foot">
          <Link to="/">Terms and Conditions</Link>
        </div>
      </>
    );
    const authLinks = (
      <>
        <div className="sidebar-item">
          <Link to="/">Home</Link>
        </div>
        <div className="sidebar-item">
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div className="sidebar-item">
          <Link to="/dashboard/yourOrders">Latest Orders</Link>
        </div>
        <div className="sidebar-item">
          <Link to="/dashboard/sellercentral">Sell on ucliq</Link>
        </div>
        <div className="sidebar-item">
          <Link to="/notifications">Notifications</Link>
        </div>
        <div className="sidebar-item">
          <Link to="/">About ucliq</Link>
        </div>
        <div className="sidebar-item">
          <Link to="/">Shop by category</Link>
        </div>
        <div className="sidebar-item">
          <Link to="/support">Help and Support</Link>
        </div>
        <div className="sidebar-item">
          <Link onClick={this.onLogoutClick.bind(this)}>Sign out</Link>
        </div>
        <div className="sidebar-foot">
          <Link>Terms and Conditions</Link>
        </div>
      </>
    );
    return (
      <>
        <div className="nav-body">
          <ul>
            <li className="hamburger">
              <img src={Hamburger} className='hambuger-image' />
            </li>
            <li className="home-logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </li>
            <li className='search-li-nav'>
              <div className="wrap-nav res-li">
                <div className="search">
                  <input type="text" class="searchTerm" placeholder="What are you looking for?" />
                  <button type="submit" class="searchButton">
                    <img src={search} className='nav-icon-1' />
                  </button>
                </div>
              </div>
            </li>
            {
              isAuthenticated
                ? <>
                  <li className="cart">
                    <Link to="/cart">
                      <FiShoppingCart style={{ fontSize: "28px" }} />
                    </Link>
                  </li>
                  <li style={{ marginLeft: "auto", marginRight: "auto" }}>
                    <Link to={"/dashboard"}>
                      <AiOutlineUser className='nav-icon-2' />
                    </Link>
                  </li>
                </>
                : <>
                  <li className="login-btn">
                    <Link to={"/login"}>
                      LOGIN
                  </Link>
                  </li>
                </>
            }
          </ul>
          <ul className='res-nav-ul'>
            <li className='search-li-nav-res'>
              <div className="wrap-nav non-res-li">
                <div className="search">
                  <input type="text" class="searchTerm" placeholder="What are you looking for?" />
                  <button type="submit" class="searchButton">
                    {/* <BsSearch className='nav-icon-1' /> */}
                    <img src={search} className='nav-icon-1' />
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="sidebar">
          <div className="sidebar-logo">
            UCLIQ
            <div className="close">X</div>
          </div>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
        <div className="overlay"></div>
        <div className="query-bar">
          <div>
            For Any Queries Call Us At :
            <a href="tel:+91-8882664898">+91-8882664898</a>
          </div>
        </div>
      </>
    );
  }
}

NavSection.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(NavSection));
