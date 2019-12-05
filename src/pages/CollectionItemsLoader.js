import React, { Component } from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";

import CollectionItemsList from "./CollectionItemsList.js";

const GetCollectionItems = `query SearchCollectionItems($parent_id: String!) {
  searchArchives(filter: { parent_collection: { eq: $parent_id }}) {
    items {
      title
      thumbnail_path
      custom_key
    }
  }
}`;

class CollectionItemsLoader extends Component {
  render() {
    return (
      <Connect
        query={graphqlOperation(GetCollectionItems, {
          parent_id: this.props.collection.id
        })}
      >
        {({ data: { searchArchives }, loading, errors }) => {
          if (!(errors === undefined || errors.length === 0))
            return <h3>Error</h3>;
          if (loading || !searchArchives) return <h3>Loading...</h3>;
          return (
            <CollectionItemsList
              items={searchArchives.items}
              collection={this.props.collection}
            />
          );
        }}
      </Connect>
    );
  }
}

export default CollectionItemsLoader;
