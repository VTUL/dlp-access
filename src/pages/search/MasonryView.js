import React from "react";
import { Thumbnail } from "../../components/Thumbnail";
import "../../css/SearchResult.css";

export const MasonryView = ({ item, dataType }) => {
  return (
    <div className="document col-12 col-sm-6 col-md-4 col-lg-3 d-table">
      <div className="d-table-cell align-middle">
        <Thumbnail item={item} dataType={dataType} />
      </div>
    </div>
  );
};
