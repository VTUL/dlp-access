import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

class SortbyDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: `${this.props.siteSort[0].field} ${this.props.siteSort[0].direction}`
    };
  }

  formatField = field => {
    let name = field === "start_date" ? "Date" : field;
    let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    return capitalizedName;
  };

  formatDirection = (field, direction) => {
    if (field === "title" && direction === "asc") return "(A-Z)";
    else if (field === "title" && direction === "desc") return "(Z-A)";
    else if (field === "start_date" && direction === "desc")
      return "(Newest first)";
    else return undefined;
  };

  valueOptions = () => {
    return this.props.siteSort.map(val => ({
      key: `${val.field} ${val.direction}`,
      text: `${this.formatField(val.field)} ${this.formatDirection(
        val.field,
        val.direction
      )}`,
      value: `${val.field} ${val.direction}`
    }));
  };

  updateSort = (e, { value }) => {
    this.setState({ selectedValue: value });

    let opt_arr = value.split(" ");
    let sort = {
      field: opt_arr[0],
      direction: opt_arr[1]
    };
    this.props.updateFormState("sort", sort);
  };

  render() {
    let selectedOpt = this.state.selectedValue.split(" ");
    const text = `${this.formatField(selectedOpt[0])} ${this.formatDirection(
      selectedOpt[0],
      selectedOpt[1]
    )}`;
    return (
      <div className="form-group">
        <label id="sort-label">Sort by</label>
        <Dropdown
          text={text}
          selection
          options={this.valueOptions()}
          onChange={this.updateSort}
          aria-labelledby="sort-label"
          aria-haspopup="listbox"
        />
      </div>
    );
  }
}

export default SortbyDropdown;
