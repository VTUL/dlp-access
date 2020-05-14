import React, { Component } from "react";
import FeaturedStaticImage from "./home/FeaturedStaticImage";
import SearchBar from "../components/SearchBar";
import HomeStatement from "./home/HomeStatement";
import SiteTitle from "../components/SiteTitle";
import FeaturedItems from "./home/FeaturedItems";
import MultimediaSection from "./home/MultimediaSection";
import SiteSponsors from "./home/SiteSponsors";

import "../css/HomePage.css";

class HomePage extends Component {
  render() {
    let featuredItems = null;
    let statement = null;
    let staticImage = null;
    let mediaSection = null;
    let sponsors = null;
    try {
      featuredItems = this.props.siteDetails.homePage.featuredItems;
      statement = this.props.siteDetails.homePage.statement;
      staticImage = this.props.siteDetails.homePage.staticImage;
      mediaSection = this.props.siteDetails.homePage.mediaSection;
      sponsors = this.props.siteDetails.homePage.sponsors;
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
              view="gallery"
              searchField="title"
              q=""
              setPage={this.props.setPage}
            />
          </div>
          <div className="home-welcome-wrapper">
            <h1>Welcome</h1>
            <HomeStatement statement={statement} />
          </div>
          <FeaturedItems featuredItems={featuredItems} />
          <MultimediaSection mediaSection={mediaSection} />
          <SiteSponsors sponsors={sponsors} />
        </div>
      </>
    );
  }
}

export default HomePage;
