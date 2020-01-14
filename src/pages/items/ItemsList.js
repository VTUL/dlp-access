import React from "react";
import { ListView } from "./ListView";
import { GalleryView } from "./GalleryView";
import { MasonryView } from "./MasonryView";

export const ItemsList = ({ items = [], view = "List" }) => {
  return (
    <div className="search-results">
      <div className="row justify-content-center">
        {items.map(item => {
          if (view === "Gallery") {
            return <GalleryView archive={item} key={item.id} />;
          } else if (view === "Masonry") {
            return <MasonryView archive={item} key={item.id} />;
          } else {
            return <ListView archive={item} key={item.id} />;
          }
        })}
      </div>
    </div>
  );
};
