import React, { Component } from "react";
import Header from "./components/header/header";
import Menu from "./components/menu/menu";
import Footer from "./components/footer/footer";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Stock from "./components/stock/stock";
import StockEdit from "./components/stockEdit";
import StockCreate from "./components/stockCreate";
import Report from "./components/report/report";


import { server, YES } from "./constants";
import { setApp } from "./actions/app.action";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { connect } from "react-redux";

const isLoggedIn = () => {
  return localStorage.getItem(server.LOGIN_PASSED) == YES; //Login อยู่
};


// Protected Route
const SecuredRoute = ({ component: Component, ...rest }) => ( // รับ component ตัวลูก
  <Route
    {...rest}
    render={props =>
      isLoggedIn() === true ? (// login อยู่ไหม
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

class App extends Component {
  componentDidMount() {
    this.props.setApp(this); // forceupdate 
  }

  redirectToLogin = () => {
    return <Redirect to="/login" />;
  };

  render() {
    return (
      <Router>
        <div>
          {isLoggedIn() && <Header />} 
          {isLoggedIn() && <Menu />}
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <SecuredRoute path="/stock" component={Stock} />
            <SecuredRoute path="/stock-create" component={StockCreate}/>
            <SecuredRoute path="/stock-edit/:id" component={StockEdit}/>    
            <SecuredRoute path="/report" component={Report} />      
            <Route exact={true} path="/" component={this.redirectToLogin} />
            <Route path="*" component={this.redirectToLogin} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  setApp
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
