import React, { Component } from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";

import CollectionsShowPage from "./CollectionsShowPage";

const GetSubCollections = `query SearchSubCollections($parent_id: String!) {
  searchCollections(filter: { parent_collection: { eq: $parent_id }},
      sort: {
        field: identifier,
        direction: asc
      }) {
    items {
      custom_key
      title
    }
  }
}`;

class SubCollectionsLoader extends Component {
  render() {
    return (
      <Connect
        query={graphqlOperation(GetSubCollections, {
          parent_id: this.props.collection.id
        })}
      >
        {({ data: { searchCollections }, loading, errors }) => {
          if (!(errors === undefined || errors.length === 0))
            return <h3>Error</h3>;
          if (loading) return <h3>Loading...</h3>;
          this.props.collection.subCollections = searchCollections;
          return <CollectionsShowPage collection={this.props.collection} />;
        }}
      </Connect>
    );
  }
}

export default SubCollectionsLoader;
