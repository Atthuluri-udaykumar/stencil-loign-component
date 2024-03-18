import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./log.css";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { IoMdRefresh } from "react-icons/io";

var dateFilterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    var cellDate = asDate(cellValue);
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
};

class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colDef: [
        {
          field: "logs",
          headerName: "Logs",
          flex: 0.7,
          width: 20,
        },
        {
          field: "businessFlowName",
          headerName: "Flow Name",
          flex: 1,
          cellStyle: { "text-align": "left", "font-size": "12px" },
          cellRenderer: (params) => {
            return (
              <span title={params?.data?.businessFlowName}>
                {params?.data?.businessFlowName}
              </span>
            );
          },
        },
        {
          field: "CorrelationId",
          headerName: "Correlation Id",
          flex: 1,
          cellStyle: { "text-align": "left", "font-size": "12px" },
          cellRenderer: (params) => {
            return (
              <span title={params?.data?.CorrelationId}>
                {params?.data?.CorrelationId}
              </span>
            );
          },
        },
        {
          field: "startTime",
          headerName: "Date",
          flex: 2,
          cellStyle: { "text-align": "left", "font-size": "12px" },
          cellRenderer: (params) => {
            return (
              <span title={params?.data?.startTime}>
                {params?.data?.startTime}
              </span>
            );
          },
        },
      ],
      data: [
        {
          name: "03-05-2024",
          success: 4000,
          error: 2400,
          amt: 2400,
        },
        {
          name: "03-06-2024",
          success: 3000,
          error: 1398,
          amt: 2210,
        },
        {
          name: "03-07-2024",
          success: 2000,
          error: 9800,
          amt: 2290,
        },
        {
          name: "03-08-2024",
          success: 2780,
          error: 3908,
          amt: 2000,
        },
        {
          name: "03-11-2024",
          success: 1890,
          error: 4800,
          amt: 2181,
        },
        {
          name: "03-09-2024",
          success: 2390,
          error: 3800,
          amt: 2500,
        },
        {
          name: "03-10-2024",
          success: 3490,
          error: 4300,
          amt: 2100,
        },
      ],
      showLogsInfo: false,
      errorInfo: [],
      showErrorInfo: false,
      logsInfo: [],
      currentPage: 1,
      isLoading: false,
      gpsi: "",
      iccid: "",
    };
  }

  componentDidMount = (props) => {
    let gpsi = null;
    let iccid = null;
    let wholesaleCustomerId = null;
    let subscriberId = null;
    let bearerToken = null;
    wholesaleCustomerId = this.props.subscriptionDetails.wholesaleCustomerId;
    subscriberId = this.props.subscriptionDetails.subscriberId;
    this.props.subscriptionDetails?.subscriptions?.map((subscription) => {
      let resourses = subscription.resources;
      resourses.map((resourse) => {
        gpsi = resourse.gpsi;
        iccid = resourse.iccid;
      });
    });
    this.setState({
      gpsi,
      iccid,
    });
    bearerToken = this.props.bearerTokenValue;
    this.getLogDetails(
      subscriberId,
      wholesaleCustomerId,
      bearerToken,
      gpsi,
      iccid
    );
  };

  getLastWeekDate() {
    const currentDate = new Date();
    const lastWeekDate = new Date(currentDate);

    // Calculate the date for the same day of the week but one week ago
    lastWeekDate.setDate(lastWeekDate.getDate() - 7);

    return lastWeekDate;
  }

  getLogDetails = async (
    subscriberId,
    wholesaleCustomerId,
    bearerToken,
    gpsi,
    iccid
  ) => {
    var logsData = {
      gpsi: gpsi,
      iccid: iccid,
      subscriberId: subscriberId,
      requestFor: "logRequest",
    };
    this.setState({ isLoading: true });
    let axiosConfigForOrderDetails = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        wholesaleCustomerId: wholesaleCustomerId,
      },
    };

    this.setState({
      logsInfo: [
        {
          logs: "ter",
          businessFlowName: "sf",
          CorrelationId: "ss",
          startTime: new Date().toISOString(),
        },
        {
          logs: "ter",
          businessFlowName: "sf",
          CorrelationId: "ss",
          startTime: new Date().toISOString(),
        },
        {
          logs: "ter",
          businessFlowName: "sf",
          CorrelationId: "ss",
          startTime: new Date().toISOString(),
        },
        {
          logs: "ter",
          businessFlowName: "uday",
          CorrelationId: "kumar",
          startTime: this.getLastWeekDate().toISOString(),
        },
      ],
      isLoading: false,
    });

    return;
    axios
      .post(
        "https://whapi-subscriber-details.wireless-mno-intg-i.aws.dishcloud.io/wireless/internal/subscribers/orderRequest",
        logsData,
        axiosConfigForOrderDetails
      )
      .then((myresponse) => {
        if (myresponse.status === 200) {
          this.setState({
            logsInfo: myresponse.data,
            isLoading: false,
          });
        } else {
          this.setState({
            errorInfo: myresponse.data.error,
            showErrorInfo: true,
          });
        }
      })
      // file deepcode ignore ReactMissingArrayKeys: <please specify a reason of ignoring this>
      .catch((err) => {
        this.setState({ isLoading: false });
        console.log("AXIOS ERROR: ", err);
      });
  };

  displayLogsInfo = () => {
    let courseFlag = this.state.showLogsInfo;
    this.setState({
      showLogsInfo: !courseFlag,
    });
  };

  isExternalFilterPresent = () => {
    return true; // Return true to indicate that an external filter is present
  };

  doesExternalFilterPass = (node) => {
    // Implement your custom filter logic here
    // For example, check if the node data contains the filter value
    const { filterValue } = this.state;
    if (!filterValue) {
      return true; // No filter, so pass all rows
    }
    return (
      node.data.make.toLowerCase().includes(filterValue.toLowerCase()) ||
      node.data.model.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  onFilterChange = (filterValue) => {
    const { dateUnit, dateNumbers, dateType } = filterValue;
    let hours = 0;
    let dateNum = Number(dateNumbers);
    console.log({ filterValue });
    if (["hours", "days", "weeks"].includes(dateUnit)) {
      hours =
        dateUnit === "hours"
          ? dateNum
          : dateUnit === "days"
          ? dateNum * 24
          : dateNum * 7 * 24;
    }
    let data = JSON.parse(JSON.stringify(this.state.logsInfo)); // Deep copy this.state.logsInfo;
    let finalObj = this.filterDataByLastDateTime(
      data,
      hours,
      dateUnit === "minutes" ? dateNum : 0,
      dateUnit === "seconds" ? dateNum : 0,
      dateUnit === "months" ? dateNum : 0,
      dateUnit === "years" ? dateNum : 0
    );
    this.setState((prevState) => ({
      logsInfo: [...finalObj],
    }));
    this.forceUpdate();
    console.log(this.gridApi);
    this.gridApi.onFilterChanged(); // Apply the filter
    // this.setState({ filterValue });
  };

  filterDataByLastDateTime(
    data,
    lastHours = 0,
    lastMinutes = 0,
    lastSeconds = 0,
    lastMonths = 0,
    lastYears = 0
  ) {
    console.log({
      data,
      lastHours,
      lastMinutes,
      lastSeconds,
      lastMonths,
      lastYears,
    });
    const currentDate = new Date();
    const filterDate = new Date(currentDate);
    filterDate.setHours(filterDate.getHours() - lastHours);
    filterDate.setMinutes(filterDate.getMinutes() - lastMinutes);
    filterDate.setSeconds(filterDate.getSeconds() - lastSeconds);
    filterDate.setMonth(filterDate.getMonth() - lastMonths);
    filterDate.setFullYear(filterDate.getFullYear() - lastYears);

    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.startTime); // Assuming item.date is a string representing a date
      return (
        itemDate.toISOString() >= filterDate.toISOString() &&
        itemDate.toISOString() <= currentDate.toISOString()
      );
    });
    return filteredData;
  }

  render() {
    const { showLogsInfo, isLoading, gpsi, iccid } = this.state;
    const {
      bearerTokenValue,
      subscriptionDetails: { wholesaleCustomerId, subscriberId },
    } = this.props;
    let myLogsInfoDisplay = null;

    if (this.state.showLogsInfo === true) {
      if (!this.state.showErrorInfo) {
        myLogsInfoDisplay = <div></div>;
      }
    }

    return (
      <div className="logcontainer">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          Logs Information
          <button className="collapse1-button" onClick={this.displayLogsInfo}>
            {" "}
            {showLogsInfo ? <FaMinus /> : <FaPlus />}{" "}
          </button>
          <button
            className="bucket-collapseRefresh-button"
            onClick={() =>
              this.getLogDetails(
                subscriberId,
                wholesaleCustomerId,
                bearerTokenValue,
                gpsi,
                iccid
              )
            }
          >
            {isLoading ? <IoMdRefresh spin /> : <IoMdRefresh />}
          </button>
        </div>
        <div className={`page1-content3 ${showLogsInfo ? "" : "collapsed"}`}>
          {this.state.isLoading && <Spinner />}
          {this.state.showLogsInfo &&
            !this.state.showErrorInfo &&
            !this.state.isLoading && (
              <div
                className="ag-theme-quartz" // applying the grid theme
                style={{
                  height: "400px",
                  marginTop: "10px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                <CustomFilterComponent onFilterChange={this.onFilterChange} />

                <AgGridReact
                  rowData={this.state.logsInfo}
                  columnDefs={this.state.colDef}
                  pagination={true}
                  isExternalFilterPresent={this.isExternalFilterPresent}
                  doesExternalFilterPass={this.doesExternalFilterPass}
                  onGridReady={(params) => (this.gridApi = params.api)}
                />
              </div>
            )}
        </div>
      </div>
    );
  }
}
export default Log;

class CustomFilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: "",
      dateType: "last",
      dateNumbers: "",
      dateUnit: "seconds",
    };
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  applyFilter = () => {
    const { dateType, dateNumbers, dateUnit } = this.state;
    this.props.onFilterChange({ dateType, dateNumbers, dateUnit });
  };

  render() {
    const { dateType, dateNumbers, dateUnit } = this.state;
    return (
      <div
        style={{
          textAlign: "right",
          padding: "5px",
        }}
      >
        <select
          className="page_select"
          name="dateType"
          disabled={true}
          value={dateType}
        >
          <option value="last">Last</option>
          <option value="next">Next</option>
        </select>
        <input
          className="page_input"
          type="number"
          name="dateNumbers"
          placeholder={`Enter Number`}
          value={dateNumbers}
          min="1"
          onChange={this.handleChange}
        />
        <select
          className="page_select"
          name="dateUnit"
          onChange={this.handleChange}
          value={dateUnit}
        >
          <option value="seconds">Seconds</option>
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
          <option value="years">Years</option>
        </select>
        <button className="page_button" onClick={this.applyFilter}>
          Apply Filter
        </button>
      </div>
    );
  }
}
