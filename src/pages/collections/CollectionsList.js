import React, { Component } from "react";
import { Thumbnail } from "../../components/Thumbnail";
import { titleFormatted } from "../../shared/TextFormatTools";
import { FormattedAttr } from "../../shared/TextFormatTools";
import "../../css/ListPages.css";

class CollectionsList extends Component {
  render() {
    return (
      <div>
        {this.props.collections.map(collection => (
          <li key={collection.id} className="collection-entry">
            {titleFormatted(collection, "collection")}
            <span className="collection-img">
              <Thumbnail item={collection} dataType="collection" />
            </span>
            <div className="collection-details">
              <FormattedAttr item={collection} attribute="identifier" />
              <FormattedAttr item={collection} attribute="description" />
              <FormattedAttr item={collection} attribute="date" />
              <FormattedAttr item={collection} attribute="source" />
              <FormattedAttr item={collection} attribute="language" />
              <FormattedAttr item={collection} attribute="creator" />
            </div>
          </li>
        ))}
      </div>
    );
  }
}

export default CollectionsList;
