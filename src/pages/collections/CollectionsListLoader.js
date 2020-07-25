import React, { Component } from "react";
import SiteTitle from "../../components/SiteTitle";
import { fetchSearchResults } from "../../lib/fetchTools";

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
      filter: {},
      sort: {
        field: "title",
        direction: "asc"
      },
      view: "Gallery"
    };
  }

  updateFormState = (name, val) => {
    this.setState(
      {
        [name]: val
      },
      function() {
        this.loadCollections();
      }
    );
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
    let options = {
      filter: {
        category: "collection",
        ...this.state.filter
      },
      sort: this.state.sort,
      limit: this.state.limit,
      nextToken: this.state.nextTokens[this.state.page]
    };
    const searchResults = await fetchSearchResults(this, options);
    nextTokens[this.state.page + 1] = searchResults.nextToken;
    this.setState(
      {
        collections: searchResults.items,
        total: searchResults.total,
        nextTokens: nextTokens,
        totalPages: Math.ceil(searchResults.total / this.state.limit)
      },
      function() {
        if (typeof this.props.scrollUp === "function") {
          this.props.scrollUp(new Event("click"));
        }
      }
    );
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
            scrollUp={this.props.scrollUp}
            browseCollections={this.props.siteDetails.browseCollections}
          />
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default CollectionsListLoader;
