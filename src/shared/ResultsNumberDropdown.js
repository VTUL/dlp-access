import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "../css/ResultsNumberDropdown.css";

class ResultsNumberDropdown extends Component {
  render() {
    const numberOptions = [
      {
        key: "10",
        text: "10",
        value: "10"
      },
      {
        key: "50",
        text: "50",
        value: "50"
      },
      {
        key: "100",
        text: "100",
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
          onChange={this.props.setLimit}
        />
      </div>
    );
  }
}

export default ResultsNumberDropdown;
