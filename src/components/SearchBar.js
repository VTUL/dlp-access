import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import qs from "query-string";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    const defaultSearchField = "title";
    this.state = {
      search_field: defaultSearchField,
      q: ""
    };
  }

  handleChange(field, event) {
    this.setState({
      search_field: field || this.state.defaultSearchField,
      q: event.target.value
    });
  }

  onKeyPress = e => {
    if (e.which === 13) {
      this.submit();
    }
  };

  async submit() {
    const parsedObject = this.state;
    const queryValue = parsedObject.q;
    try {
      if (queryValue === "") {
        this.props.history.push("/items");
      } else {
        this.props.history.push({
          pathname: "/search",
          search: `?${qs.stringify(parsedObject)}`
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <div class="input-group">
        <input
          class="form-control"
          type="text"
          placeholder="Search Items"
          onChange={event => {
            this.handleChange("title", event);
          }}
          onKeyPress={this.onKeyPress}
        />
        <button class="btn btn-primary" onClick={this.submit}>
          GO
        </button>
      </div>
    );
  }
}
export default withRouter(SearchBar);
