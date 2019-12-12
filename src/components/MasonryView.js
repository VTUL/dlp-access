import React from "react";
import ItemThumbnail from "../components/ItemThumbnail";
import "../css/SearchResult.css";

const MasonryView = ({ archive }) => {
  return (
    <div className="document col-12 col-sm-6 col-md-4 col-lg-3">
      <ItemThumbnail archive={archive} />
    </div>
  );
};

export default MasonryView;
