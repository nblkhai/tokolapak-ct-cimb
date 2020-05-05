import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { Table, Alert, Collapse, Card } from "reactstrap";

class History extends React.Component {
  state = {
    arrCart: [],
    activePage: [],
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
      const { id, status, totalPrice, quantity } = val;
      let date = new Date();

      return (
        <>
          <Card
            className="data wish-lsit"
            onClick={() => {
              if (this.state.activePage.includes(idx)) {
                this.state({
                  activePage: [
                    ...this.state.activePage.filter((item) => item !== idx),
                  ],
                });
              } else {
                this.state({
                  activePage: [...this.state.activePage, idx],
                });
              }
            }}
          >
            <div className="d-flex justify-content-around">
              <div className="d-flex">
                <div className="d-flex justify-content-center flex-column">
                  <h4>{id}</h4>
                  <h5>{status}</h5>
                  <h5>
                    Checkout Date:
                    <span style={{ fontWeight: "normal" }}>
                      {date.toLocaleDateString}
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </Card>
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
        </>
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
