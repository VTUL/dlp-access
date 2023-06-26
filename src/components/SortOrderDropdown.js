import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

class SortOrderDropdown extends Component {
  setSortOrder = (event, result) => {
    if (typeof this.props.setSortOrder === "function") {
      this.props.setSortOrder(event, result);
    }
  };

  render() {
    const options = [
      {
        key: "asc",
        text: "Oldest to Newest",
        value: "asc"
      },
      {
        key: "desc",
        text: "Newest to Oldest",
        value: "desc"
      }
    ];
    const placeholder = "Sort order";
    return (
      <Dropdown
        placeholder={placeholder}
        compact
        selection
        options={options}
        onChange={this.setSortOrder}
        aria-label="Sort order dropdown"
        aria-haspopup="listbox"
      />
    );
  }
}

export default SortOrderDropdown;
