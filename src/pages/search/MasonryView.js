import React from "react";
import { Thumbnail } from "../../components/Thumbnail";
import "../../css/SearchResult.css";

export const MasonryView = ({ item, dataType }) => {
  return (
    <div className="masonry">
      <div className="card border-0">
        <Thumbnail item={item} dataType={dataType} />
      </div>
    </div>
  );
};
