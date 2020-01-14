import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";

import ItemsListPage from "./ItemsListPage";

let nextTokens = [];

class ItemsListLoader extends Component {
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
    let filter = { visibility: { eq: true } };
    if (
      searchQuery.get("q") !== null &&
      searchQuery.get("search_field") !== null
    ) {
      filter = {
        ...filter,
        [searchQuery.get("search_field")]: {
          matchPhrase: searchQuery.get("q")
        }
      };
    }
    const items = await API.graphql(
      graphqlOperation(queries.searchArchives, {
        filter: filter,
        sort: {
          field: "identifier",
          direction: "asc"
        },
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
          <ItemsListPage
            items={this.state.items}
            total={this.state.total}
            page={this.state.page}
            limit={this.state.limit}
            setLimit={this.setLimit.bind(this)}
            previousPage={this.previousPage.bind(this)}
            nextPage={this.nextPage.bind(this)}
            setPage={this.setPage.bind(this)}
            totalPages={this.state.totalPages}
          />
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default withRouter(ItemsListLoader);
