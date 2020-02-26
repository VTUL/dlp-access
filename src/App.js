import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TermsPage from "./pages/TermsPage";
import CollectionsListLoader from "./pages/collections/CollectionsListLoader";
import CollectionsShowLoader from "./pages/collections/CollectionsShowLoader";

import SearchLoader from "./pages/search/SearchLoader";
import ArchivePage from "./pages/archives/ArchivePage";
import ContactSection from "./shared/ContactSection";
import Footer from "./components/Footer";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "List",
      siteDetails: null
    };
  }

  async fetchSiteDetails(siteName) {
    let response = null;
    let data = null;

    try {
      response = await fetch(
        `${process.env.REACT_APP_CONFIG_PATH}/${siteName.toLowerCase()}.json`
      );
      data = await response.json();
    } catch (error) {
      console.error(`Error fetching ${siteName.toLowerCase()}.json`);
      console.error(error);
    }
    if (data === null) {
      try {
        response = await fetch(
          `${process.env.REACT_APP_CONFIG_PATH}/default.json`
        );
        data = await response.json();
      } catch (error) {
        console.error("Error fetching default.json");
        console.error(error);
      }
    }
    this.setState({
      siteDetails: data
    });
  }

  componentDidMount() {
    this.fetchSiteDetails(process.env.REACT_APP_REP_TYPE);
  }

  render() {
    console.log(process.env);
    if (this.state.siteDetails !== null) {
      return (
        <Router>
          <Header siteDetails={this.state.siteDetails} />
          <main style={{ minHeight: "500px", padding: "1em 1em 0 1em" }}>
            <div id="content-wrapper" className="container" role="main">
              <Switch>
                <Route
                  path="/"
                  exact
                  render={props => (
                    <HomePage siteDetails={this.state.siteDetails} />
                  )}
                />
                <Route
                  path="/about"
                  exact
                  render={props => (
                    <AboutPage siteDetails={this.state.siteDetails} />
                  )}
                />
                <Route
                  path="/terms"
                  exact
                  render={props => (
                    <TermsPage siteDetails={this.state.siteDetails} />
                  )}
                />
                <Route
                  path="/collections"
                  exact
                  render={props => (
                    <CollectionsListLoader
                      siteDetails={this.state.siteDetails}
                    />
                  )}
                />
                <Route
                  path="/collection/:customKey"
                  render={props => (
                    <CollectionsShowLoader
                      siteDetails={this.state.siteDetails}
                      customKey={props.match.params.customKey}
                    />
                  )}
                />
                <Route
                  path="/search"
                  exact
                  render={props => (
                    <SearchLoader siteDetails={this.state.siteDetails} />
                  )}
                />
                <Route
                  path="/archive/:customKey"
                  exact
                  render={props => (
                    <ArchivePage
                      siteDetails={this.state.siteDetails}
                      customKey={props.match.params.customKey}
                    />
                  )}
                />
              </Switch>
            </div>
            <ContactSection siteDetails={this.state.siteDetails} />
          </main>
          <Footer />
        </Router>
      );
    } else {
      return <div>Error fetching site details from config</div>;
    }
  }
}

export default App;
