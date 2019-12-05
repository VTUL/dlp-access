import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TermsPage from "./pages/TermsPage";
import CollectionsListLoader from "./pages/CollectionsListLoader";
import CollectionsShowLoader from "./pages/CollectionsShowLoader";

import ItemsPage from "./pages/ItemsPage";
import ItemPage from "./pages/ItemPage";
import ContactSection from "./shared/ContactSection";
import SearchPage from "./pages/SearchPage";

import "./App.css";

class App extends Component {
  render() {
    const defaultPageNumber = 1;
    const defaultResultsNumber = 10;

    return (
      <Router>
        <div>
          <div id="content-wrapper" className="container" role="main">
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/about" exact component={AboutPage} />
              <Route path="/terms" component={TermsPage} />
              <Route
                path="/collections/:page?/:limit?"
                render={props => (
                  <CollectionsListLoader
                    page={props.match.params.page || defaultPageNumber}
                    limit={props.match.params.limit || defaultResultsNumber}
                  />
                )}
              />
              <Route
                path="/collection/:customKey"
                render={props => (
                  <CollectionsShowLoader
                    customKey={props.match.params.customKey}
                  />
                )}
              />
              <Route path="/items" component={ItemsPage} />
              <Route path="/item/:customKey" component={ItemPage} />
              <Route path="/search" component={SearchPage} />
            </Switch>
          </div>
          <ContactSection />
        </div>
      </Router>
    );
  }
}

export default App;
