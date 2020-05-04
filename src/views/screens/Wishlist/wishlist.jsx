import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { Table, Alert, Collapse } from "reactstrap";
import swal from "sweetalert";
import ButtonUI from "../../components/Button/Button";

class Wishlist extends React.Component {
  state = {
    arrCart: [],
  };
  getWishlistData = () => {
    Axios.get(`${API_URL}/wishlist`, {
      params: {
        userId: this.props.user.id,
        _expand: "product",
      },
    })
      .then((res) => {
        this.setState({ arrCart: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.getWishlistData();
  }
  deleteWishlistHandler = (id) => {
    Axios.delete(`${API_URL}/wishlist/${id}`)
      .then((res) => {
        console.log(res);
        this.getWishlistData();
        swal(
          "Delete Wishlist",
          "Your item has been deleted from your Wishlist",
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  renderCart = () => {
    return this.state.arrCart.map((val, idx) => {
      const { product, id } = val;
      const { productName, image, price } = product;

      return (
        <tr>
          <td>{idx + 1}</td>
          <td>{id}</td>
          <td>{productName}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(price)}
          </td>

          <td>
            {""}
            <img
              src={image}
              alt=""
              style={{ width: "100px", height: "200px", objectFit: "contain" }}
            ></img>
          </td>
          <td colSpan={2}>
            <ButtonUI onClick={() => this.deleteWishlistHandler(id)}>
              Already Purchased!{" "}
            </ButtonUI>
            <ButtonUI
              onClick={() => this.deleteWishlistHandler(id)}
              className="mt-3"
              type="textual"
            >
              <Link style={{ color: "inherit", textDecoration: "none" }} to="/">
                BUY NOW!!
              </Link>
            </ButtonUI>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="container">
        <Table striped>
          <thead>
            <tr>
              <th>No</th>
              <th>Id</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>

          {this.state.arrCart.length != 0 ? (
            <tbody>{this.renderCart()}</tbody>
          ) : (
            <Alert>
              Your Wishlist is empty! <Link to="/"></Link>
            </Alert>
          )}
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Wishlist);
