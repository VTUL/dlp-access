import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { labelAttr } from "../lib/MetadataRenderer";

import "semantic-ui-css/semantic.min.css";

class FilterDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: this.props.siteFilter.values[0]
    };
  }

  valueOptions = () => {
    return this.props.siteFilter.values.map(val => ({
      key: val,
      text: val,
      value: val
    }));
  };

  updateFilter = (e, { value }) => {
    this.setState({ selectedValue: value });

    let filter = {};
    if (value !== "All") {
      filter = {
        [this.props.siteFilter.field]: value
      };
    }
    this.props.updateFormState("filter", filter);
  };

  render() {
    const text = `${labelAttr(this.props.siteFilter.field)}: ${
      this.state.selectedValue
    }`;
    return (
      <div className="btn-group mr-2">
        <Dropdown
          text={text}
          selection
          options={this.valueOptions()}
          onChange={this.updateFilter}
        />
      </div>
    );
  }
}

export default FilterDropdown;
