import React from "react";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import swal from "sweetalert";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import TextField from "../../components/TextField/TextField";
class AdminMembers extends React.Component {
  state = {
    memberList: [],
    editForm: {
      id: 0,
      productName: "",
      price: 0,
      role: "",
      image: "",
      desc: "",
    },
    modalOpen: false,
  };
  componentDidMount() {
    this.getMemberList();
  }
  getMemberList = () => {
    Axios.get(`${API_URL}/users`)
      .then((res) => {
        this.setState({ memberList: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  deleteMemberList = (id) => {
    Axios.delete(`${API_URL}/users/${id}`)
      .then((res) => {
        swal("success deleted", "Item has been Deleted ", "success");
        this.getMemberList();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  editBtnHandler = (idx) => {
    this.setState({
      editForm: {
        ...this.state.memberList[idx],
      },
      modalOpen: true,
    });
  };
  editMemberHandler = () => {
    Axios.put(`${API_URL}/users/${this.state.editForm.id}`, this.state.editForm)
      .then((res) => {
        swal("Success!", "Your item has been edited", "success");
        this.setState({ modalOpen: false });
        this.getMemberList();
      })
      .catch((err) => {
        swal("Error!", "Your item could not be edited", "error");
        console.log(err);
      });
  };
  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
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
            <td>
              <ButtonUI
                onClick={(_) => this.editBtnHandler(idx)}
                type="contained"
              >
                Edit
              </ButtonUI>
              <td>
                <ButtonUI
                  onClick={(_) => this.deleteMemberList(id)}
                  type="contained"
                >
                  Delete
                </ButtonUI>
              </td>
            </td>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.renderMemberList()}</tbody>
          </table>
        </div>
        <div>
          <Modal
            toggle={this.toggleModal}
            isOpen={this.state.modalOpen}
            className="edit-modal"
          >
            <ModalHeader toggle={this.toggleModal}>
              <caption>
                <h3>Edit Member</h3>
              </caption>
            </ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="col-8">
                  <TextField
                    value={this.state.editForm.username}
                    placeholder="Username"
                    onChange={(e) =>
                      this.inputHandler(e, "username", "editForm")
                    }
                  />
                </div>
                <div className="col-4">
                  <TextField
                    value={this.state.editForm.fullName}
                    placeholder="FullName"
                    onChange={(e) =>
                      this.inputHandler(e, "fullName", "editForm")
                    }
                  />
                </div>
                <div className="col-6 mt-3">
                  <TextField
                    value={this.state.editForm.email}
                    placeholder="Email"
                    onChange={(e) => this.inputHandler(e, "email", "editForm")}
                  />
                </div>
                <div className="col-6 mt-3">
                  <select
                    value={this.state.editForm.role}
                    className="custom-text-input h-100 pl-3"
                    onChange={(e) => this.inputHandler(e, "role", "editForm")}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="col-12 text-center my-3">
                  <img src={this.state.editForm.image} alt="" />
                </div>
                <div className="col-5 mt-3 offset-1">
                  <ButtonUI
                    className="w-100"
                    onClick={this.toggleModal}
                    type="outlined"
                  >
                    Cancel
                  </ButtonUI>
                </div>
                <div className="col-5 mt-3">
                  <ButtonUI
                    className="w-100"
                    onClick={this.editMemberHandler}
                    type="contained"
                  >
                    Save
                  </ButtonUI>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}
export default AdminMembers;
