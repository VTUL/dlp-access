import React, { Component } from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import * as queries from "../graphql/queries";

import CollectionsListPage from "./CollectionsListPage";

class CollectionsListLoader extends Component {

  render() {
    return (
      <div>
        <Connect
          query={graphqlOperation(queries.searchCollections, {
            filter: {
              visibility: { eq: true },
              parent_collection: {
                exists: false
              }
            },
            limit: 10000
          })}
        >
          {({ data: { searchCollections }, loading, errors }) => {
            if (!(errors === undefined || errors.length === 0))
              return <h3>Error</h3>;
            if (loading || !searchCollections) return <h3>Loading...</h3>;
            return (
              <CollectionsListPage
                collections={searchCollections.items}
                page={this.props.page}
                limit={this.props.limit}
              />
            );
          }}
        </Connect>
      </div>
    );
  }
}

export default CollectionsListLoader;
