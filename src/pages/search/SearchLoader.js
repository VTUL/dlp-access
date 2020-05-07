import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import SiteTitle from "../../components/SiteTitle";
import { fetchLanguages } from "../../lib/fetchTools";

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
      view: "Gallery",
      q: "",
      languages: null
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
        this.scrollUp();
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
        this.scrollUp();
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

  scrollUp() {
    if (typeof this.props.scrollUp === "function") {
      this.props.scrollUp(new Event("click"));
    }
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
    const REP_TYPE = process.env.REACT_APP_REP_TYPE;
    let archiveFilter = {
      item_category: { eq: REP_TYPE },
      visibility: { eq: true }
    };
    let collectionFilter = {
      collection_category: { eq: REP_TYPE },
      visibility: { eq: true },
      parent_collection: { exists: false }
    };
    let searchPhrase = {};
    if (searchQuery.get("search_field") && searchQuery.get("data_type")) {
      if (
        searchQuery.get("search_field") === "date" &&
        searchQuery.get("q") !== ""
      ) {
        let dates = searchQuery.get("q").split(" - ");
        searchPhrase = {
          start_date: { gte: `${dates[0]}/01/01`, lte: `${dates[1]}/12/31` }
        };
      } else if (
        searchQuery.get("search_field") === "language" &&
        searchQuery.get("q") !== "" &&
        this.state.languages
      ) {
        let languagePhrase = searchQuery.get("q");
        if (
          this.state.languages.hasOwnProperty(
            searchQuery.get("q").toLowerCase()
          )
        ) {
          languagePhrase = this.state.languages[
            searchQuery.get("q").toLowerCase()
          ];
        }

        searchPhrase = {
          [searchQuery.get("search_field")]: {
            matchPhrase: languagePhrase
          }
        };
        this.setState({
          q: languagePhrase
        });
      } else if (
        searchQuery.get("search_field") !== "language" &&
        searchQuery.get("q") !== ""
      ) {
        searchPhrase = {
          [searchQuery.get("search_field")]: {
            matchPhrase: searchQuery.get("q")
          }
        };
      }
      if (searchQuery.get("data_type") === "archive") {
        archiveFilter = { ...archiveFilter, ...searchPhrase };
      } else if (searchQuery.get("data_type") === "collection") {
        collectionFilter = { ...collectionFilter, ...searchPhrase };
      }
      this.setState({
        dataType: searchQuery.get("data_type"),
        searchField: searchQuery.get("search_field"),
        q: searchQuery.get("q")
      });
    }

    const Archives = await API.graphql(
      graphqlOperation(queries.searchArchives, {
        filter: archiveFilter,
        sort: {
          field: "title",
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
          field: "title",
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
    fetchLanguages(this, "name", this.loadItems);
    this.loadItems();
  }

  render() {
    if (this.state.items !== null) {
      return (
        <div>
          <SiteTitle
            siteTitle={this.props.siteDetails.siteTitle}
            pageTitle="Search"
          />
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
            q={this.state.q}
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
