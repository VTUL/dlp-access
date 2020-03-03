import React, { Component } from "react";
import FeaturedCarousel from "./home/FeaturedCarousel";
import HomeStatement from "./home/HomeStatement";
import SiteTitle from "../components/SiteTitle";

import "./HomePage.css";

class HomePage extends Component {
  render() {
    let slides = null;
    let statement = null;
    try {
      slides = this.props.siteDetails.homePage.carousel;
      statement = this.props.siteDetails.homePage.statement;
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
          <HomeStatement statement={statement} />
        </div>
      </>
    );
  }
}

export default HomePage;
