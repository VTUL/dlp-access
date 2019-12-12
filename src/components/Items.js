import React from "react";
import ListView from "../components/ListView";
import GalleryView from "../components/GalleryView";
import MasonryView from "../components/MasonryView";

const Items = props => {
  return (
    <div className="search-results">
      <div className="row justify-content-center">
        {props.items.map(item => {
          if (props.view === "Gallery") {
            return <GalleryView archive={item} key={item.id} />;
          } else if (props.view === "Masonry") {
            return <MasonryView archive={item} key={item.id} />;
          } else {
            return <ListView archive={item} key={item.id} />;
          }
        })}
      </div>
    </div>
  );
};

export default Items;
