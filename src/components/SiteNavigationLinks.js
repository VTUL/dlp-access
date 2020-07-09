import React, { Component } from "react";
import { Item } from "semantic-ui-react";

class SiteNavigationLinks extends Component {
  onFoldAction(event) {
    window.foldAction(event.currentTarget);
  }

  render() {
    const aboutPage = this.props.siteDetails.aboutCopy.additionalPages ? (
      <li className="nav-item has-submenu">
        <div className="link-wrapper">
          <a href="/about" className="" tabIndex="-1">
            About
          </a>
          <button
            tabIndex="-1"
            className="fold-icon"
            onClick={this.onFoldAction}
            aria-expanded="false"
            aria-label="About Submenu Toggle"
            aria-controls="about_submenu"
          >
            <span className="far fa-times" focusable="false"></span>
            <span className="sr-only">About Submenu Toggle</span>
          </button>
        </div>
        <ul className="submenu" id="about_submenu" aria-label="About Submenu">
          {this.props.siteDetails.aboutCopy.additionalPages.map(
            (item, index) => {
              return (
                <li className="nav-item" key={index}>
                  <a href={item.link} tabIndex="-1">
                    {item.title}
                  </a>
                </li>
              );
            }
          )}
        </ul>
      </li>
    ) : (
      <li className="nav-item">
        <div className="link-wrapper">
          <a href="/about" tabIndex="-1">
            About
          </a>
        </div>
      </li>
    );

    return (
      <ul id="vt_main_nav" role="presentation" aria-label="Pages in Site">
        <li className="nav-item">
          <div className="link-wrapper">
            <a href="/" tabIndex="-1">
              Home
            </a>
          </div>
        </li>
        {aboutPage}
        <li className="nav-item">
          <div className="link-wrapper">
            <a href="/permissions" tabIndex="-1">
              PERMISSIONS
            </a>
          </div>
        </li>
        <li className="nav-item">
          <div className="link-wrapper">
            <a href="/collections" tabIndex="-1">
              BROWSE COLLECTIONS
            </a>
          </div>
        </li>
        <li className="nav-item">
          <div className="link-wrapper">
            <a href="/search" tabIndex="-1">
              SEARCH
            </a>
          </div>
        </li>
      </ul>
    );
  }
}

export default SiteNavigationLinks;
