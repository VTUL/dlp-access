import React, { Component } from "react";

import "../../css/MultimediaSection.css";

class MultimediaSection extends Component {
  render() {
    if (this.props.mediaSection) {
      return (
        <div className="row media-section-wrapper">
          <div className="col-lg-6">
            <div
              className="multimedia-column"
              dangerouslySetInnerHTML={{
                __html: this.props.mediaSection.mediaEmbed
              }}
            ></div>
          </div>
          <div className="col-lg-6">
            <div className="multimedia-text-column">
              <div className="media-section-title-wrapper">
                <h1>{this.props.mediaSection.title}</h1>
              </div>
              <div className="media-section-divider"></div>
              <p className="media-section-text">
                {this.props.mediaSection.text}
              </p>
              <form action={this.props.mediaSection.link}>
                <button type="submit">Learn More</button>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default MultimediaSection;
