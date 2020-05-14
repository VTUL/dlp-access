import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import { labelAttr } from "../lib/MetadataRenderer";

import "../css/searchBar.css";

class SearchBar extends Component {
  state = {
    view: this.props.view,
    dataType: null,
    searchField: this.props.searchField,
    q: this.props.q
  };

  searchFields = [
    "title",
    "creator",
    "description",
    "belongs_to",
    "language",
    "medium",
    "resource_type",
    "tags",
    "date"
  ];

  dateRanges = [
    ["1920", "1939"],
    ["1940", "1959"],
    ["1960", "1979"],
    ["1980", "1999"],
    ["2000", "2019"]
  ];

  fieldOptions = () => {
    return this.searchFields.map(field => (
      <option value={field} key={field}>
        {labelAttr(field)}
      </option>
    ));
  };

  date = dateRange => {
    return `${dateRange[0]} - ${dateRange[1]}`;
  };

  dateRangeOptions = () => {
    return this.dateRanges.map(dateRange => (
      <option value={this.date(dateRange)} key={this.date(dateRange)}>
        {this.date(dateRange)}
      </option>
    ));
  };

  updateQuery = e => {
    this.setState({ q: e.target.value });
  };

  updateSearchField = e => {
    if (e.target.value === "date") {
      this.setState({ q: this.date(this.dateRanges[0]) });
    } else {
      this.setState({ q: "" });
    }
    this.setState({ searchField: e.target.value });
  };

  updateSearchType = e => {
    this.setState({ dataType: e.target.value });
  };

  onKeyPress = e => {
    if (e.which === 13) {
      this.submit();
    }
  };

  submit = () => {
    const parsedObject = {
      data_type: this.state.dataType,
      search_field: this.state.searchField,
      q: this.state.q,
      view: this.props.view
    };
    try {
      if (window.location.pathname === "/") {
        window.location.href = `/search?${qs.stringify(parsedObject)}`;
      } else {
        this.props.history.push({
          pathname: "/search",
          search: `?${qs.stringify(parsedObject)}`,
          state: parsedObject
        });
        if (typeof this.props.setPage == "function") {
          this.props.setPage(0);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        q: this.props.q,
        searchField: this.props.searchField
      });
    }
  }

  searchBox = () => {
    return (
      <input
        className="form-control"
        value={this.state.q}
        type="text"
        placeholder="Search by title, creator, or description"
        onChange={this.updateQuery}
        onKeyPress={this.onKeyPress}
      />
    );
  };

  dateDropDown = () => {
    return (
      <select
        className="form-control"
        value={this.state.q}
        name="dateRangeOptions"
        id="date-range-options"
        onChange={this.updateQuery}
      >
        {this.dateRangeOptions()}
      </select>
    );
  };

  render() {
    return (
      <div>
        <div className="searchbar-wrapper">
          <div className="input-group">
            {this.state.searchField === "date"
              ? this.dateDropDown()
              : this.searchBox()}
            <select
              value={this.state.searchField}
              name="fieldOptions"
              id="field-options"
              onChange={this.updateSearchField}
            >
              {this.fieldOptions()}
            </select>
            <button className="btn" type="submit" onClick={this.submit}>
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(SearchBar);
