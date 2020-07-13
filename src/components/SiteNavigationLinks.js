import React, { Component } from "react";

class SiteNavigationLinks extends Component {
  onFoldAction(event) {
    window.foldAction(event.currentTarget);
  }

  buildListItems() {
    let listItems = [];
    for (const [key, page] of Object.entries(
      this.props.siteDetails.sitePages
    )) {
      listItems.push(this.topLevelItem(key, page));
    }
    return listItems;
  }

  topLevelItem(key, page) {
    const hasChildClass = page.children ? "nav-item has-submenu" : "nav-item";

    const listItem = (
      <li key={page.text} className={hasChildClass}>
        <div className="link-wrapper">
          <a href={page.local_url} tabIndex="-1">
            {page.text.toUpperCase()}
          </a>
          {this.childButton(page)}
        </div>
        {this.childList(page)}
      </li>
    );
    return listItem;
  }

  childList(page) {
    let childList = <></>;
    if (page.children) {
      const ulID = `${page.text.toLowerCase()}_submenu`;
      const ariaLabel = `${page.text} Submenu`;
      childList = (
        <ul className="submenu" id={ulID} aria-label={ariaLabel}>
          {this.childItems(page)}
        </ul>
      );
    }
    return childList;
  }

  childItems(parentPage) {
    const parentKey = parentPage.text;
    let childItems = [];
    for (const [childKey, page] of Object.entries(parentPage.children)) {
      const liKey = `${parentKey}.${childKey}`;
      const item = (
        <li className="nav-item" key={liKey}>
          <a href={page.local_url} tabIndex="-1">
            {page.text}
          </a>
        </li>
      );
      childItems.push(item);
    }
    return childItems;
  }

  childButton(page) {
    let childButton = <></>;
    if (page.children) {
      const accessibilityText = `${page.text} Submenu Toggle`;
      const ariaControls = `${page.text.toLowerCase()}_submenu`;
      childButton = (
        <button
          tabIndex="-1"
          className="fold-icon"
          onClick={this.onFoldAction}
          aria-expanded="false"
          aria-label={accessibilityText}
          aria-controls={ariaControls}
        >
          <span className="far fa-times" focusable="false"></span>
          <span className="sr-only">{accessibilityText}</span>
        </button>
      );
    }
    return childButton;
  }

  render() {
    const additionalListItems = this.buildListItems();

    return (
      <ul id="vt_main_nav" role="presentation" aria-label="Pages in Site">
        <li className="nav-item">
          <div className="link-wrapper">
            <a href="/" tabIndex="-1">
              Home
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
        {additionalListItems}
      </ul>
    );
  }
}

export default SiteNavigationLinks;
