import React from "react";
import { titleFormatted } from "../../shared/TextFormatTools";
import { FormattedAttr } from "../../shared/TextFormatTools";
import { Thumbnail } from "../../components/Thumbnail";
import "../../css/SearchResult.css";

export const CollectionListView = ({ collection }) => {
  return (
    <div className="row search-result-wrapper">
      <div className="col-sm-12 title-wrapper">
        {titleFormatted(collection, "collection")}
      </div>
      <div className="col-md-4 col-sm-4 my-auto">
        <Thumbnail item={collection} dataType="collection" />
      </div>
      <div className="col-md-8 col-sm-8">
        <FormattedAttr item={collection} attribute="identifier" />
        <FormattedAttr item={collection} attribute="description" />
        <FormattedAttr item={collection} attribute="date" />
        <FormattedAttr item={collection} attribute="source" />
        <FormattedAttr item={collection} attribute="language" />
        <FormattedAttr item={collection} attribute="creator" />
      </div>
    </div>
  );
};
