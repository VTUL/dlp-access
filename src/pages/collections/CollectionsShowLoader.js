import React, { Component } from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import SiteTitle from "../../components/SiteTitle";
import { searchCollections } from "../../graphql/queries";

import CollectionsShowPage from "./CollectionsShowPage.js";

class CollectionsShowLoader extends Component {
  render() {
    return (
      <Connect
        query={graphqlOperation(searchCollections, {
          order: "ASC",
          limit: 1,
          filter: {
            custom_key: {
              eq: `ark:/53696/${this.props.customKey}`
            }
          }
        })}
      >
        {({ data: { searchCollections }, loading, errors }) => {
          if (!(errors === undefined || errors.length === 0))
            return <h3>Error</h3>;
          if (loading || !searchCollections) return <h3>Loading...</h3>;
          const collection = searchCollections.items[0];

          // log collection identifier in ga
          window.ga("send", "pageview", {
            dimension2: collection.identifier
          });

          return (
            <>
              <SiteTitle
                siteTitle={this.props.siteDetails.siteTitle}
                pageTitle={collection.title}
              />
              <CollectionsShowPage
                collection={collection}
                siteDetails={this.props.siteDetails}
              />
            </>
          );
        }}
      </Connect>
    );
  }
}

export default CollectionsShowLoader;
