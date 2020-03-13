import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Thumbnail } from "../../components/Thumbnail";
import { arkLinkFormatted } from "../../lib/MetadataRenderer";

import "../../css/CollectionsShowPage.css";

class CollectionItemsList extends Component {
  render() {
    let retVal = null;
    if (this.props.items.length) {
      retVal = (
        <div className="collection-items-list">
          <table className="table table-striped">
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
                    <Thumbnail item={item} dataType="archive" />
                  </td>
                  <td className="item-info">
                    <div className="item-link-wrapper">
                      <NavLink
                        to={`/archive/${arkLinkFormatted(item.custom_key)}`}
                      >
                        {item.title}
                      </NavLink>
                    </div>
                    <div className="collection-link-wrapper">
                      Identifier:{" "}
                      <NavLink
                        to={`/archive/${arkLinkFormatted(item.custom_key)}`}
                      >
                        {item.identifier}
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
