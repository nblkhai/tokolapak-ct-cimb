import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Cart.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { Table, Alert } from "reactstrap";
import ButtonUI from "../../components/Button/Button";
import swal from "sweetalert";

class Cart extends React.Component {
  state = {
    arrCart: [],
  };
  getCartData() {
    Axios.get(`${API_URL}/cart`, {
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
  }
  componentDidMount() {
    this.getCartData();
  }

  deleteCartHandler = (id) => {
    Axios.delete(`${API_URL}/cart/${id}`)
      .then((res) => {
        console.log(res);
        this.getCartData();
        swal(
          "Delete to cart",
          "Your item has been deleted from your cart",
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  renderCart = () => {
    return this.state.arrCart.map((val, idx) => {
      const { quantity, product, id } = val;
      const { productName, image, price } = product;
      return (
        <tr>
          <td>{idx + 1}</td>
          <td>{productName}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(price)}
          </td>
          <td>{quantity}</td>
          <td>
            {""}
            <img
              src={image}
              alt=""
              style={{ width: "100px", height: "200px", objectFit: "contain" }}
            ></img>
          </td>
          <td colSpan={1}>
            <ButtonUI onClick={() => this.deleteCartHandler(id)}>
              Delete{" "}
            </ButtonUI>
            <ButtonUI>Checkout</ButtonUI>
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        {this.state.arrCart.length != 0 ? (
          <tbody>{this.renderCart()}</tbody>
        ) : (
          <h3>Cart Kosong! </h3>
        )}
      </Table>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Cart);
