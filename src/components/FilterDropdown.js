import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

class FilterDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: this.props.siteFilter.values[0]
    };
  }

  valueOptions = () => {
    return this.props.siteFilter.values.map((val) => ({
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
    const text = `${this.state.selectedValue}`;
    const label =
      this.props.siteFilter.field.charAt(0).toUpperCase() +
      this.props.siteFilter.field.slice(1);
    return (
      <div className="form-group">
        <label id={`${this.props.siteFilter.field}-label`}>{label}</label>
        <Dropdown
          text={text}
          selection
          options={this.valueOptions()}
          onChange={this.updateFilter}
          id={this.props.siteFilter.field}
          aria-labelledby={`${this.props.siteFilter.field}-label`}
          aria-haspopup="listbox"
        />
      </div>
    );
  }
}

export default FilterDropdown;
