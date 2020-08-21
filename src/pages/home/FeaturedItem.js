import React, { Component } from "react";

class FeaturedItem extends Component {
  render() {
    return (
      <div
        className="col-md-6 col-lg-3"
        role="group"
        aria-roledescription="slide"
        aria-label={`${this.props.position} of ${this.props.length}`}
      >
        <a href={this.props.tile.link}>
          <div className="card">
            <img
              className="card-img-top"
              src={this.props.tile.src}
              alt={this.props.tile.altText}
            />
            <div className="card-body">
              <h3 className="card-title crop-text-4">
                {this.props.tile.cardTitle}
              </h3>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default FeaturedItem;
