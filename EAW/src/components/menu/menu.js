import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";


class Menu extends Component {
  render() {

    const{pathname} = this.props.location;


    return (
      <aside className="main-sidebar"  style={{ height: "auto", position: "fixed" }}>
        {/* sidebar: style can be found in sidebar.less */}
        <section className="sidebar">
          {/* sidebar menu: : style can be found in sidebar.less */}
          <ul className="sidebar-menu" data-widget="tree">
            <li className="header">MAIN NAVIGATION</li>
            <li className="active treeview menu-open">
             
              <ul className="treeview-menu">
              <li>
                  <Link to="/stock">
                    <i className="fa fa-circle-o" /> Stock
                  </Link>
                </li>
                <li>
                <Link to="/report">
                    <i className="fa fa-circle-o" /> Report
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </section>
        {/* /.sidebar */}
      </aside>
    );
  }
}

export default withRouter(Menu);
