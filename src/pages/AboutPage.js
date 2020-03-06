import React, { Component } from "react";
import SiteTitle from "../components/SiteTitle";

class AboutPage extends Component {
  render() {
    return (
      <>
        <SiteTitle
          siteTitle={this.props.siteDetails.siteTitle}
          pageTitle="About"
        />
        <h1>About {this.props.siteDetails.siteTitle}</h1>
        <div
          className="about-details"
          dangerouslySetInnerHTML={{ __html: this.props.siteDetails.aboutCopy }}
        ></div>
      </>
    );
  }
}

export default AboutPage;
