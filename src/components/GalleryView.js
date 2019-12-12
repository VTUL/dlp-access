import React from "react";
import { NavLink } from "react-router-dom";
import { arkLinkFormatted } from "../shared/TextFormatTools";
import ItemThumbnail from "../components/ItemThumbnail";
import "../css/SearchResult.css";

const GalleryView = ({ archive }) => {
  return (
    <div className="document col-12 col-sm-6 col-md-4 col-lg-3">
      <ItemThumbnail archive={archive} />
      <h3>
        <NavLink to={`/item/${arkLinkFormatted(archive.custom_key)}`}>
          {archive.title}
        </NavLink>
      </h3>
    </div>
  );
};

export default GalleryView;
