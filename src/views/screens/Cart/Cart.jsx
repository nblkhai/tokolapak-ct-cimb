import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Cart.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { Table, Alert, Collapse } from "reactstrap";
import ButtonUI from "../../components/Button/Button";
import swal from "sweetalert";
import { UncontrolledCollapse, Button, CardBody, Card } from "reactstrap";
import { cartQuantity } from "../../../redux/actions";

class Cart extends React.Component {
  state = {
    arrCart: [],
    transactionDetails: {
      userId: 0,
      items: [],
      totalPrice: 0,
      status: "pending",
      isCondition: true,
    },
  };
  getCartData() {
    let fixedPrice = 0;

    Axios.get(`${API_URL}/cart`, {
      params: {
        userId: this.props.user.id,
        _expand: "product",
      },
    })
      .then((res) => {
        // this.setState({ arrCart: res.data });
        console.log(res.data);
        res.data.map((val) => {
          fixedPrice += val.quantity * val.product.price;
        });
        this.setState({
          arrCart: res.data,
          transactionDetails: {
            userId: this.props.user.id,
            items: res.data,
            totalPrice: fixedPrice,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(fixedPrice);
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
        // Buat ngubah qty kalau didelete
        this.props.cartQuantity(this.props.user.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // transaksiCart = () => {
  //   this.setState({
  //     isCondition: true,
  //   });
  // };

  checkboxHandler = (e, idx) => {
    const { checked } = e.target;
    if (checked) {
      this.setState({ checkoutItems: [...this.state.checkoutItems, idx] });
    } else {
      this.setState({
        checkoutItems: [
          ...this.state.checkoutItems.filter((val) => val !== idx),
        ],
      });
    }
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
            {/* <input
              className="form-control"
              type="checkbox"
              onChange={(e) => this.checkboxHandler(e, idx)}
            ></input> */}
          </td>
        </tr>
      );
    });
  };

  checkoutHandler = () => {
    let totalPrice;
    return this.state.arrCart.map((val, idx) => {
      const { quantity, product, id } = val;
      const { productName, image, price } = product;
      totalPrice = quantity * product.price;
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
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(totalPrice)}
          </td>
        </tr>
      );
    });
  };

  confirmToPay = () => {
    Axios.post(`${API_URL}/transactions`, this.state.transactionDetails)
      .then((res) => {
        console.log(res.data);
        this.state.arrCart.map((val) => {
          return this.deleteCartHandler(val.id);
        });
        // this.setState.transactionDetails({ isCondition: true });
        swal("Thank you!", "Your Transaction is Success", "success");
      })
      .catch((err) => {
        alert("ERRROOORR");
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container">
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
            <Alert>
              Your cart is empty! <Link to="/">Go shopping</Link>
            </Alert>
          )}
        </Table>
        <div>
          <Button color="primary" id="toggler" style={{ marginBottom: "1rem" }}>
            CheckOut
          </Button>
          <UncontrolledCollapse toggler="#toggler">
            <Card>
              <CardBody>
                <div>
                  <h4 className="mt-2">Checkout</h4>
                </div>
                <div>
                  <Table>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Image</th>
                        <th>Totals</th>
                      </tr>
                    </thead>
                    <tbody>{this.checkoutHandler()}</tbody>{" "}
                    <tfoot>
                      <tr>
                        <td colSpan={4} className="text-center">
                          <h5>Total Price</h5>
                        </td>
                        <td>
                          <h5>
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(this.state.transactionDetails.totalPrice)}
                          </h5>
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                </div>
                <div>
                  <ButtonUI type="contained" onClick={this.confirmToPay}>
                    Confirm to Pay
                  </ButtonUI>
                </div>
              </CardBody>
            </Card>
          </UncontrolledCollapse>
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
  cartQuantity,
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
