import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CollectionsPage from "./pages/CollectionsPage";
import ItemsPage from "./pages/ItemsPage";
import ItemPage from "./pages/ItemPage";
import ContactSection from "./shared/ContactSection";
import SearchPage from "./pages/SearchPage";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div id="content-wrapper" className="container" role="main">
            <Switch>
              <Route path="/" component={HomePage} exact />
              <Route path="/about" component={AboutPage} />
              <Route path="/collections" component={CollectionsPage} />
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
