import React from "react";
import Thumbnail from "../../components/Thumbnail";
import "../../css/SearchResult.css";

export const MasonryView = ({ item, dataType, label }) => {
  return (
    <div className="masonry">
      <div className="card border-0">
        <Thumbnail
          item={item}
          dataType={dataType}
          label={label}
          className="card-img"
        />
      </div>
    </div>
  );
};
