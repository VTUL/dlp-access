import React from "react";
import { NavLink } from "react-router-dom";
import { arkLinkFormatted } from "../shared/TextFormatTools";

const ItemThumbnail = ({ archive }) => {
  return (
    <NavLink to={`/item/${arkLinkFormatted(archive.custom_key)}`}>
      <img src={archive.thumbnail_path} alt={archive.title} />
    </NavLink>
  );
};

export default ItemThumbnail;
