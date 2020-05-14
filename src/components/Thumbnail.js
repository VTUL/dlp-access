import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { arkLinkFormatted } from "../lib/MetadataRenderer";

import "../css/Thumbnail.css";

class Thumbnail extends Component {
  labelDisplay() {
    if (this.props.label) {
      return (
        <div className={`${this.props.dataType}-label`}>
          {this.props.dataType === "collection" ? "Collection" : "Item"}
        </div>
      );
    } else {
      return <></>;
    }
  }

  render() {
    return (
      <div className="image-container">
        <NavLink
          to={`/${this.props.dataType}/${arkLinkFormatted(
            this.props.item.custom_key
          )}`}
        >
          <img
            className={this.props.className}
            src={this.props.item.thumbnail_path}
            alt={this.props.item.title}
          />
          {this.labelDisplay()}
        </NavLink>
      </div>
    );
  }
}

export default Thumbnail;
