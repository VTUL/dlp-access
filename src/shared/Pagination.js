import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "../css/CollectionsListPage.css";

class Pagination extends Component {
  numberOfPages() {
    return Math.ceil(this.props.collections.length / this.props.limit);
  }

  listItems() {
    const numPages = this.numberOfPages();
    if (numPages <= 1) {
      return <li></li>;
    } else {
      let items = [];
      for (var i = 0; i < numPages; i++) {
        items.push(
          <li key={i + 1}>
            <NavLink to={`/collections/${i + 1}/${this.props.limit}`}>
              {i + 1}
            </NavLink>
          </li>
        );
      }
      return items;
    }
  }

  render() {
    return (
      <div id="pagination-list-wrapper">
        <ul>{this.listItems()}</ul>
      </div>
    );
  }
}

export default Pagination;
