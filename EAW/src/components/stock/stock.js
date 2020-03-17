import React, { Component } from "react";
import * as actions from "./../../actions/stock.action";
import { connect } from "react-redux";

import { imageUrl } from "./../../constants";
import { Link } from "react-router-dom";
import _ from "lodash";
import Moment from "react-moment"; // ทำวันที่
import NumberFormat from "react-number-format"; // เลข 
import "./stock.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

class Stock extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  createRows = () => {
    try {
      const { result, isFetching } = this.props.stockReducer;
      return (
        !isFetching &&
        result != null &&
        result.map(item => (
          <tr key={item.id}>
            <td>
              <Moment format="DD/MM/YYYY">{item.created}</Moment>
            </td>
            <td>
              <span style={{ marginRight: 10}}>
                <img
                  src={`${imageUrl}/images/${item.image}`}
                  style={{ maxWidth: 50 }}
                />
              </span>
              {item.name}
            </td>
            <td>
              <NumberFormat
                value={item.price}
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={"฿"}
              />
            </td>
            <td>
              <NumberFormat
                value={item.stock}
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={0}
                fixedDecimalScale={true}
                suffix={" pcs"}
              />
            </td>
            <td>{item.id}</td>
            <td style={{ textAlign: "center" }}>
              <button
                onClick={() =>
                  this.props.history.push(`/stock-edit/${item.id}`)
                }
                type="button"
                className="btn btn-info"
              >
                แก้ไข
              </button>
              <span style={{ color: "grey" }}> | </span>
              <button
                onClick={() => {
                  MySwal.fire({
                    title: "Are you sure to delete?",
                    text: "You won't be able to revert this!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel!"
                  }).then(result => {
                    if (result.value) {
                      this.props.deleteProduct(item.id);
                    }
                  });
                }}
                type="button"
                className="btn btn-danger"
              >
                ลบ
              </button>
            </td>
          </tr>
        ))
      );
    } catch (e) {}
  };

  render() {
    return (
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <h1>
            Stock
            <small>Report</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <a href="#/">
                <i className="fa fa-dashboard" /> Home
              </a>
            </li>
            <li>
              <a href="#/">Stock</a>
            </li>
          </ol>
        </section>
        {/* Main content */}
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-body">
                  <div className="row" style={{ marginBottom: 40 }}>
                    <div className="col-xs-6">
                      <input
                        type="search"
                        className="form-control input-lg"
                        placeholder="Enter search keyword"
                        style={{ borderRadius: 10 }}
                      />
                    </div>
                    <div className="col-xs-6 text-right">
                      <Link
                        to="/stock-create"
                        style={{ float: "right", margin: 0, width: 100 }}
                        className="btn btn-success btn-lg"
                      >
                        เพิ่ม
                      </Link>
                    </div>
                  </div>

                  <table
                    id="stock_table"
                    className="table table-bordered table-striped table-hover"
                    style={{ height: 300, maxHeight: 300 }}
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "7%", textAlign: "center" }}>
                          CREATED
                        </th>
                        <th style={{ width: "50%" }}>NAME</th>
                        <th style={{ width: "9%" }}>PRICE</th>
                        <th style={{ width: "9%" }}>STOCK</th>
                        <th style={{ width: "4%" }}>ID</th>
                        <th style={{ width: "14%", textAlign: "center" }}>
                          ACTION
                        </th>
                      </tr>
                    </thead>
                    <tbody>{this.createRows()}</tbody>
                  </table>
                </div>
                {/* /.box-body */}
              </div>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ stockReducer }) => ({
  stockReducer
});

const mapDispatchToProps = {
  // spreading
  ...actions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stock);
