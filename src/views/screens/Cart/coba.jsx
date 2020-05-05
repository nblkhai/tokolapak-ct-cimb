import React from "react";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import swal from "sweetalert";

class AdminPayment extends React.Component {
  state = {
    activePage: "register",
    productList: [],
    productListAccept: [],
    datePayment: new Date(),
    activeProducts: [],
  };

  renderPaymentList = () => {
    return this.state.productList.map((val, idx) => {
      const { id, totalPrice, status, dateDone } = val;
      return (
        <>
          <tr>
            <td>{idx + 1}</td>
            <td> {id} </td>
            <td> {status} </td>
            <td> {dateDone} </td>
            <td>
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(totalPrice)}{" "}
            </td>
            <td>
              <ButtonUI
                onClick={(_) => this.confirmPaymentHandler(id)}
                type="contained"
              >
                Confirm Payment
              </ButtonUI>
            </td>
          </tr>
          <tr
          // className={`collapse-item ${
          //   this.state.includes(idx) ? "active" : null
          // }`}
          >
            <div className="d-flex flex-column align-items-center"></div>
          </tr>
        </>
      );
    });
  };
  renderPaymentListAccept = () => {
    return this.state.productListAccept.map((val, idx) => {
      const { id, totalPrice, status, dateDone } = val;
      return (
        <>
          <tr>
            <td>{idx + 1}</td>
            <td> {id} </td>
            <td> {status} </td>
            <td> {dateDone} </td>
            <td>
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(totalPrice)}{" "}
            </td>
          </tr>
          <tr
          // className={`collapse-item ${
          //   this.state.includes(idx) ? "active" : null
          // }`}
          >
            <div className="d-flex flex-column align-items-center"></div>
          </tr>
        </>
      );
    });
  };
  renderAuthComponent = () => {
    const { activePage } = this.state;
    if (activePage == "register") {
      return (
        <div className="mt-5">
          <h3>Pending</h3>
          <div className="container py-4">
            <div className="dashboard">
              <caption className="p-3">
                <h2>TRANSACTIONS</h2>
              </caption>
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Transaction Done</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{this.renderPaymentList()}</tbody>
              </table>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-5">
          <h3>Accept</h3>
          <div className="container py-4">
            <div className="dashboard">
              <caption className="p-3">
                <h2>TRANSACTIONS</h2>
              </caption>
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Transaction Done</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>{this.renderPaymentListAccept()}</tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
  };
  getPaymentList = () => {
    Axios.get(`${API_URL}/transactions`, {
      params: {
        status: "pending",
      },
    })
      .then((res) => {
        this.setState({ productList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getPaymentListAccept = () => {
    Axios.get(`${API_URL}/transactions`, {
      params: {
        status: "SUDAH DIBAYAR",
      },
    })
      .then((res) => {
        this.setState({ productListAccept: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.getPaymentList();
    this.getPaymentListAccept();
  }
  confirmPaymentHandler = (id) => {
    console.log(id);
    Axios.patch(`${API_URL}/transactions/${id}`, {
      status: "SUDAH DIBAYAR",
      dateDone: this.state.datePayment.toLocaleDateString(),
    })
      .then((res) => {
        swal("Success!", "Your item has been edited", "success");
        this.getPaymentList();
        this.getPaymentListAccept();
      })
      .catch((err) => {
        swal("Error!", "Your item could not be edited", "error");
        console.log(err);
      });
  };
  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-12">
            <div className="d-flex flex-row">
              <ButtonUI
                className={`auth-screen-btn ${
                  this.state.activePage == "register" ? "active" : null
                }`}
                type="outlined"
                onClick={() => this.setState({ activePage: "register" })}
              >
                Pending
              </ButtonUI>
              <ButtonUI
                className={`ml-3 auth-screen-btn ${
                  this.state.activePage == "login" ? "active" : null
                }`}
                type="outlined"
                onClick={() => this.setState({ activePage: "login" })}
              >
                Accept
              </ButtonUI>
            </div>
            {this.renderAuthComponent()}
          </div>
        </div>
      </div>
    );
  }
}
export default AdminPayment;
