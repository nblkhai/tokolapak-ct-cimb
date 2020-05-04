import React from "react";
import Axios from "axios";
import { API_URL } from "../../../constants/API";

class AdminMembers extends React.Component {
  state = {
    memberList: [],
  };
  getMemberList = () => {
    Axios.get(`${API_URL}/users`)
      .then((res) => {
        this.setState({ memberList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderMemberList = () => {
    console.log(this.state.memberList);
    return this.state.memberList.map((val, idx) => {
      const { id, username, fullName, email } = val;
      return (
        <>
          <tr>
            <td>{idx + 1}</td>
            <td> {id} </td>
            <td> {username} </td>
            <td>{fullName}</td>
            <td>{email}</td>
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
            <h2>MEMBER LIST</h2>
          </caption>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>{this.renderMemberList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default AdminMembers;
