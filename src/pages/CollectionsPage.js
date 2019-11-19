import React, { Component } from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import * as queries from "../graphql/queries";

class CollectionsPage extends Component {
  render() {
    const ListView = ({ collections }) => (
      <div>
        <h3>Collections List</h3>
        <ul>
          {collections.map(collection => (
            <li key={collection.id}>
              <img src={collection.thumbnail_path} alt={collection.title} />
              {collection.title}
            </li>
          ))}
        </ul>
      </div>
    );

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
            limit: 3
          })}
        >
          {({ data: { searchCollections }, loading, errors }) => {
            if (!(errors === undefined || errors.length === 0))
              return <h3>Error</h3>;
            if (loading || !searchCollections) return <h3>Loading...</h3>;
            return <ListView collections={searchCollections.items} />;
          }}
        </Connect>
      </div>
    );
  }
}

export default CollectionsPage;
