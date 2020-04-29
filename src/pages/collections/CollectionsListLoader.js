import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import SiteTitle from "../../components/SiteTitle";

import CollectionsListPage from "./CollectionsListPage";

let nextTokens = [];

class CollectionsListLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: null,
      nextTokens: [],
      limit: 10,
      page: 0,
      totalPages: 1,
      view: "Gallery"
    };
  }

  updateFormState = (name, val) => {
    this.setState({
      [name]: val
    });
  };

  previousPage() {
    this.setState(
      {
        page: this.state.page - 1
      },
      function() {
        this.loadCollections();
      }
    );
  }

  nextPage() {
    this.setState(
      {
        page: this.state.page + 1
      },
      function() {
        this.loadCollections();
      }
    );
  }

  setLimit(event, result) {
    this.setState(
      {
        limit: parseInt(result.value),
        page: 0
      },
      function() {
        this.loadCollections();
      }
    );
  }

  async loadCollections() {
    const collections = await API.graphql(
      graphqlOperation(queries.searchCollections, {
        filter: {
          collection_category: { eq: process.env.REACT_APP_REP_TYPE },
          visibility: { eq: true },
          parent_collection: { exists: false }
        },
        limit: this.state.limit,
        nextToken: this.state.nextTokens[this.state.page]
      })
    );

    nextTokens[this.state.page + 1] =
      collections.data.searchCollections.nextToken;
    this.setState({
      collections: collections.data.searchCollections.items,
      total: collections.data.searchCollections.total,
      nextTokens: nextTokens,
      totalPages: Math.ceil(
        collections.data.searchCollections.total / this.state.limit
      )
    });
  }

  componentDidMount() {
    this.loadCollections();
  }

  render() {
    if (this.state.collections !== null) {
      return (
        <div>
          <SiteTitle
            siteTitle={this.props.siteDetails.siteTitle}
            pageTitle="Collections"
          />
          <CollectionsListPage
            collections={this.state.collections}
            total={this.state.total}
            page={this.state.page}
            limit={this.state.limit}
            setLimit={this.setLimit.bind(this)}
            previousPage={this.previousPage.bind(this)}
            nextPage={this.nextPage.bind(this)}
            totalPages={this.state.totalPages}
            view={this.state.view}
            updateFormState={this.updateFormState}
          />
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default CollectionsListLoader;
