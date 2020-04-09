import React, { Component } from "react";
import FeaturedCarousel from "./home/FeaturedCarousel";
import FeaturedStaticImage from "./home/FeaturedStaticImage";
import HomepageSearchBar from "../components/HomepageSearchBar";
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
        <div className="home-wrapper">
          <div className="home-featured-image-wrapper">
            <FeaturedStaticImage staticImage={staticImage} />
            <div id="home-site-title-wrapper">
              <a href="/">{this.props.siteDetails.siteName}</a>
            </div>
          </div>
          <div className="home-search-wrapper">
            <HomepageSearchBar
              dataType="archive"
              view="list"
              searchField="title"
              q=""
              setPage={this.props.setPage}
            />
          </div>
          <div className="home-welcome-wrapper">
            <h1>Welcome</h1>
            <HomeStatement statement={statement} />
          </div>
          <FeaturedCarousel slides={slides} />
        </div>
      </>
    );
  }
}

export default HomePage;
