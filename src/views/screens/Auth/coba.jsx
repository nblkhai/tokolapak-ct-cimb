renderAuthComponent = () => {
  const { activePage } = this.state;
  if (activePage == "pending") {
    return (
      <div className="mt-5">
        <h3>Pending</h3>
        <p className="mt-4">
          You will get the best recommendation for rent house in near of you
        </p>
      </div>
    );
  } else {
    return (
      <div className="mt-5">
        <h3>Log In</h3>
        <p className="mt-4">
          Welcome back.
          <br /> Please, login to your account
        </p>
        <TextField
          value={this.state.loginForm.username}
          onChange={(e) => this.inputHandler(e, "username", "loginForm")}
          placeholder="Username"
          className="mt-5"
        />
        <TextField
          value={this.state.loginForm.password}
          onChange={(e) => this.inputHandler(e, "password", "loginForm")}
          placeholder="Password"
          className="mt-2"
          type={this.state.loginForm.showPassword ? "text" : "password"}
        />
        <input
          type="checkbox"
          onChange={(e) => this.checkboxHandler(e, "loginForm")}
          className="mt-3"
          name="showPasswordLogin"
        />{" "}
        Show Password
        <div className="d-flex justify-content-center">
          <ButtonUI
            onClick={this.loginBtnHandler}
            type="contained"
            className="mt-4"
          >
            Login
          </ButtonUI>
        </div>
      </div>
    );
  }
};
