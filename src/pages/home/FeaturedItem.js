import React, { Component } from "react";

class FeaturedItem extends Component {
  render() {
    return (
      <div className="col-md-6 col-lg-3">
        <a href={this.props.tile.link}>
          <div className="card">
            <img
              className="card-img-top"
              src={this.props.tile.src}
              alt={this.props.tile.altText}
            />
            <div className="card-body">
              <h4 className="card-title crop-text-4">
                {this.props.tile.cardTitle}
              </h4>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default FeaturedItem;
