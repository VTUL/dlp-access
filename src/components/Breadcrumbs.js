import React, { Component } from "react";
import { NavLink } from "react-router-dom";
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
      title: this.props.record.identifier,
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
          title: parent_collection.identifier,
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
      <ul>
        <li>
          <NavLink className="breadcrumb-link first" to={"/"}>
            Home
          </NavLink>
        </li>
        {linksCopy.reverse().map(link => (
          <li key={arkLinkFormatted(link.custom_key)}>
            <NavLink className="breadcrumb-link" to={link.url}>
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }
}

export default Breadcrumbs;
