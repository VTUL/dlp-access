import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";

import Breadcrumbs from "./Breadcrumbs";

class HeaderBreadcrumbs extends Breadcrumbs {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      identifier: null
    };
  }

  async getIdentifier(pathname, path_array) {
    const type = path_array[1];
    const customKey = path_array[2];
    const filter = { customKey: `ark:/53696/${customKey}` };
    let identifier = null;
    if (type === "collection") {
      const item = await API.graphql(
        graphqlOperation(queries.getCollectionByCustomKey, filter)
      );
      try {
        identifier = item.data.searchCollections.items[0].identifier;
      } catch (error) {
        console.error(`error getting identifier for collection: ${customKey}`);
      }
    } else if (type === "archive") {
      const item = await API.graphql(
        graphqlOperation(queries.getArchiveByCustomKey, filter)
      );
      try {
        identifier = item.data.searchArchives.items[0].identifier;
      } catch (error) {
        console.error(`error getting identifier for archive: ${customKey}`);
      }
    }

    if (identifier) {
      this.setState({ identifier: identifier }, function() {
        this.buildList(pathname, path_array);
      });
    } else {
      this.buildList(pathname, path_array);
    }
  }

  getCurrentPage(pathname, path_array) {
    let pageObj = null;
    let page = "";
    if (path_array[1] !== "") {
      page = path_array[1];
      if (page === "collection" || page === "archive") {
        pageObj = {
          title: `${page.charAt(0).toUpperCase() + page.slice(1)}: ${
            this.state.identifier
          }`,
          url: pathname,
          custom_key: null
        };
      } else {
        pageObj = {
          title: page.charAt(0).toUpperCase() + page.slice(1),
          url: pathname,
          custom_key: null
        };
      }
    }
    return pageObj;
  }

  buildList(pathname, path_array) {
    let baseList = [];
    const here = this.getCurrentPage(pathname, path_array);
    baseList.push({
      title: "University Libraries",
      url: "https://lib.vt.edu",
      custom_key: null
    });
    baseList.push({
      title: this.props.siteDetails.siteTitle,
      url: "/",
      custom_key: null
    });
    if (here) {
      baseList.push(here);
    }
    this.setState({ links: baseList });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const pathname = this.props.location.pathname;
      const path_array = pathname.split("/");
      if (path_array.length >= 2) {
        this.getIdentifier(pathname, path_array);
      }
    }
  }

  componentDidMount() {
    const pathname = this.props.location.pathname;
    const path_array = pathname.split("/");
    if (path_array.length >= 2) {
      this.getIdentifier(pathname, path_array);
    }
  }

  render() {
    return (
      <ol id="vt_navtrail" className="long_title vt-breadcrumbs">
        {this.state.links.map((link, index) => (
          <li key={index} className="vt-breadcrumbs-item">
            <a className="vt-breadcrumbs-link" href={link.url}>
              {link.title}
            </a>
            <span className="breadcrumb-slash" aria-hidden="true">
              {" "}
              /{" "}
            </span>
          </li>
        ))}
      </ol>
    );
  }
}

export default HeaderBreadcrumbs;
