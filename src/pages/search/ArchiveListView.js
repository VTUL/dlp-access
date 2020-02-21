import React from "react";
import { titleFormatted } from "../../shared/TextFormatTools";
import { FormattedAttr } from "../../shared/TextFormatTools";
import { Thumbnail } from "../../components/Thumbnail";
import "../../css/SearchResult.css";

export const ArchiveListView = ({ archive }) => {
  return (
    <div className="row search-result-wrapper">
      <div className="col-sm-12 title-wrapper">
        {titleFormatted(archive, "archive")}
      </div>
      <div className="col-md-4 col-sm-4 my-auto">
        <Thumbnail item={archive} dataType="archive" />
      </div>
      <div className="col-md-8 col-sm-8">
        <FormattedAttr item={archive} attribute="identifier" />
        <FormattedAttr item={archive} attribute="date" />
        <FormattedAttr item={archive} attribute="resource_type" />
        <FormattedAttr item={archive} attribute="medium" />
        <FormattedAttr item={archive} attribute="source" />
        <FormattedAttr item={archive} attribute="belongs_to" />
        <FormattedAttr item={archive} attribute="tags" />
        <FormattedAttr item={archive} attribute="creator" />
      </div>
    </div>
  );
};
