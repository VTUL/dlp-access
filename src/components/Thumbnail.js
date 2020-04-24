import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { arkLinkFormatted } from "../lib/MetadataRenderer";

class Thumbnail extends Component {
  render() {
    return (
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
      </NavLink>
    );
  }
}

export default Thumbnail;
