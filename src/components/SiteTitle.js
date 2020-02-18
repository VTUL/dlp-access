import React, { Component } from "react";
import { Helmet } from "react-helmet";

class SiteTitle extends Component {
  buildTitle() {
    const pageTitle =
      this.props.pageTitle !== null ? `| ${this.props.pageTitle}` : "";
    return `${this.props.siteTitle} ${pageTitle}`;
  }

  render() {
    return (
      <Helmet>
        <title>{this.buildTitle()}</title>
      </Helmet>
    );
  }
}

SiteTitle.defaultProps = {
  pageTitle: null,
  siteTitle: "VTDLP"
};

export default SiteTitle;
