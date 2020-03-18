import React, { Component } from "react";
import SiteTitle from "../components/SiteTitle";
import { fetchCopyHTML } from "../lib/fetch_tools";

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copy: ""
    };
  }

  componentDidMount() {
    let aboutCopy = null;
    try {
      if (this.props.siteDetails.aboutCopy.type === "string") {
        aboutCopy = this.props.siteDetails.aboutCopy.value;
      } else if (this.props.siteDetails.aboutCopy.type === "file") {
        const copyLink = `${process.env.REACT_APP_CONFIG_PATH}/${this.props.siteDetails.aboutCopy.value}`;
        fetchCopyHTML(copyLink, this);
      }
    } catch (error) {
      console.error("Error fetching copy for AboutPage component");
    }
    if (aboutCopy !== null) {
      this.setState({ copy: aboutCopy });
    }
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
