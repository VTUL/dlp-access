import React from "react";
import { NavLink } from "react-router-dom";
import { arkLinkFormatted } from "../shared/MetadataRenderer";

export const Thumbnail = ({ item, dataType }) => {
  return (
    <NavLink to={`/${dataType}/${arkLinkFormatted(item.custom_key)}`}>
      <img
        className="img-fluid mx-auto d-block"
        src={item.thumbnail_path}
        alt={item.title}
      />
    </NavLink>
  );
};
