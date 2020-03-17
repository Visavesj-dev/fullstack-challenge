import React, { Component } from 'react';
import { server } from '../../constants';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import axios from "axios"

class Header extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       username: null
    }
  }
  
  componentDidMount(){
     axios.get("http://localhost:8085/api/authen/users").then(res => {
       this.setState({username: res.data})
     })
  }


  showdata(){
    return (
      this.state.username && this.state.username.slice(this.state.username.length - 1).map(user =>{
        return user.username
      })
    )
  }
  render() {
    return (
      <header className="main-header">
      {/* Logo */}
      <a href="index2.html" className="logo">
        {/* mini logo for sidebar mini 50x50 pixels */}
        <span className="logo-mini">
          <b>E</b>CA
        </span>
        {/* logo for regular state and mobile devices */}
        <span className="logo-lg">
          <b>E -</b> Commerce Admin
        </span>
      </a>
      {/* Header Navbar: style can be found in header.less */}
      <nav className="navbar navbar-static-top">
        {/* Sidebar toggle button*/}
        <a
          href="#"
          className="sidebar-toggle"
          data-toggle="push-menu"
          role="button"
        >
          <span className="sr-only">Toggle navigation</span>
        </a>
        {/* Navbar Right Menu */}
        <div className="navbar-custom-menu">
          <ul className="nav navbar-nav">
            <li className="dropdown user user-menu">
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
              >
                <img
                  src="dist/img/user2-160x160.jpg"
                  className="user-image"
                  alt="User Image"
                />
                <span className="hidden-xs">{this.showdata()}</span>
              </a>
              <ul className="dropdown-menu">
                {/* User image */}
                <li className="user-header">
                  <img
                    src="dist/img/user2-160x160.jpg"
                    className="img-circle"
                    alt="User Image"
                  />
                  <p>
                    Alexander Pierce - Web Developer
                    <small>Member since Nov. 2012</small>
                  </p>
                </li>
                {/* Menu Body */}
                
                {/* Menu Footer*/}
                <li className="user-footer">
                <div className="pull-left">
                    <a href="#" className="btn btn-default btn-flat">
                      Profile
                    </a>
                  </div>
                  <div className="pull-right" onClick={()=> {
                    this.props.history.push("/login")  //ไปที่หน้า Login
                    localStorage.removeItem(server.LOGIN_PASSED); // remove login 
                    this.props.appReducer.app.forceUpdate(); // update หน้า front
                  }}>
                    <a href="#" className="btn btn-default btn-flat">
                      Sign out
                    </a>
                  </div>
                </li>
              </ul>
            </li>
            {/* Control Sidebar Toggle Button */}
            <li>
              <a href="#" data-toggle="control-sidebar">
                <i className="fa fa-gears" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
 
    );
  }
}

const mapStateToProps = ({appReducer}) => ({
  appReducer
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
