import React, { Component } from "react";
import Thumbnail from "../../components/Thumbnail";
import { arkLinkFormatted } from "../../lib/MetadataRenderer";

import "../../css/CollectionsShowPage.css";

class CollectionItemsList extends Component {
  render() {
    let retVal = null;
    if (this.props.items.length) {
      retVal = (
        <div className="collection-items-grid">
          {this.props.items.map(item => (
            <div className="collection-item" key={item.custom_key}>
              <div className="item-image">
                <Thumbnail item={item} category="archive" />
              </div>
              <div className="item-info">
                <div className="item-link-wrapper">
                  <a href={`/archive/${arkLinkFormatted(item.custom_key)}`}>
                    {item.title}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      retVal = <div></div>;
    }
    return retVal;
  }
}

export default CollectionItemsList;
