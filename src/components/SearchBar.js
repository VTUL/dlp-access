import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import { labelAttr } from "../lib/MetadataRenderer";

class SearchBar extends Component {
  state = {
    view: this.props.view,
    dataType: this.props.dataType,
    searchField: this.props.searchField,
    q: this.props.q,
    dateRange: this.props.dateRange
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
      this.setState({ searchByDate: true });
    } else {
      this.setState({ searchByDate: false });
    }
    this.setState({ searchField: e.target.value });
  };

  updateSearchType = e => {
    this.setState({ dataType: e.target.value });
  };

  updateDateRange = e => {
    this.setState({ dateRange: e.target.value });
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
      date_range: this.state.dateRange,
      view: this.props.view
    };
    try {
      this.props.history.push({
        pathname: "/search",
        search: `?${qs.stringify(parsedObject)}`,
        state: parsedObject
      });
      this.props.setPage(0);
    } catch (err) {
      console.error(err);
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        q: this.props.q,
        searchField: this.props.searchField,
        dataType: this.props.dataType
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
        value={this.state.dateRange}
        name="dateRangeOptions"
        id="date-range-options"
        onChange={this.updateDateRange}
      >
        {this.dateRangeOptions()}
      </select>
    );
  };

  render() {
    return (
      <div>
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
          <button className="btn btn-primary" onClick={this.submit}>
            GO
          </button>
        </div>
        <div>
          <div className="form-check-inline">
            <label className="form-check-label" htmlFor="radio-archive">
              <input
                type="radio"
                className="form-check-input"
                id="radio-archive"
                value="archive"
                checked={this.state.dataType === "archive"}
                onChange={this.updateSearchType}
              />
              Archives
            </label>
          </div>
          <div className="form-check-inline">
            <label className="form-check-label" htmlFor="radio-collections">
              <input
                type="radio"
                className="form-check-input"
                id="radio-collections"
                value="collection"
                checked={this.state.dataType === "collection"}
                onChange={this.updateSearchType}
              />
              Collections
            </label>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(SearchBar);
