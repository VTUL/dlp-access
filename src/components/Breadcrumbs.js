import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import { arkLinkFormatted } from "../lib/MetadataRenderer";

import "../css/breadcrumbs.css";

class Breadcrumbs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }

  async getParent(parent_id) {
    const parent_collection = await API.graphql(
      graphqlOperation(queries.getCollection, {
        id: parent_id
      })
    );
    return parent_collection;
  }

  async buildList() {
    let parent_id =
      this.props.record.parent_collection !== null
        ? this.props.record.parent_collection[0]
        : null;
    let parent_list = [];
    parent_list.push({
      title: this.props.record.title,
      url:
        "/" +
        this.props.dataType.replace(/s+$/, "").toLowerCase() +
        "/" +
        arkLinkFormatted(this.props.record.custom_key),
      custom_key: arkLinkFormatted(this.props.record.custom_key)
    });
    if (parent_id !== null) {
      do {
        let response = await this.getParent(parent_id);
        let parent_collection = response.data.getCollection;
        parent_id =
          parent_collection.parent_collection !== null
            ? parent_collection.parent_collection[0]
            : null;
        parent_list.push({
          title: parent_collection.title,
          url: "/collection/" + arkLinkFormatted(parent_collection.custom_key),
          custom_key: arkLinkFormatted(parent_collection.custom_key)
        });
      } while (parent_id !== null);
    }
    this.setState({ links: parent_list });
  }

  componentDidMount() {
    this.buildList();
  }

  render() {
    const linksCopy = this.state.links.slice();
    return (
      <ol id="vt_navtrail" className="long_title vt-breadcrumbs">
        <li key="home" className="vt-breadcrumbs-item">
          <a className="vt-breadcrumbs-link" href={"/"}>
            Home
          </a>
          <span className="breadcrumb-slash" aria-hidden="true">
            {" "}
            /{" "}
          </span>
        </li>
        {linksCopy.reverse().map(link => (
          <li
            className="vt-breadcrumbs-item"
            key={arkLinkFormatted(link.custom_key)}
          >
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

export default Breadcrumbs;
