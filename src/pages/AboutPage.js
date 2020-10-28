import React, { Component } from "react";
import SiteTitle from "../components/SiteTitle";
import ContactSection from "../components/ContactSection";
import { getFile } from "../lib/fetchTools";

import "../css/AboutPage.css";

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copy: ""
    };
  }

  componentDidMount() {
    const htmlUrl = this.props.siteDetails.sitePages[this.props.parentKey]
      .data_url;
    getFile(htmlUrl, "html", this);
  }

  render() {
    return (
      <div className="row about-page-wrapper">
        <div className="col-12 about-heading">
          <SiteTitle siteTitle={this.props.site.siteTitle} pageTitle="About" />
          <h1 id="about-heading">About {this.props.site.siteTitle}</h1>
        </div>
        <div className="col-md-8" role="region" aria-labelledby="about-heading">
          <div
            className="about-details"
            dangerouslySetInnerHTML={{ __html: this.state.copy }}
          ></div>
        </div>
        <div className="col-md-4 contact-section-wrapper">
          <ContactSection site={this.props.site} />
          {this.props.siteDetails.sitePages.terms ? (
            <a href="/permissions" className="about-terms-link">
              Permissions
            </a>
          ) : null}
        </div>
      </div>
    );
  }
}

export default AboutPage;
