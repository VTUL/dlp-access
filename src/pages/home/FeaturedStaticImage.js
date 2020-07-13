import React, { Component } from "react";

import "../../css/FeaturedStaticImage.css";

class FeaturedStaticImage extends Component {
  render() {
    if (this.props.staticImage) {
      return (
        <div className="home-static-image-wrapper">
          <a href="/">
            <img
              src={this.props.staticImage.src}
              alt={this.props.staticImage.altText}
            />
          </a>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default FeaturedStaticImage;
