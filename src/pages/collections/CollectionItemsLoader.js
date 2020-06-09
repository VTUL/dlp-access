import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";

import ResultsNumberDropdown from "../../components/ResultsNumberDropdown";
import CollectionItemsList from "./CollectionItemsList.js";
import Pagination from "../../components/Pagination";

const GetCollectionItems = `query SearchCollectionItems(
    $parent_id: String!
    $limit: Int
    $nextToken: String
  ) {
  searchArchives(
    filter: { 
      parent_collection: { eq: $parent_id }
    },
    sort: {
      field: identifier,
      direction: asc
    },
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      title
      thumbnail_path
      custom_key
      identifier
    }
    total
    nextToken
  }
}`;

let nextTokens = [];

class CollectionItemsLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      nextTokens: [],
      limit: 10,
      page: 0,
      totalPages: 1
    };
  }

  previousPage() {
    this.setState(
      {
        page: this.state.page - 1
      },
      function() {
        this.loadItems(this.props.collection.id);
      }
    );
  }

  nextPage() {
    this.setState(
      {
        page: this.state.page + 1
      },
      function() {
        this.loadItems(this.props.collection.id);
      }
    );
  }

  setLimit(event, result) {
    this.setState(
      {
        limit: parseInt(result.value)
      },
      function() {
        this.loadItems(this.props.collection.id);
      }
    );
  }

  async loadItems(collectionID) {
    const items = await API.graphql(
      graphqlOperation(GetCollectionItems, {
        parent_id: collectionID,
        limit: this.state.limit,
        nextToken: this.state.nextTokens[this.state.page]
      })
    );
    nextTokens[this.state.page + 1] = items.data.searchArchives.nextToken;
    this.setState(
      {
        items: items.data.searchArchives.items,
        total: items.data.searchArchives.total,
        nextTokens: nextTokens,
        totalPages: Math.ceil(
          items.data.searchArchives.total / this.state.limit
        )
      },
      function() {
        this.props.updateCollectionArchives(
          this.props.collection,
          items.data.searchArchives
        );
      }
    );
  }

  componentDidMount() {
    this.loadItems(this.props.collection.id);
  }

  render() {
    if (this.state.items !== null && this.state.total > 0) {
      return (
        <div className="collection-items-list-wrapper">
          <div className="mb-3">
            <h4 className="collection-items-header">
              Items in collection ({this.state.total})
            </h4>
          </div>
          <form className="form-group">
            <label className="mr-1">
              <span>Results per page:</span>
            </label>
            <ResultsNumberDropdown setLimit={this.setLimit.bind(this)} />
          </form>
          <CollectionItemsList
            items={this.state.items}
            collection={this.props.collection}
          />
          <Pagination
            numResults={this.state.items.length}
            total={this.state.total}
            page={this.state.page}
            limit={this.state.limit}
            previousPage={this.previousPage.bind(this)}
            nextPage={this.nextPage.bind(this)}
            totalPages={this.state.totalPages}
            isSearch={false}
            atBottom={true}
          />
        </div>
      );
    } else if (this.state.total === 0) {
      return <div></div>;
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default CollectionItemsLoader;
