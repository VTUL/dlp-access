import React, { Component } from "react";
import FileGetter from "../../lib/FileGetter";
import "../../css/FeaturedStaticImage.scss";

class FeaturedStaticImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      featuredStatic: null
    };
    this.fileGetter = null;
  }

  getStaticImage = async () => {
    const imgUrl = this.props.staticImage.src.split("/").pop();
    this.fileGetter = new FileGetter();
    await this.fileGetter.getFile(
      imgUrl,
      "image",
      this,
      "featuredStatic",
      this.props?.site?.siteId,
      "public/sitecontent"
    );
    this.fileGetter = null;
    this.props.staticImgLoaded();
  };

  componentDidUpdate(prevProps) {
    if (this.props.staticImage.src !== prevProps.staticImage.src) {
      this.getStaticImage();
    }
  }

  componentDidMount() {
    if (this.props.staticImage) {
      this.getStaticImage();
    }
  }

  render() {
    if (this.props.staticImage && this.state.featuredStatic) {
      return (
        <div className="home-static-image-wrapper">
          <img
            src={this.state.featuredStatic}
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
