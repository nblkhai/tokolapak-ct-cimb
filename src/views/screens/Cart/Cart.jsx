import React from "react";
import { connect } from "react-redux";
import "./Cart.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { Table } from "reactstrap";
import ButtonUI from "../../components/Button/Button";
import swal from "sweetalert";

class Cart extends React.Component {
  state = {
    arrCart: [],
  };
  addCart() {
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
    this.addCart();
  }

  deleteCart(id) {
    Axios.delete(`${API_URL}/carts/${id}`)
      .then((res) => {
        console.log(res);
        swal(
          "Delete to cart",
          "Your item has been deleted from your cart",
          "success"
        );
        this.addCart();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  renderCart = () => {
    return this.state.arrCart.map((val, idx) => {
      return (
        <tr>
          <td>{idx + 1}</td>
          <td>{val.product.productName}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(val.product.price)}
          </td>
          <td>{val.quantity}</td>
          <td>
            <input
              type="button"
              className="btn btn-danger"
              value="Delete"
              onClick={() => this.deleteCart(val.id)}
            />
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
            <th>Qty</th>
            <th>Price</th>
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
