import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";

import ResultsNumberDropdown from "../../shared/ResultsNumberDropdown";
import CollectionItemsList from "./CollectionItemsList.js";
import Pagination from "../../shared/Pagination";

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
    this.setState({
      items: items.data.searchArchives.items,
      total: items.data.searchArchives.total,
      nextTokens: nextTokens,
      totalPages: Math.ceil(items.data.searchArchives.total / this.state.limit)
    });
  }

  componentDidMount() {
    this.loadItems(this.props.collection.id);
  }

  render() {
    if (this.state.items !== null) {
      return (
        <div className="collection-items-list-wrapper">
          <h3>Works ({this.state.items.length})</h3>
          <ResultsNumberDropdown setLimit={this.setLimit.bind(this)} />
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
          />
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default CollectionItemsLoader;
