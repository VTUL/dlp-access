import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import { labelAttr } from "../lib/MetadataRenderer";

import "../css/searchBar.css";

class SearchBar extends Component {
  state = {
    field: this.props.field,
    q: this.props.q
  };

  fields = ["title", "description"];

  fieldOptions = () => {
    return this.fields.map(field => (
      <option value={field} key={field}>
        {labelAttr(field)}
      </option>
    ));
  };

  updateQuery = e => {
    this.setState({ q: e.target.value });
  };

  updateSearchField = e => {
    this.setState({ field: e.target.value });
  };

  onKeyPress = e => {
    if (e.which === 13) {
      this.submit();
    }
  };

  submit = () => {
    const parsedObject = {
      field: this.state.field,
      q: this.state.q,
      view: this.props.view,
      ...this.props.filters
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
        if (typeof this.props.setPage === "function") {
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
        field: this.props.field
      });
    }
  }

  searchBox = () => {
    return (
      <input
        className="form-control"
        value={this.state.q || ""}
        type="text"
        placeholder="Search by title or description"
        onChange={this.updateQuery}
        onKeyPress={this.onKeyPress}
      />
    );
  };

  render() {
    return (
      <div>
        <div className="searchbar-wrapper">
          {this.searchBox()}
          <select
            value={this.state.field}
            name="fieldOptions"
            id="field-options"
            onChange={this.updateSearchField}
            className="custom-select"
          >
            {this.fieldOptions()}
          </select>
          <button className="btn" type="submit" onClick={this.submit}>
            <div>
              <i className="fas fa-search"></i>
            </div>
          </button>
        </div>
      </div>
    );
  }
}
export default withRouter(SearchBar);
