import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "../css/ResultsNumberDropdown.css";

class ResultsNumberDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLimit: 10
    };
  }

  handleChange(event, result) {
    this.setState(
      {
        selectedLimit: parseInt(result.value)
      },
      function() {
        this.props.setLimit(event, result);
      }
    );
  }

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
    const placeholder = "Show Results: " + this.state.selectedLimit;
    return (
      <div className="dropdown-wrapper">
        <Dropdown
          placeholder={placeholder}
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
