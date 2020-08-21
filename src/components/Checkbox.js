import React, { Component } from "react";

class Checkbox extends Component {
  handleCheck = (field, value) => {
    if (
      field === "format" ||
      field === "medium" ||
      field === "resource_type" ||
      field === "tags"
    ) {
      if (value) {
        return "mixed";
      } else {
        return value;
      }
    } else {
      return value;
    }
  };

  render() {
    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name={this.props.name}
          checked={this.props.selected}
          aria-checked={this.handleCheck(
            this.props.filter,
            this.props.selected
          )}
          onChange={this.props.onCheckboxChange}
          data-cy="input-filter-checkbox"
          id={this.props.name}
          aria-labelledby={`${this.props.name}-label`}
        />
        <label htmlFor={this.props.name} id={`${this.props.name}-label`}>
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default Checkbox;
