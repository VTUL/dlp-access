import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import qs from "query-string";

class SearchBar extends Component {
  state = {
    view: this.props.view,
    dataType: this.props.dataType,
    searchField: this.props.searchField,
    q: this.props.q
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

  render() {
    return (
      <div>
        <div className="input-group">
          <input
            className="form-control"
            value={this.state.q}
            type="text"
            placeholder="Search by title, creator, or description"
            onChange={this.updateQuery}
            onKeyPress={this.onKeyPress}
          />
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
