import React, { Component } from "react";
import { ArchiveListView } from "./ArchiveListView";
import { CollectionListView } from "./CollectionListView";
import { GalleryView } from "./GalleryView";
import { MasonryView } from "./MasonryView";

class ItemsList extends Component {
  getClassName() {
    if (this.props.view === "Masonry") {
      return "card-columns";
    } else {
      return "row justify-content-center";
    }
  }

  render() {
    return (
      <div className="search-results">
        <div className={this.getClassName()}>
          {this.props.items.map(item => {
            if (this.props.view === "Gallery") {
              return (
                <GalleryView
                  key={item.id}
                  item={item}
                  dataType={this.props.dataType}
                />
              );
            } else if (this.props.view === "Masonry") {
              return (
                <MasonryView
                  key={item.id}
                  item={item}
                  dataType={this.props.dataType}
                />
              );
            } else {
              if (this.props.dataType === "collection") {
                return <CollectionListView key={item.id} collection={item} />;
              } else {
                return <ArchiveListView key={item.id} archive={item} />;
              }
            }
          })}
        </div>
      </div>
    );
  }
}

export default ItemsList;
