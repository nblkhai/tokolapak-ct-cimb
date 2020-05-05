import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { Table, Alert, Collapse } from "reactstrap";

class History extends React.Component {
  state = {
    arrCart: [],
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
  renderHistory = () => {
    return this.state.arrCart.map((val, idx) => {
      const { id, status, totalPrice } = val;

      return (
        <tr>
          <td>{idx + 1}</td>
          <td>{id}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(totalPrice)}
          </td>
          <td>{status}</td>
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
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>

          {this.state.arrCart.length != 0 ? (
            <tbody>{this.renderHistory()}</tbody>
          ) : (
            <Alert>
              Your History is empty! <Link to="/"></Link>
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
export default connect(mapStateToProps)(History);
