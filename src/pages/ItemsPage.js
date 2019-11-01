import React, { Component } from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";

const GetCollection = `query SearchArchives($noid: String!) {
  searchArchives(filter: { custom_key: { eq: $noid }}) {
    items {
      id
      title
      thumbnail_path
    }
  }
}`;

class CollectionsPage extends Component {
  render() {
    const ListView = ({ collection }) => (
      <div>
        <h3>Single Archive</h3>
        <ul>
          {
            <li key={collection.id}>
              <img src={collection.thumbnail_path} alt={collection.title} />
              {collection.title}
            </li>
          }
        </ul>
      </div>
    );

    return (
      <div>
        <Connect
          query={graphqlOperation(GetCollection, {
            noid: "ark:/53696/hj91pm5w"
          })}
        >
          {({ data: { searchArchives }, loading, errors }) => {
            if (!(errors === undefined || errors.length === 0))
              return <h3>Error</h3>;
            if (loading || !searchArchives) return <h3>Loading...</h3>;
            console.log(searchArchives);
            return <ListView collection={searchArchives.items[0]} />;
          }}
        </Connect>
      </div>
    );
  }
}

export default CollectionsPage;
