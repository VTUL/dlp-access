import React from "react";
import { NavLink } from "react-router-dom";
import { arkLinkFormatted } from "../../shared/TextFormatTools";
import { Thumbnail } from "../../components/Thumbnail";
import "../../css/SearchResult.css";

export const GalleryView = ({ item, dataType }) => {
  return (
    <div className="document col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card text-center">
        <Thumbnail item={item} dataType />
        <div className="card-body">
          <h5 className="card-title">
            <NavLink to={`/${dataType}/${arkLinkFormatted(item.custom_key)}`}>
              {item.title}
            </NavLink>
          </h5>
        </div>
      </div>
    </div>
  );
};
