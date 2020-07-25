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

  renameDate = field => {
    return field === "start_date" ? "Recently Created" : field;
  };

  valueOptions = () => {
    return this.props.siteSort.map(val => ({
      key: `${val.field} ${val.direction}`,
      text: this.renameDate(val.field),
      value: `${val.field} ${val.direction}`,
      icon: val.direction === "asc" ? "caret up" : "caret down"
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
    const text = `Sort by: ${this.renameDate(selectedOpt[0])}`;
    const icon = selectedOpt[1] === "asc" ? "caret up" : "caret down";
    return (
      <div className="btn-group mr-2">
        <Dropdown
          text={text}
          selection
          icon={icon}
          options={this.valueOptions()}
          onChange={this.updateSort}
        />
      </div>
    );
  }
}

export default SortbyDropdown;
