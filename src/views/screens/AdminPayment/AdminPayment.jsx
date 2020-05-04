import React from "react";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import swal from "sweetalert";

class AdminPayment extends React.Component {
  state = {
    productList: [],
    datePayment: new Date(),
    activeProducts: [],
  };
  getPaymentList = () => {
    Axios.get(`${API_URL}/transactions`)
      .then((res) => {
        this.setState({ productList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  paymentBtnHandler = (idx) => {
    this.setState({
      editForm: {
        ...this.state.productList[idx],
      },
    });
  };
  confirmPaymentHandler = (id) => {
    // Axios.put(
    //   `${API_URL}/transactions/${this.state.editForm.id}`,
    //   this.state.editForm
    // )
    console.log(id);
    Axios.patch(`${API_URL}/transactions/${id}`, {
      status: "SUDAH DIBAYAR",
      dateDone: this.state.datePayment.toLocaleDateString(),
    })
      .then((res) => {
        swal("Success!", "Your item has been edited", "success");
        this.getPaymentList();
      })
      .catch((err) => {
        swal("Error!", "Your item could not be edited", "error");
        console.log(err);
      });
  };
  componentDidMount() {
    this.getPaymentList();
  }
  renderPaymentList = () => {
    return this.state.productList.map((val, idx) => {
      const { id, totalPrice, status, transactionDate, dateDone } = val;
      return (
        <>
          <tr
          // onClick={() => {
          //   if (this.state.includes(idx)) {
          //     this.setState({
          //       activeProducts: [
          //         ...this.state.filter((item) => item !== idx),
          //       ],
          //     });
          //   } else {
          //     this.setState({
          //       activeProducts: [...this.state, idx],
          //     });
          //   }
          // }}
          >
            <td>{idx + 1}</td>
            <td> {id} </td>
            <td> {transactionDate} </td>
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
  render() {
    return (
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
                <th>Transaction Date</th>
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
    );
  }
}
export default AdminPayment;
