import React, { Component } from "react";
import FeaturedCarousel from "./home/FeaturedCarousel";
import SiteTitle from "../components/SiteTitle";

import "./HomePage.css";

class HomePage extends Component {
  render() {
    let slides = null;
    try {
      slides = this.props.siteDetails.homePage.carousel;
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
          <div className="row home-content home-statement">
            A visual exhibit of selected items from the International Archive of
            Women in Architecture, a joint partnership between the College of
            Architecture and Urban Studies and the University Libraries at
            Virginia Tech
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;
