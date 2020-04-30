class Cart extends React.Component {
  state = {
    cartData: [],
  };

  componentDidMount() {
    this.getCartData();
  }

  getCartData = () => {
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "product",
      },
    })
      .then((res) => {
        console.log(res.data);
        this.setState({ cartData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderCart = () => {
    return this.state.cartData.map((val, idx) => {
      return (
        <tr>
          <td>{idx + 1}</td>
          <td>
            <img
              src={val.product.image}
              style={{ width: "100%", objectFit: "contain", height: "100px" }}
            />
          </td>
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
              onClick={() => this.deleteHandler(val.id)}
            />
          </td>
        </tr>
      );
    });
  };

  deleteHandler = (id) => {
    Axios.delete(`${API_URL}/carts/${id}`)
      .then((res) => {
        console.log(res);
        this.getCartData();
      })
      .catch((err) => {
        console.log("gagal");
      });
  };

  render() {
    return (
      <div className="container">
        <h2 className="mt-5 text-center">Cart List</h2>
        <table className="table text-center mt-4">
          <thead>
            <tr>
              <th>No</th>
              <th colSpan="2">Nama Product</th>
              <th>Harga</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          {this.state.cartData.length != 0 ? (
            <tbody>{this.renderCart()}</tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="6">Cart Kosong! silahkan belanja</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Cart);

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

  deleteCart(id) {
    Axios.delete(`${API_URL}/carts/${id}`)
      .then((res) => {
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
  }
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
          <td>
            <input
              type="button"
              className="btn btn-danger"
              value="Delete"
              onClick={() => this.deleteCart(id)}
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

class Cart extends React.Component {
  state = {
    cartData: [],
  };

  getCartData = () => {
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "product",
      },
    })
      .then((res) => {
        console.log(res.data);
        this.setState({ cartData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderCartData = () => {
    return this.state.cartData.map((val, idx) => {
      const { quantity, product, id } = val;
      const { productName, image, price } = product;
      return (
        <tr>
          <td>{idx + 1}</td>
          <td>{productName}</td>
          <td>{price}</td>
          <td>{quantity}</td>
          <td>
            {" "}
            <img
              src={image}
              alt=""
              style={{ width: "100px", height: "200px", objectFit: "contain" }}
            />{" "}
          </td>
          <td>
            <ButtonUI
              type="outlined"
              onClick={() => this.deleteCartHandler(id)}
            >
              Delete Item
            </ButtonUI>
          </td>
        </tr>
      );
    });
  };

  deleteCartHandler = (id) => {
    Axios.delete(`${API_URL}/carts/${id}`)
      .then((res) => {
        this.getCartData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getCartData();
  }

  render() {
    return (
      <div className="container py-4">
        {this.state.cartData.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderCartData()}</tbody>
          </Table>
        ) : (
          <Alert>
            Your cart is empty! <Link to="/">Go shopping</Link>
          </Alert>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Cart);
