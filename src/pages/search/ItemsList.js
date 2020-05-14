import React, { Component } from "react";
import ItemListView from "./ItemListView";
import GalleryView from "./GalleryView";
import { getDataType } from "../../lib/MetadataRenderer";
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
      <div className="search-results-section">
        <div className={this.getClassName()}>
          {this.props.items.map(item => {
            if (this.props.view === "Gallery") {
              return (
                <GalleryView
                  key={item.id}
                  item={item}
                  dataType={getDataType(item)}
                  label={true}
                />
              );
            } else if (this.props.view === "Masonry") {
              return (
                <MasonryView
                  key={item.id}
                  item={item}
                  dataType={getDataType(item)}
                  label={true}
                />
              );
            } else {
              return (
                <ItemListView
                  key={item.id}
                  item={item}
                  dataType={getDataType(item)}
                  label={true}
                />
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default ItemsList;
