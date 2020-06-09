import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { arkLinkFormatted } from "../lib/MetadataRenderer";

import "../css/Thumbnail.css";

class Thumbnail extends Component {
  labelDisplay() {
    if (this.props.label) {
      return (
        <div className={`${this.props.category}-label`}>
          {this.props.category === "collection" ? "Collection" : "Item"}
        </div>
      );
    } else {
      return <></>;
    }
  }

  render() {
    return (
      <div className="image-container">
        {this.labelDisplay()}
        <NavLink
          to={`/${this.props.category}/${arkLinkFormatted(
            this.props.item.custom_key
          )}`}
        >
          <img
            className={this.props.className}
            src={this.props.item.thumbnail_path}
            alt={this.props.item.title}
          />
        </NavLink>
      </div>
    );
  }
}

export default Thumbnail;
