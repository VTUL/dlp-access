import React from "react";
import { NavLink } from "react-router-dom";
import { arkLinkFormatted } from "../shared/TextFormatTools";
import ItemThumbnail from "../components/ItemThumbnail";
import "../css/SearchResult.css";

const GalleryView = ({ archive }) => {
  return (
    <div className="document col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card text-center">
        <ItemThumbnail archive={archive} />
        <div className="card-body">
          <h5 className="card-title">
            <NavLink to={`/item/${arkLinkFormatted(archive.custom_key)}`}>
              {archive.title}
            </NavLink>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default GalleryView;
