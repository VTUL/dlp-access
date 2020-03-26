import React, { Component } from "react";
import FeaturedCarousel from "./home/FeaturedCarousel";
import FeaturedStaticImage from "./home/FeaturedStaticImage";
import SearchBar from "../components/SearchBar";
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
            <SearchBar
              dataType={this.props.dataType}
              view={this.props.view}
              searchField={this.props.searchField}
              q={this.props.q}
              setPage={this.props.setPage}
              dateRange={this.props.dateRange}
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
