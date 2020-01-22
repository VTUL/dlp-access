import React, { Component } from "react";

class SiteNavigationLinks extends Component {
  render() {
    return (
      <ul id="vt_main_nav" role="presentation" aria-label="Pages in Site">
        {this.props.siteNavLinks.map((siteNavLink, index) => (
          <li className="nav-item" key={index}>
            <div className="link-wrapper">
              <a href={siteNavLink.url} tabIndex="-1">
                {siteNavLink.text}
              </a>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default SiteNavigationLinks;
