import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Cookie from "universal-cookie";
import { connect } from "react-redux";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./views/screens/Home/Home";
import Navbar from "./views/components/Navbar/Navbar";
import AuthScreen from "./views/screens/auth/AuthScreen";
import ProductDetails from "./views/screens/ProductDetails/ProductDetails";
import Cart from "./views/screens/Cart/Cart";
import AdminDashboard from "./views/screens/Admin/AdminDashboard";
import PageNotFound from "./views/screens/PageNotFound/PageNotFound";
import { userKeepLogin, cookieChecker } from "./redux/actions";
import wishlist from "./views/screens/Wishlist/wishlist";
import AdminPayment from "./views/screens/AdminPayment/AdminPayment";
import AdminMembers from "./views/screens/Members/AdminMember";
import History from "./views/screens/History/History";
const cookieObj = new Cookie();

class App extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      let cookieResult = cookieObj.get("authData", { path: "/" });
      if (cookieResult) {
        this.props.keepLogin(cookieResult);
      } else {
        this.props.cookieChecker();
      }
    }, 1500);
  }
  renderAdminRoutes = () => {
    if (this.props.user.role === "admin") {
      return (
        <>
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <Route exact path="/admin/payment" component={AdminPayment} />
          <Route exact path="/admin/members" component={AdminMembers} />
        </>
      );
    }
  };
  render() {
    if (this.props.user.cookieChecked) {
      return (
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth" component={AuthScreen} />
            <Route
              exact
              path="/product/:productId"
              component={ProductDetails}
            />
            <Route exact path="/cart" component={Cart} />
            {this.renderAdminRoutes()}
            <Route exact path="/wishlist" component={wishlist} />
            <Route exact path="/history" component={History} />
            <Route exact path="/*" component={PageNotFound} />
          </Switch>
          <div style={{ height: "120px" }} />
        </>
      );
    } else {
      return <div>Loading ...</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  keepLogin: userKeepLogin,
  cookieChecker,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
