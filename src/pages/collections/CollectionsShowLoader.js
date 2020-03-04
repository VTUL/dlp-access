import React, { Component } from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import SiteTitle from "../../components/SiteTitle";

import SubCollectionsLoader from "./SubCollectionsLoader";

const GetCollection = `query searchCollection($customKey: String) {
    searchCollections(
      filter: {
        custom_key: {
            eq: $customKey
        }
      },
      sort: {
        field: identifier, 
        direction: asc
      }
    ){
      items {
        id
        title
        identifier
        description
        creator
        source
        circa
        start_date
        end_date
        subject
        location
        rights_statement
        language
        bibliographic_citation
        rights_holder
        custom_key
        collection_category
        visibility
        thumbnail_path
        parent_collection
        create_date
        modified_date
        archives {
          items {
            id
            title
            identifier
            description
            tags
            creator
            source
            circa
            start_date
            end_date
            rights_statement
            language
            resource_type
            belongs_to
            location
            medium
            bibliographic_citation
            rights_holder
            format
            related_url
            contributor
            custom_key
            parent_collection
            item_category
            visibility
            thumbnail_path
            manifest_url
            create_date
            modified_date
          }
        }
      }
      nextToken
    }
  }
  `;

class CollectionsShowLoader extends Component {
  render() {
    return (
      <Connect
        query={graphqlOperation(GetCollection, {
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
