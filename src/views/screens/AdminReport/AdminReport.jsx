import React from "react";
import { Table, Alert } from "reactstrap";
import Axios from "axios";
import { connect } from "react-redux";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import swal from "sweetalert";

class AdminReport extends React.Component {
  state = {
    userCount: 0,
    productCount: 0,
    dataList: [],
    usernameList: [],
    productList: [],
  };
  componentDidMount() {
    this.getData();
  }

  // ini untuk ngeGetData untuk menampilkan semua dataList
  getData = () => {
    Axios.get(`${API_URL}/transactions`, {
      params: {
        status: "SUDAH DIBAYAR",
        _embed: "transactionDetails",
      },
    }).then((res) => {
      console.log(res.data);
      this.setState({ dataList: res.data });
      Axios.get(`${API_URL}/users`)
        .then((res) => {
          this.setState({ usernameList: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
      Axios.get(`${API_URL}/products`)
        .then((res) => {
          this.setState({ productList: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  // Ini buat nampilin userData diListnya
  showDataUser = () => {
    return this.state.usernameList.map((val, idx) => {
      let totalBelanja = 0;
      if (val.role == "user") {
        this.state.dataList.map((val) => {
          if (val.username == val.username) {
            totalBelanja += val.totalPrice;
          }
        });
        return (
          <>
            <tr>
              <td>{idx + 1}</td>
              <td>{val.username}</td>
              <td>{totalBelanja}</td>
            </tr>
          </>
        );
      }
    });
  };
  render() {
    return (
      <div>
        <h1>Data User</h1>
        <Table>
          <thead>
            <tr>
              <td>no</td>
              <td>Username</td>
              <td>Jumlah Belanja</td>
            </tr>
          </thead>
          <tbody>{this.showDataUser()}</tbody>
        </Table>
        <br />
      </div>
    );
  }
}
export default AdminReport;
