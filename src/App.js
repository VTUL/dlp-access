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
    const response = await fetch(`/site_data/${siteName}.json`);
    const data = await response.json();
    this.setState({
      siteDetails: data
    });
  }

  getSiteName() {
    const host = window.location.hostname;
    const regex = /^[a-z]*/;
    let siteName = null;
    if (host.match(regex) !== null) {
      siteName = host.match(regex)[0];
    }
    return siteName;
  }

  componentDidMount() {
    const siteName = this.getSiteName();
    if (siteName !== null) {
      this.fetchSiteDetails(siteName);
    }
  }

  render() {
    if (this.state.siteDetails !== null) {
      return (
        <Router>
          <Header siteDetails={this.state.siteDetails} />
          <main style={{ minHeight: "500px", padding: "1em 1em 0 1em" }}>
            <div id="content-wrapper" className="container" role="main">
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/about" exact component={AboutPage} />
                <Route path="/terms" component={TermsPage} />
                <Route
                  path="/collections"
                  exact
                  component={CollectionsListLoader}
                />
                <Route
                  path="/collection/:customKey"
                  render={props => (
                    <CollectionsShowLoader
                      customKey={props.match.params.customKey}
                    />
                  )}
                />
                <Route path="/search" exact component={SearchLoader} />
                <Route path="/archive/:customKey" component={ArchivePage} />
              </Switch>
            </div>
            <ContactSection />
          </main>
        </Router>
      );
    } else {
      return <div>Waiting for data...</div>;
    }
  }
}

export default App;
