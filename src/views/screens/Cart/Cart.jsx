import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Cart.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { Table, Alert, Collapse } from "reactstrap";
import ButtonUI from "../../components/Button/Button";
import swal from "sweetalert";
import {
  UncontrolledCollapse,
  Button,
  CardBody,
  Card,
  Select,
} from "reactstrap";
import { cartQuantity } from "../../../redux/actions";

class Cart extends React.Component {
  state = {
    arrCart: [],
    datePayment: new Date(),
    transactionDetails: {
      userId: 0,
      items: [],
      totalPrice: 0,
      status: "pending",
      isCondition: true,
      transactionDate: "",
      dateDone: "",
    },
    ongkosKirim: "",
  };
  componentDidMount() {
    this.getCartData();
  }

  inputHandler = (e) => {
    let { value } = e.target;
    this.setState({
      ongkosKirim: value,
    });
  };
  // Cuma Bisa nampilin sameDay
  getCartData = () => {
    Axios.get(`${API_URL}/cart`, {
      params: {
        userId: this.props.user.id,
        _expand: "product",
      },
    })
      .then((res) => {
        // this.setState({ arrCart: res.data });
        console.log(res.data);
        let fixedPrice = 0;
        let total = 0;
        res.data.map((val) => {
          fixedPrice += val.quantity * val.product.price;
        });
        console.log(this.state.ongkosKirim);
        if (this.state.ongkosKirim == "economy") {
          total = fixedPrice;
        } else if (this.state.ongkosKirim == "instant") {
          total = fixedPrice + 100000;
        } else if (this.state.ongkosKirim == "sameday") {
          total = fixedPrice + 50000;
        } else {
          total = fixedPrice + 20000;
        }

        this.setState({
          arrCart: res.data,
          transactionDetails: {
            userId: this.props.user.id,
            items: res.data,
            totalPrice: total,
            transactionDate: this.state.datePayment.toLocaleDateString(),
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    let totalHarga;
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
    Axios.get(`${API_URL}/cart`, {
      params: {
        userId: this.props.user.id,
        _expand: "product",
      },
    })
      .then((res) => {
        res.data.map((val) => {
          Axios.delete(`${API_URL}/cart/${val.id}`)
            .then((res) => {
              console.log(res);
              swal("Success", "Transaksi anda berhasil", "success");
              this.getCartData();
            })
            .catch((err) => {
              console.log(err);
            });
        });
        Axios.post(`${API_URL}/transactions`, this.state.transactionDetails)
          .then((res) => {
            this.state.arrCart.map((val) => {
              console.log(this.state.ongkosKirim);
              Axios.post(`${API_URL}/transactions`, {
                productId: val.product.id,
                transactionsId: res.data.id,
                price: val.product.price + this.state.ongkosKirim,
                totalPrice: val.product.price * val.quantity,
                quantity: val.quantity,
                status: "pending",
              })
                .then((res) => {
                  console.log(res);
                })
                .then((err) => {
                  console.log(err);
                });
            });
          })
          .then((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
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
          {/* <tbody>{this.renderCart()}</tbody> */}
          <div className="col-12 mt-3">
            <select
              value={this.state.ongkosKirim}
              className="custom-text-input h-100 pl-3"
              onChange={(e) => this.inputHandler(e)}
            >
              <option value="economy">Economy</option>
              <option value="instant">Instant</option>
              <option value="sameday">Sameday</option>
              <option value="express">Express</option>
            </select>
          </div>

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
