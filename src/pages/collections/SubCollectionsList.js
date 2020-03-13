import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "../../css/CollectionsShowPage.css";
import { arkLinkFormatted } from "../../lib/MetadataRenderer";

class SubCollectionsList extends Component {
  subCollectionsContent(items) {
    let content = "";
    if (items.length) {
      content = (
        <div>
          <h3>Subcollections ({items.length})</h3>
          <ul className="subCollectionList">
            {items.map(item => (
              <li key={item.custom_key}>
                <NavLink
                  to={`/collection/${arkLinkFormatted(item.custom_key)}`}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return content;
  }

  render() {
    return (
      <div>{this.subCollectionsContent(this.props.subCollections.items)}</div>
    );
  }
}

export default SubCollectionsList;
