import React from "react";
import Thumbnail from "../../components/Thumbnail";
import "../../css/SearchResult.css";

export const MasonryView = ({ item, category, label }) => {
  return (
    <div className="masonry">
      <div className="card border-0">
        <Thumbnail
          item={item}
          category={category}
          label={label}
          className="card-img"
        />
      </div>
    </div>
  );
};
