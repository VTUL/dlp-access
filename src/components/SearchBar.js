import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import qs from "query-string";

class SearchBar extends Component {
  state = {
    view: this.props.view,
    dateType: this.props.dataType,
    searchField: this.props.searchField,
    q: ""
  };

  searchFields = ["title", "creator", "description"];

  fieldOptions = () => {
    return this.searchFields.map(field => (
      <option value={field} key={field}>
        {field}
      </option>
    ));
  };

  updateQuery = e => {
    this.setState({ q: e.target.value });
  };

  updateSearchField = e => {
    this.props.updateFormState("searchField", e.target.value);
  };

  updateSearchType = e => {
    this.props.updateFormState("dataType", e.target.value);
  };

  onKeyPress = e => {
    if (e.which === 13) {
      this.submit();
    }
  };

  submit = () => {
    const pathname = "/" + this.props.dataType;
    const parsedObject = {
      search_field: this.props.searchField,
      q: this.state.q,
      view: this.props.view
    };
    const queryValue = parsedObject.q;
    try {
      if (queryValue === "") {
        this.props.history.push({
          pathname: pathname
        });
      } else {
        this.props.history.push({
          pathname: pathname,
          search: `?${qs.stringify(parsedObject)}`,
          state: parsedObject
        });
      }
      this.props.setPage(0);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div>
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Search by title, creator, or description"
            onChange={this.updateQuery}
            onKeyPress={this.onKeyPress}
          />
          <select
            defaultValue={this.props.searchField}
            name="fieldOptions"
            id="field-options"
            onChange={this.updateSearchField}
          >
            {this.fieldOptions()}
          </select>
          <button className="btn btn-primary" onClick={this.submit}>
            GO
          </button>
        </div>
        <div>
          <div className="form-check-inline">
            <label className="form-check-label" htmlFor="radio-items">
              <input
                type="radio"
                className="form-check-input"
                id="radio-items"
                value="items"
                checked={this.props.dataType === "items"}
                onChange={this.updateSearchType}
              />
              Just Items
            </label>
          </div>
          <div className="form-check-inline">
            <label className="form-check-label" htmlFor="radio-collections">
              <input
                type="radio"
                className="form-check-input"
                id="radio-collections"
                value="collections"
                checked={this.props.dataType === "collections"}
                onChange={this.updateSearchType}
              />
              Just Collections
            </label>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(SearchBar);
