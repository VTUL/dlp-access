import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./ResultsNumberDropdown.css";

class ResultsNumberDropdown extends Component {

  render() {
    const numberOptions = [
      {
        key: "10",
        text: <NavLink to={`/collections/${this.props.page}/10`}>10</NavLink>,
        value: "10"
      },
      {
        key: "50",
        text: <NavLink to={`/collections/${this.props.page}/50`}>50</NavLink>,
        value: "50"
      },
      {
        key: "100",
        text: <NavLink to={`/collections/${this.props.page}/100`}>100</NavLink>,
        value: "100"
      }
    ];
    return (
      <div className="dropdown-wrapper">
        <Dropdown
          placeholder="Show Results:"
          compact
          selection
          options={numberOptions}
        />
      </div>
    );
  }
}

export default ResultsNumberDropdown;
