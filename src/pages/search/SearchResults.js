import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import qs from "query-string";
import ResultsNumberDropdown from "../../components/ResultsNumberDropdown";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import SearchFacets from "./SearchFacets";
import ViewBar from "../../components/ViewBar";
import ItemsList from "./ItemsList";
import { fetchLanguages } from "../../lib/fetchTools";

import "../../css/ListPages.css";
import "../../css/SearchResult.css";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: null
    };
  }

  componentDidMount() {
    fetchLanguages(this, "abbr");
  }

  onClearArray = () => {
    this.props.updateFormState("filters", {});
  };

  render() {
    const ItemsPaginationDisplay = ({ atBottom }) => {
      return (
        <Pagination
          numResults={this.props.items.length}
          total={this.props.total}
          page={this.props.page}
          limit={this.props.limit}
          previousPage={this.props.previousPage}
          nextPage={this.props.nextPage}
          totalPages={this.props.totalPages}
          isSearch={true}
          atBottom={atBottom}
        />
      );
    };

    const FiltersDisplay = () => {
      const defaultSearch = {
        field: this.props.field,
        q: this.props.q,
        view: this.props.view
      };
      if (Object.keys(this.props.filters).length > 0) {
        return (
          <div>
            Filtering by:
            <ul>
              {Object.entries(this.props.filters).map(([key, value]) => {
                return (
                  <li key={key}>
                    <b>{key}</b> --> {value}
                  </li>
                );
              })}
            </ul>
            Clear All Filters
            <NavLink to={`/search/?${qs.stringify(defaultSearch)}`}>
              <i className="fas fa-times"></i>
            </NavLink>
          </div>
        );
      } else return null;
    };
    return (
      <div className="search-result-wrapper">
        <SearchBar
          filters={this.props.filters}
          view={this.props.view}
          field={this.props.field}
          q={this.props.q}
          setPage={this.props.setPage}
          updateFormState={this.props.updateFormState}
        />
        <div className="container search-results">
          <div className="row">
            <div id="sidebar" className="col-lg-3 col-sm-12">
              <SearchFacets
                filters={this.props.filters}
                field={this.props.field}
                q={this.props.q}
                total={this.props.total}
                view={this.props.view}
                updateFormState={this.props.updateFormState}
              />
            </div>
            <div id="content" className="col-lg-9 col-sm-12">
              <div className="navbar navbar-light justify-content-between">
                <div className="navbar-text text-dark">
                  <ItemsPaginationDisplay atBottom={false} />
                </div>
                <FiltersDisplay />
                <div className="form-inline">
                  <ViewBar
                    view={this.props.view}
                    updateFormState={this.props.updateFormState}
                    pageViews={["Gallery", "List", "Masonry"]}
                  />
                  <ResultsNumberDropdown setLimit={this.props.setLimit} />
                </div>
              </div>
              <ItemsList items={this.props.items} view={this.props.view} />
            </div>
          </div>
          <ItemsPaginationDisplay atBottom={true} />
        </div>
      </div>
    );
  }
}

export default SearchResults;
