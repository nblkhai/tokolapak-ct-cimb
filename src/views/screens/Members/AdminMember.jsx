import React from "react";
import "./AdminMembers.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import swal from "sweetalert";

class AdminMembers extends React.Component {
  state = {
    userList: [],
    editForm: {
      id: 0,
      username: "",
      fullName: "",
      email: "",
      role: "",
    },
    activeUsers: [],
    modalOpen: false,
  };

  getUserList = () => {
    Axios.get(`${API_URL}/users`)
      .then((res) => {
        this.setState({ userList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderUserList = () => {
    return this.state.userList.map((val, idx) => {
      const { id, username, fullName, password, email, role } = val;
      return (
        <>
          <tr
            onClick={() => {
              if (this.state.activeUsers.includes(idx)) {
                this.setState({
                  activeUsers: [
                    ...this.state.activeUsers.filter((item) => item !== idx),
                  ],
                });
              } else {
                this.setState({
                  activeUsers: [...this.state.activeUsers, idx],
                });
              }
            }}
          >
            <td> {id} </td>
            <td> {role} </td>
            <td> {username} </td>
            <td> {fullName}</td>
            <td> {email}</td>
            <td>
              <ButtonUI
                onClick={() => this.editBtnHandler(idx)}
                className="w-100"
                type="contained"
              >
                Edit
              </ButtonUI>
            </td>
            <td>
              <ButtonUI
                onClick={() => this.deleteHandler(idx)}
                className="w-80"
                type="outlined"
              >
                Delete
              </ButtonUI>
            </td>
          </tr>
        </>
      );
    });
  };
  inputHandler = (e, field, form) => {
    let { value } = e.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });
  };
  editBtnHandler = (idx) => {
    this.setState({
      editForm: {
        ...this.state.userList[idx],
      },
      modalOpen: true,
    });
  };
  editUserHandler = () => {
    Axios.put(`${API_URL}/users/${this.state.editForm.id}`, this.state.editForm)
      .then((res) => {
        swal("Success!", "User data has been edited", "success");
        this.setState({ modalOpen: false });
        this.getUserList();
      })
      .catch((err) => {
        swal("Error!", "User data could not be edited", "error");
        console.log(err);
      });
  };
  deleteHandler = (id) => {
    Axios.delete(`${API_URL}/users/${id}`)
      .then((res) => {
        swal("Success!", "User data has been deleted", "success");
        this.getUserList();
      })
      .catch((err) => {
        swal("Error!", "User data could not be deleted", "error");
        console.log(err);
      });
  };
  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };
  componentDidMount() {
    this.getUserList();
  }
  render() {
    return (
      <div className="container py-4">
        <div className="dashboard">
          <caption className="p-3">
            <h2>Members</h2>
          </caption>
          <table className="admin-table text-center">
            <thead>
              <tr>
                <th>No.</th>
                <th>Role</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Email</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderUserList()}</tbody>
          </table>
        </div>
        <Modal
          toggle={this.toggleModal}
          isOpen={this.state.modalOpen}
          className="edit-modal"
        >
          <ModalHeader toggle={this.toggleModal}>
            <caption>
              <h3>Edit User</h3>
            </caption>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12">
                <TextField
                  value={this.state.editForm.username}
                  placeholder="Username"
                  onChange={(e) => this.inputHandler(e, "username", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <TextField
                  value={this.state.editForm.fullName}
                  placeholder="Full Name"
                  onChange={(e) => this.inputHandler(e, "fullName", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <TextField
                  value={this.state.editForm.email}
                  placeholder="Email"
                  onChange={(e) => this.inputHandler(e, "email", "editForm")}
                />
              </div>

              <div className="col-12 mt-3">
                <select
                  value={this.state.editForm.role}
                  className="custom-text-input h-100 pl-3"
                  onChange={(e) => this.inputHandler(e, "role", "editForm")}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="col-5 mt-5 offset-1">
                <ButtonUI
                  className="w-100"
                  onClick={this.toggleModal}
                  type="outlined"
                >
                  Cancel
                </ButtonUI>
              </div>
              <div className="col-5 mt-5">
                <ButtonUI
                  className="w-100"
                  onClick={this.editUserHandler}
                  type="contained"
                >
                  Save
                </ButtonUI>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default AdminMembers;
