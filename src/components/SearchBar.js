import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import qs from "query-string";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      search_field: "title",
      q: ""
    };
  }

  handleChange(field, event) {
    this.setState({
      search_field: field,
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
        this.props.history.push({
          pathname: "/items"
        });
      } else {
        this.props.history.push({
          pathname: "/search",
          search: `?${qs.stringify(parsedObject)}`,
          state: {
            view: this.props.view
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          placeholder="Search Items"
          onChange={event => {
            this.handleChange("title", event);
          }}
          onKeyPress={this.onKeyPress}
        />
        <button className="btn btn-primary" onClick={this.submit}>
          GO
        </button>
      </div>
    );
  }
}
export default withRouter(SearchBar);
