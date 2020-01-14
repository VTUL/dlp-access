import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TermsPage from "./pages/TermsPage";
import CollectionsListLoader from "./pages/collections/CollectionsListLoader";
import CollectionsShowLoader from "./pages/collections/CollectionsShowLoader";

import ItemsListLoader from "./pages/items/ItemsListLoader";
import ItemPage from "./pages/items/ItemPage";
import ContactSection from "./shared/ContactSection";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
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
              <Route
                exact
                path="/items"
                render={props => <ItemsListLoader />}
              />
              <Route path="/item/:customKey" component={ItemPage} />
            </Switch>
          </div>
          <ContactSection />
        </div>
      </Router>
    );
  }
}

export default App;
