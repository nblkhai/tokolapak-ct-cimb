import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { Table, Alert, Collapse } from "reactstrap";
import ButtonUI from "../../components/Button/Button";

class History extends React.Component {
  state = {
    arrCart: [],
    modalOpen: false,
    activeProducts: [],
  };
  getHistoryData = () => {
    Axios.get(`${API_URL}/transactions`, {
      params: {
        userId: this.props.user.id,
        status: "SUDAH DIBAYAR",
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
    this.getHistoryData();
  }
  transactionDetail = (idx) => {
    this.setState({
      modalOpen: true,
    });
  };
  renderHistory = () => {
    return this.state.arrCart.map((val, idx) => {
      const { id, status, totalPrice, userId, doneDate, transactionDate } = val;

      return (
        <>
          <tr className="text-center">
            <td>{idx + 1}</td>
            <td>{id}</td>
            <td>{transactionDate}</td>
            <td>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(totalPrice)}
            </td>
            <td>
              <ButtonUI
                onclick={() => {
                  if (this.state.activeProducts.includes(idx)) {
                    this.setState({
                      activeProducts: [
                        ...this.state.activeProducts.filter(
                          (item) => item !== idx
                        ),
                      ],
                    });
                  } else {
                    this.setState({
                      activeProducts: [...this.activeProducts, idx],
                    });
                  }
                }}
              >
                Detail
              </ButtonUI>
            </td>
          </tr>
          <tr
            className={`collapes-item ${
              this.state.activeProducts.includes(idx) ? "active" : null
            }`}
          >
            <td className="" colSpan={3}>
              <div className="d-flex justify-content-around align-items-center">
                <div className="d-flex">
                  <div className="d-flex juztify-content-center flex-column ml-3">
                    <h5 className="mt-2">
                      Transaction Date:
                      <span style={{ fontWeight: "normal" }}>
                        {" "}
                        {transactionDate}
                      </span>{" "}
                    </h5>
                    <h5 className="mt-2">
                      Price
                      <span
                        style={{ fontWeight: "normal" }}
                        className="justify"
                      >
                        {" "}
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(totalPrice)}
                      </span>{" "}
                    </h5>
                    <h5 className="mt-2">
                      Transaction Date Done:
                      <span style={{ fontWeight: "normal" }}>
                        {" "}
                        {doneDate}
                      </span>{" "}
                    </h5>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </>
      );
    });
  };

  render() {
    return (
      <div className="container">
        <caption>
          <h1>History List</h1>{" "}
        </caption>
        {this.state.arrCart.length > 0 ? (
          <Table striped>
            <thead>
              <tr>
                <th>No</th>
                <th>Id</th>
                <th>Transaction Date</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
              <tbody>{this.renderHistory()}</tbody>
            </thead>
          </Table>
        ) : (
          <Alert>
            Your History is empty! <Link to="/"></Link>
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
export default connect(mapStateToProps)(History);
