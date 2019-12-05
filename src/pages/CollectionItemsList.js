import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { arkLinkFormatted } from "../shared/TextFormatTools";

import "../css/CollectionsShowPage.css";

class CollectionItemsList extends Component {
  render() {
    let retVal = null;
    if (this.props.items.length) {
      retVal = (
        <div className="collection-items-list">
          <h3>Works ({this.props.items.length})</h3>
          <table>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {this.props.items.map(item => (
                <tr key={item.custom_key}>
                  <td className="item-image">
                    <img src={item.thumbnail_path} alt={item.title} />
                  </td>
                  <td className="item-info">
                    <div className="item-link-wrapper">
                      <NavLink
                        to={`/item/${arkLinkFormatted(item.custom_key)}`}
                      >
                        {item.title}
                      </NavLink>
                    </div>
                    <div className="collection-link-wrapper">
                      Is part of:{" "}
                      <NavLink
                        to={`/collection/${arkLinkFormatted(
                          this.props.collection.custom_key
                        )}`}
                      >
                        {this.props.collection.title}
                      </NavLink>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      retVal = <div></div>;
    }
    return retVal;
  }
}

export default CollectionItemsList;
