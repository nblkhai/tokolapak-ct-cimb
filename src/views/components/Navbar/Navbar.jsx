import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../../constants/API";

import { faUser } from "@fortawesome/free-regular-svg-icons";

import "./Navbar.css";
import ButtonUI from "../Button/Button";
import { logoutHandler, searchProduct } from "../../../redux/actions";

import Cookie from "universal-cookie";
const cookieObject = new Cookie();

const CircleBg = ({ children }) => {
  return <div className="circle-bg">{children}</div>;
};

class Navbar extends React.Component {
  state = {
    searchBarIsFocused: false,
    searcBarInput: "",
    dropdownOpen: false,
    qtyNumbers: 0,
  };

  inputHandler = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  onFocus = () => {
    this.setState({ searchBarIsFocused: true });
  };

  onBlur = () => {
    this.setState({ searchBarIsFocused: false });
  };

  onLogout = () => {
    this.props.onLogout();
    // this.forceUpdate();
  };

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };
  // componentDidMount() {
  //   this.qtyHandler();
  // }
  // qtyHandler = () => {
  //   Axios.get(`${API_URL}/cart`, {
  //     params: {
  //       userId: this.props.user.id,
  //       _expand: "product",
  //     },
  //   })
  //     .then((res) => {
  //       this.setState({ qtyNumbers: res.data.length });
  //       console.log(this.state.qtyNumbers);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  render() {
    return (
      <div className="d-flex flex-row justify-content-between align-items-center py-4 navbar-container">
        <div className="logo-text">
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            LOGO
          </Link>
        </div>
        <div
          style={{ flex: 1 }}
          className="px-5 d-flex flex-row justify-content-start"
        >
          <input
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            className={`search-bar ${
              this.state.searchBarIsFocused ? "active" : null
            }`}
            type="text"
            placeholder="Cari produk impianmu disini"
            onChange={(e) => {
              this.props.searchProduct(e.target.value);
            }}
          />
        </div>
        <div className="d-flex flex-row align-items-center">
          {this.props.user.id ? (
            <>
              <Dropdown
                toggle={this.toggleDropdown}
                isOpen={this.state.dropdownOpen}
              >
                <DropdownToggle tag="div" className="d-flex">
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: 24 }} />
                  <p className="small ml-3 mr-4">{this.props.user.username}</p>
                </DropdownToggle>
                <DropdownMenu className="mt-2">
                  {this.props.user.role == "admin" ? (
                    <>
                      {""}
                      <DropdownItem>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/admin/dashboard"
                        >
                          Dashboard
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/admin/members"
                        >
                          Members
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        {" "}
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/admin/payment"
                        >
                          Payments
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/admin/pageReport"
                        >
                          Page Report
                        </Link>
                      </DropdownItem>
                    </>
                  ) : (
                    <>
                      {""}
                      <DropdownItem>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/wishlist"
                        >
                          Wishlist
                        </Link>
                      </DropdownItem>

                      <DropdownItem>
                        {" "}
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/history"
                        >
                          History
                        </Link>
                      </DropdownItem>
                    </>
                  )}
                </DropdownMenu>
              </Dropdown>
              <Link
                className="d-flex flex-row"
                to="/cart"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <FontAwesomeIcon
                  className="mr-2 mt-2"
                  icon={faShoppingCart}
                  style={{ fontSize: 24 }}
                />
                <CircleBg>
                  <small style={{ color: "#3C64B1", fontWeight: "bold" }}>
                    {this.state.qtyNumbers}
                  </small>
                </CircleBg>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/auth"
                >
                  <ButtonUI
                    className="ml-3"
                    type="contained"
                    value="Logout"
                    onClick={this.onLogout}
                  >
                    Logout
                  </ButtonUI>
                </Link>
              </Link>
            </>
          ) : (
            <>
              <ButtonUI className="mr-3" type="textual">
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/auth"
                >
                  Sign in
                </Link>
              </ButtonUI>
              <ButtonUI type="contained">
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/auth"
                >
                  Sign up
                </Link>
              </ButtonUI>
            </>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = {
  onLogout: logoutHandler,
  searchProduct,
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
