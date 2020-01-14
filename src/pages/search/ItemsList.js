import React from "react";
import { ArchiveListView } from "./ArchiveListView";
import { CollectionListView } from "./CollectionListView";
import { GalleryView } from "./GalleryView";
import { MasonryView } from "./MasonryView";

export const ItemsList = ({
  items = [],
  dataType = "archive",
  view = "List"
}) => {
  return (
    <div className="search-results">
      <div className="row justify-content-center">
        {items.map(item => {
          if (view === "Gallery") {
            return (
              <GalleryView key={item.id} item={item} dataType={dataType} />
            );
          } else if (view === "Masonry") {
            return (
              <MasonryView key={item.id} item={item} dataType={dataType} />
            );
          } else {
            if (dataType === "collection") {
              return <CollectionListView key={item.id} collection={item} />;
            } else {
              return <ArchiveListView key={item.id} archive={item} />;
            }
          }
        })}
      </div>
    </div>
  );
};
