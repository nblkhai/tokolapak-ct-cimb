import React from "react";
import { connect } from "react-redux";
import "./Cart.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import { Table, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import TextField from "../../components/TextField/TextField";
import swal from "sweetalert";

class Cart extends React.Component {
  state = {
    cartData: [],
    checkOutItem: [],
    cond: false,
    ongkosKirim: 0,
    totalPrice: 0,
  };
  componentDidMount() {
    this.addCart();
  }

  addCart = () => {
    let hargaTotal = 0;
    Axios.get(`${API_URL}/cart`, {
      params: {
        userId: this.props.user.id,
        _expand: "product",
      },
    })
      .then((res) => {
        this.setState({ cartData: res.data });
        console.log(this.state.cartData);
        this.state.cartData.map((val) => {
          hargaTotal += val.quantity * val.product.price;
        });
        this.setState({
          totalPrice: hargaTotal,
        });
      })
      .catch((err) => {
        alert("error");
        console.log(err);
      });
  };

  renderCart = () => {
    return this.state.cartData.map((val, idx) => {
      const { quantity, product, id } = val;
      const { productName, price, image } = product;
      return (
        <tr key={`cartData-${id}`}>
          <td>{idx + 1}</td>
          <td>{productName}</td>
          <td>
            {" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(price)}
          </td>
          <td>{quantity}</td>
          <td>
            <img src={image} width="80" />
          </td>

          <td>
            <ButtonUI onClick={() => this.deleteCartHandlerHandler(id)}>
              Delete{" "}
            </ButtonUI>
          </td>
        </tr>
      );
    });
  };

  cartTransactio = () => {
    this.setState({
      cond: true,
    });
  };

  inputHandler = (e, field) => {
    let { value } = e.target;
    this.setState({
      [field]: value,
    });
  };

  renderTraksaksi = () => {
    return this.state.cartData.map((val, idx) => {
      const { quantity, product, id } = val;
      const { productName, price, image } = product;
      return (
        <tr key={`cartData-${id}`}>
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
            <img src={image} width="80" />
          </td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(quantity * price + +this.state.ongkosKirim)}
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
            this.state.cartData.map((val) => {
              Axios.post(`${API_URL}/transactionDetails`, {
                productId: val.product.id,
                transactionsId: res.data.id,
                price: val.product.price,
                totalPrice: val.product.price * val.quantity,
                quantity: val.quantity,
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

  deleteCartHandler = (id) => {
    Axios.get(`${API_URL}/cart/${id}`)
      .then((res) => {
        Axios.delete(`${API_URL}/cart/${id}`)
          .then((res) => {
            console.log(res.data);
            alert("sudah terhapus");
            this.addCart();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container py-4">
        {this.state.cartData.length > 0 ? (
          <>
            <Table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.renderCart()}</tbody>
            </Table>
            <div className="col-12 mt-3">
              <select
                value={this.state.ongkosKirim}
                className="custom-text-input h-100 pl-3"
                onChange={(e) => this.inputHandler(e, "ongkosKirim")}
              >
                <option value="0">Economy</option>
                <option value="100000">instant</option>
                <option value="50000">Sameday</option>
                <option value="20000">Express</option>
              </select>
            </div>
            <div className="d-flex justify-content-center">
              <ButtonUI onClick={this.cartTransactio}>CheckOut</ButtonUI>
            </div>
            {!this.state.cond ? null : (
              <>
                <h4>Konfirmasi Total Pembelian Anda</h4>
                <Table style={{ marginTop: "10px" }}>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Image</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderTraksaksi()}</tbody>
                </Table>
                <div className="d-flex flex-column">
                  <center>
                    <ButtonUI onClick={this.confirmToPay} type="outlined">
                      Confirm To Pay
                    </ButtonUI>
                  </center>
                </div>
              </>
            )}
          </>
        ) : (
          <Alert>
            Your Cart is Empty!<Link to="/">Go Shopping</Link>
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
