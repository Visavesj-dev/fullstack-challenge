import React, { Component } from "react";
import { login, autoLogin } from "./../../actions/login.action";
import { connect } from "react-redux";

class Login extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       username:"",
       password:""
    }
  }

  componentDidMount(){
    this.props.autoLogin(this.props.history); // ถ้า Login อยู่ให้ทำการกลับมาที่หน้า stock
  }
  


  showError = ()=>{
    return (
      <div className="alert alert-danger alert-dismissible">
      <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
      <h4><i className="icon fa fa-ban" /> Error!</h4> Incorrect username or password
    </div>
    )
  }

  render() {
    return (
      <div className="login-box">
        <div className="login-logo">
            <b>E-commerce </b>Login
        </div>
        {/* /.login-logo */}
        <div 
        style={{background: "whitesmoke", borderRadius: 10}}
        className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>
          <form>
            <div className="form-group has-feedback">
              <input
                onChange={e=>this.setState({username:e.target.value})}
                type="email"
                className="form-control"
                placeholder="Email"
              />
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input
                onChange={e=>this.setState({password:e.target.value})}
                type="password"
                className="form-control"
                placeholder="Password"
              />
              <span className="glyphicon glyphicon-lock form-control-feedback" />
            </div>

            {this.props.loginReducer.isError ? this.showError() : null }

  
            {/* Login */}
            <div className="row">
              <div className="col-xs-12">
                <button
                 onClick={e=>{
                   e.preventDefault(); //ไม่ให้หน้า Refresh
                   this.props.login(this.props.history,this.state) // authentication login 
                 }}
                  type="submit"
                  className="btn btn-primary btn-block btn-flat"
                >
                  Sign In
                </button>
              </div>
              {/* /.col */}
            </div>

            {/* Register */}
            <div className="row">
              <div className="col-xs-12">
                <button
                onClick={()=>this.props.history.push("/register")}
                  type="submit"
                  style={{marginTop: 8}}
                  className="btn btn-block btn-default"
                >
                  Register
                </button>
              </div>
              {/* /.col */}
            </div>
          </form>
        </div>
        {/* /.login-box-body */}
      </div>
    );
  }
}


const mapStateToProps = ({loginReducer}) => ({ loginReducer })

const mapDispatchToProps = {
  login, autoLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
