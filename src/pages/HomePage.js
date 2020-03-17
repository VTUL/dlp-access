import React, { Component } from "react";
import FeaturedCarousel from "./home/FeaturedCarousel";
import FeaturedStaticImage from "./home/FeaturedStaticImage";
import HomeStatement from "./home/HomeStatement";
import SiteTitle from "../components/SiteTitle";

import "../css/HomePage.css";

class HomePage extends Component {
  render() {
    let slides = null;
    let statement = null;
    let staticImage = null;
    try {
      slides = this.props.siteDetails.homePage.carousel;
      statement = this.props.siteDetails.homePage.statement;
      staticImage = this.props.siteDetails.homePage.staticImage;
    } catch (error) {
      console.error("Error setting config property");
    }
    return (
      <>
        <SiteTitle
          siteTitle={this.props.siteDetails.siteTitle}
          pageTitle="Home"
        />
        <div className="container">
          <FeaturedCarousel slides={slides} />
          <FeaturedStaticImage staticImage={staticImage} />
          <HomeStatement statement={statement} />
        </div>
      </>
    );
  }
}

export default HomePage;
