import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { arkLinkFormatted } from "../../lib/MetadataRenderer";
import Thumbnail from "../../components/Thumbnail";
import "../../css/SearchResult.css";

class GalleryView extends Component {
  render() {
    return (
      <div className="col-md-6 col-lg-4 gallery-item">
        <div className="card">
          <Thumbnail
            item={this.props.item}
            dataType={this.props.dataType}
            className="card-img-top"
          />
          <div className="card-body">
            <NavLink
              to={`/${this.props.dataType}/${arkLinkFormatted(
                this.props.item.custom_key
              )}`}
            >
              <h5 className="card-title crop-text-3">
                {this.props.item.title}
              </h5>
              <p className="card-text crop-text-3">
                {this.props.item.description}
              </p>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default GalleryView;
