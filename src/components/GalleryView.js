import React from "react";
import { NavLink } from "react-router-dom";
import { arkLinkFormatted } from "../lib/MetadataRenderer";
import { Thumbnail } from "./Thumbnail";
import { cleanHTML } from "../lib/MetadataRenderer";
import "../css/SearchResult.scss";

const GalleryView = (props) => {
  const getPageCount = () => {
    if (props.item?.archiveOptions) {
      const { page_count } = JSON.parse(props.item.archiveOptions);
      return parseInt(page_count) || 0;
    }
    return 0;
  };

  const itemPageCnt = getPageCount();

  return (
    <div className="col-md-6 col-lg-4 gallery-item">
      <div className="card">
        <NavLink
          to={`/${props.category}/${arkLinkFormatted(props.item.custom_key)}`}
        >
          <Thumbnail
            item={props.item}
            category={props.category}
            className="card-img-top"
            site={props.site}
          />
        </NavLink>
        <div className="card-body">
          <NavLink
            to={`/${props.category}/${arkLinkFormatted(props.item.custom_key)}`}
          >
            <h3 className="card-title crop-text-3">{props.item.title}</h3>
          </NavLink>
          <p className={`card-text crop-text-${itemPageCnt > 0 ? "2" : "3"}`}>
            {cleanHTML(
              props.item?.description?.length ? props.item.description[0] : "",
              "html"
            )}
          </p>
          {itemPageCnt > 0 && (
            <div className="badge badge-secondary page-count-badge">
              {itemPageCnt} page(s)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryView;
