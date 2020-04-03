import React, { Component } from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import SiteTitle from "../../components/SiteTitle";
import { getCollectionByCustomKey } from "../../graphql/queries";

import SubCollectionsLoader from "./SubCollectionsLoader";

class CollectionsShowLoader extends Component {
  render() {
    return (
      <Connect
        query={graphqlOperation(getCollectionByCustomKey, {
          customKey: `ark:/53696/${this.props.customKey}`
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
              <SubCollectionsLoader collection={collection} />
            </>
          );
        }}
      </Connect>
    );
  }
}

export default CollectionsShowLoader;
