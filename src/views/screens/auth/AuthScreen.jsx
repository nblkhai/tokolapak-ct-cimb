import React from "react";
import TextField from "../../components/TextField/TextField";
import ButtonUI from "../../components/Button/Button";
import { registerHandler, loginHandler } from "../../../redux/actions";
import { connect } from "react-redux";

class AuthScreen extends React.Component {
  state = {
    username: "",
    fullName: "",
    repPassword: "",
    password: "",
    address: "",
    users: [],
    cond: true,
  };
  inputHandler = (e, field) => {
    const { value } = e.target;
    this.setState({ [field]: value });
  };
  registerPage = () => {
    this.setState({ cond: false });
  };
  loginPage = () => {
    this.setState({ cond: true });
  };
  loginHandler = () => {
    const { username, password } = this.state;
    const userData = {
      username,
      password,
    };
    this.props.onLogin(userData);
  };
  registerPostHandler = () => {
    const { username, password, repPassword, address, fullName } = this.state;
    const userData = {
      username,
      password,
      address,
      fullName,
    };

    this.props.onRegister(userData);
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-5">
            <div>
              <div className="d-flex justify-content-around align-items-center">
                <input
                  className="btn"
                  type="button"
                  value="Login"
                  onClick={this.loginPage}
                />
                <input
                  className="btn"
                  type="button"
                  value="Register"
                  onClick={this.registerPage}
                />
              </div>
              {this.state.cond ? (
                <div>
                  <p className="mt-4">
                    Welcome back.
                    <br /> Please, login to your account
                  </p>

                  <TextField
                    placeholder="Username"
                    className="mt-5"
                    onChange={(e) => this.inputHandler(e, "username")}
                  />
                  <TextField
                    placeholder="Password"
                    className="mt-2"
                    onChange={(e) => this.inputHandler(e, "password")}
                  />

                  <div className="d-flex justify-content-center">
                    <ButtonUI
                      type="contained"
                      className="mt-4"
                      onClick={this.loginHandler}
                    >
                      Login
                    </ButtonUI>
                  </div>
                </div>
              ) : (
                <div>
                  <h3>Register</h3>
                  <p className="mt-4">
                    You will get the best recommendation for rent house in near
                    of you
                  </p>
                  <TextField
                    placeholder="Username"
                    className="mt-5"
                    onChange={(e) => this.inputHandler(e, "username")}
                  />
                  <TextField
                    placeholder="Fullname"
                    className="mt-2"
                    onChange={(e) => this.inputHandler(e, "fullName")}
                  />
                  <TextField
                    placeholder="Password"
                    className="mt-2"
                    onChange={(e) => this.inputHandler(e, "password")}
                  />
                  <TextField
                    placeholder="Repeat Password"
                    className="mt-2"
                    onChange={(e) => this.inputHandler(e, "repPassword")}
                  />
                  <TextField
                    placeholder="Address"
                    className="mt-2"
                    onChange={(e) => this.inputHandler(e, "address")}
                  />
                  <div className="d-flex justify-content-center">
                    <ButtonUI
                      type="contained"
                      className="mt-4"
                      onClick={this.registerPostHandler}
                    >
                      Register
                    </ButtonUI>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-7">Picture</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  onLogin: loginHandler,
  onRegister: registerHandler,
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
