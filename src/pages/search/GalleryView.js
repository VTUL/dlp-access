import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { arkLinkFormatted } from "../../lib/MetadataRenderer";
import Thumbnail from "../../components/Thumbnail";
import "../../css/SearchResult.css";

class GalleryView extends Component {
  constructor() {
    super();
    this.state = {
      className: "card-img-top"
    };
  }

  render() {
    return (
      <div className="col-md-6 col-lg-4 gallery-item">
        <NavLink
          to={`/${this.props.dataType}/${arkLinkFormatted(
            this.props.item.custom_key
          )}`}
        >
          <div className="card">
            <Thumbnail
              item={this.props.item}
              dataType={this.props.dataType}
              className={this.state.className}
            />
            <div className="card-body">
              <h5 className="card-title crop-text-3">
                {this.props.item.title}
              </h5>
              <p className="card-text crop-text-3">
                {this.props.item.description}
              </p>
            </div>
          </div>
        </NavLink>
      </div>
    );
  }
}

export default GalleryView;
