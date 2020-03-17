import React, { Component } from "react";

import "../../css/FeaturedStaticImage.css";

class FeaturedStaticImage extends Component {
  render() {
    if (this.props.staticImage) {
      return (
        <div className="row home-static-image-wrapper">
          <img
            src={this.props.staticImage.src}
            alt={this.props.staticImage.altText}
          />
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default FeaturedStaticImage;
