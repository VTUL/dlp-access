import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";

import SearchResults from "./SearchResults";

let nextTokens = [];

class SearchLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      nextTokens: [],
      limit: 10,
      page: 0,
      totalPages: 1,
      dataType: "archive",
      searchField: "title",
      view: "List"
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
        this.loadItems();
      }
    );
  }

  nextPage() {
    this.setState(
      {
        page: this.state.page + 1
      },
      function() {
        this.loadItems();
      }
    );
  }
  setPage(page) {
    this.setState(
      {
        page: page
      },
      function() {
        this.loadItems();
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
        this.loadItems();
      }
    );
  }

  async loadItems() {
    const searchQuery = new URLSearchParams(this.props.location.search);
    let archiveFilter = { visibility: { eq: true } };
    let collectionFilter = {
      visibility: { eq: true },
      parent_collection: {
        exists: false
      }
    };
    if (
      searchQuery.get("search_field") !== null &&
      searchQuery.get("data_type") !== null
    ) {
      if (searchQuery.get("data_type") === "archive") {
        if (searchQuery.get("q") !== "") {
          archiveFilter = {
            ...archiveFilter,
            [searchQuery.get("search_field")]: {
              matchPhrase: searchQuery.get("q")
            }
          };
        }
      } else if (searchQuery.get("data_type") === "collection") {
        if (searchQuery.get("q") !== "") {
          collectionFilter = {
            ...collectionFilter,
            [searchQuery.get("search_field")]: {
              matchPhrase: searchQuery.get("q")
            }
          };
        }
      }
      this.setState({
        dataType: searchQuery.get("data_type"),
        searchField: searchQuery.get("search_field")
      });
    }

    const Archives = await API.graphql(
      graphqlOperation(queries.searchArchives, {
        filter: archiveFilter,
        sort: {
          field: "identifier",
          direction: "asc"
        },
        limit: this.state.limit,
        nextToken: this.state.nextTokens[this.state.page]
      })
    );
    const Collections = await API.graphql(
      graphqlOperation(queries.searchCollections, {
        filter: collectionFilter,
        sort: {
          field: "identifier",
          direction: "asc"
        },
        limit: this.state.limit,
        nextToken: this.state.nextTokens[this.state.page]
      })
    );

    let searchResults = null;
    if (
      searchQuery.get("q") === null &&
      searchQuery.get("search_field") === null &&
      searchQuery.get("data_type") === null
    ) {
      searchResults = Archives.data.searchArchives;
    } else if (this.state.dataType === "collection") {
      searchResults = Collections.data.searchCollections;
    } else {
      searchResults = Archives.data.searchArchives;
    }
    nextTokens[this.state.page + 1] = searchResults.nextToken;
    this.setState({
      items: searchResults.items,
      total: searchResults.total,
      nextTokens: nextTokens,
      totalPages: Math.ceil(searchResults.total / this.state.limit)
    });
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      console.log("route change");
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.loadItems();
    }
  }

  componentDidMount() {
    this.loadItems();
  }

  render() {
    if (this.state.items !== null) {
      return (
        <div>
          <SearchResults
            items={this.state.items}
            total={this.state.total}
            page={this.state.page}
            limit={this.state.limit}
            setLimit={this.setLimit.bind(this)}
            previousPage={this.previousPage.bind(this)}
            nextPage={this.nextPage.bind(this)}
            setPage={this.setPage.bind(this)}
            totalPages={this.state.totalPages}
            dataType={this.state.dataType}
            searchField={this.state.searchField}
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

export default withRouter(SearchLoader);
