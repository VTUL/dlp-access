import React, { Component } from "react";

class SiteNavigationLinks extends Component {
  render() {
    return (
      <ul id="vt_main_nav" role="presentation" aria-label="Pages in Site">
        <li className="nav-item">
          <div className="link-wrapper">
            <a href="/" tabindex="-1">
              Home
            </a>
          </div>
        </li>
        <li className="nav-item">
          <div className="link-wrapper">
            <a href="/about" tabindex="-1">
              About
            </a>
          </div>
        </li>
        <li className="nav-item">
          <div className="link-wrapper">
            <a href="/terms" tabindex="-1">
              PERMISSION PAGE
            </a>
          </div>
        </li>
        <li className="nav-item">
          <div className="link-wrapper">
            <a href="/collections" tabindex="-1">
              BROWSE COLLECTIONS
            </a>
          </div>
        </li>
        <li className="nav-item">
          <div className="link-wrapper">
            <a href="/search" tabindex="-1">
              SEARCH ITEMS
            </a>
          </div>
        </li>
      </ul>
    );
  }
}

export default SiteNavigationLinks;
