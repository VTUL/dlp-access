import React, { Component } from "react";
import SiteTitle from "../components/SiteTitle";
import { getHTML } from "../lib/fetch_tools";

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copy: ""
    };
  }

  componentDidMount() {
    getHTML(this.props.siteDetails.aboutCopy, this);
  }

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
          dangerouslySetInnerHTML={{ __html: this.state.copy }}
        ></div>
      </>
    );
  }
}

export default AboutPage;
