import React, { Component } from "react";
import FeaturedStaticImage from "./home/FeaturedStaticImage";
import SearchBar from "../components/SearchBar";
import HomeStatement from "./home/HomeStatement";
import SiteTitle from "../components/SiteTitle";
import FeaturedItems from "./home/FeaturedItems";
import MultimediaSection from "./home/MultimediaSection";
import SiteSponsors from "./home/SiteSponsors";
import CollectionHighlights from "./home/CollectionHighlights";

import "../css/HomePage.css";

class HomePage extends Component {
  render() {
    let featuredItems = null;
    let homeStatement = null;
    let staticImage = null;
    let mediaSection = null;
    let sponsors = null;
    let collectionHighlights = null;
    try {
      featuredItems = this.props.siteDetails.homePage.featuredItems;
      homeStatement = this.props.siteDetails.homePage.homeStatement;
      staticImage = this.props.siteDetails.homePage.staticImage;
      mediaSection = this.props.siteDetails.homePage.mediaSection;
      sponsors = this.props.siteDetails.homePage.sponsors;
      collectionHighlights = this.props.siteDetails.homePage
        .collectionHighlights;
    } catch (error) {
      console.error("Error setting config property");
    }
    return (
      <>
        <SiteTitle
          siteTitle={this.props.siteDetails.siteTitle}
          pageTitle="Home"
        />
        <div
          className={
            this.props.siteDetails.homePage.staticImage.showTitle
              ? "home-wrapper"
              : "home-wrapper-no-text"
          }
        >
          <div className="home-featured-image-wrapper">
            <FeaturedStaticImage staticImage={staticImage} />
            <div id="home-site-title-wrapper">
              <h1>{this.props.siteDetails.siteName}</h1>
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
          <HomeStatement homeStatement={homeStatement} />
          <div className="home-nav-links">
            <a href="/search">View All Items2</a>
            <a href="/collections">View All Collections</a>
          </div>
          <FeaturedItems featuredItems={featuredItems} />
          <MultimediaSection mediaSection={mediaSection} />
          <SiteSponsors sponsors={sponsors} />
          <CollectionHighlights collectionHighlights={collectionHighlights} />
        </div>
      </>
    );
  }
}

export default HomePage;
