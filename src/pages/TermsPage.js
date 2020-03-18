import React, { Component } from "react";
import SiteTitle from "../components/SiteTitle";
import { fetchCopyHTML } from "../lib/fetch_tools";

class TermsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copy: ""
    };
  }

  componentDidMount() {
    let termsCopy = null;
    try {
      if (this.props.siteDetails.termsCopy.type === "string") {
        termsCopy = this.props.siteDetails.termsCopy.value;
      } else if (this.props.siteDetails.termsCopy.type === "file") {
        const copyLink = `${process.env.REACT_APP_CONFIG_PATH}/${this.props.siteDetails.termsCopy.value}`;
        fetchCopyHTML(copyLink, this);
      }
    } catch (error) {
      console.error("Error fetching copy for TermsPage component");
    }
    if (termsCopy !== null) {
      this.setState({ copy: termsCopy });
    }
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
