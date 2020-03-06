import React, { Component } from "react";
import SiteTitle from "../components/SiteTitle";

class TermsPage extends Component {
  render() {
    return (
      <>
        <SiteTitle
          siteTitle={this.props.siteDetails.siteTitle}
          pageTitle="Terms"
        />
        <div
          className="terms-details"
          dangerouslySetInnerHTML={{ __html: this.props.siteDetails.termsCopy }}
        ></div>
      </>
    );
  }
}

export default TermsPage;
