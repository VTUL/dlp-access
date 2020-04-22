import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import ResultsNumberDropdown from "../../components/ResultsNumberDropdown";
import Pagination from "../../components/Pagination";
import SubCollectionsList from "./SubCollectionsList.js";

const GetSubCollections = `query SearchSubCollections(
  $parent_id: String!
  $limit: Int
  $nextToken: String
  ) {
  searchCollections(
    filter: {
      visibility: { eq: true },
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
      custom_key
      title
    },
    total,
    nextToken
  }
}`;

let nextTokens = [];

class SubCollectionsLoader extends Component {
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

  updateParentSubcollections(collection, subCollections) {
    this.props.updateSubCollections(collection, subCollections);
  }

  async loadItems(collectionID) {
    const items = await API.graphql(
      graphqlOperation(GetSubCollections, {
        parent_id: collectionID,
        limit: this.state.limit,
        nextToken: this.state.nextTokens[this.state.page]
      })
    );
    nextTokens[this.state.page + 1] = items.data.searchCollections.nextToken;
    this.setState({
      items: items.data.searchCollections.items,
      total: items.data.searchCollections.total,
      nextTokens: nextTokens,
      totalPages: Math.ceil(
        items.data.searchCollections.total / this.state.limit
      )
    });
    this.updateParentSubcollections(
      this.props.collection,
      items.data.searchCollections.items
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
            <h3 className="subcollection-header">
              Subcollections ({this.state.total})
            </h3>
          </div>
          <form className="form-group">
            <label className="mr-1">
              <span className="results-text">Results per page:</span>
            </label>
            <ResultsNumberDropdown setLimit={this.setLimit.bind(this)} />
          </form>
          <SubCollectionsList subCollections={this.state.items} />
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

export default SubCollectionsLoader;
