import React, { Component } from "react";
import SiteTitle from "../components/SiteTitle";
import { getHTML } from "../lib/fetch_tools";

class TermsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copy: ""
    };
  }

  componentDidMount() {
    getHTML(this.props.siteDetails.termsCopy, this);
  }

  render() {
    return (
      <>
        <SiteTitle
          siteTitle={this.props.siteDetails.siteTitle}
          pageTitle="Terms"
        />
        <div
          className="terms-details"
          dangerouslySetInnerHTML={{ __html: this.state.copy }}
        ></div>
      </>
    );
  }
}

export default TermsPage;
