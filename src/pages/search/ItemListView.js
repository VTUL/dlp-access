import React from "react";
import { RenderItems, titleFormatted } from "../../lib/MetadataRenderer";
import { Thumbnail } from "../../components/Thumbnail";
import "../../css/SearchResult.css";

export const ItemListView = ({ item, dataType }) => {
  const keyArray = [
    "identifier",
    "description",
    "date",
    "source",
    "language",
    "creator",
    "resource_type",
    "medium",
    "belongs_to",
    "tags",
    "related_url"
  ];
  return (
    <li key={item.id} className="collection-entry">
      {titleFormatted(item, dataType)}
      <span className="collection-img">
        <Thumbnail item={item} dataType={dataType} />
      </span>
      <div className="collection-details">
        <RenderItems keyArray={keyArray} item={item} />
      </div>
    </li>
  );
};
