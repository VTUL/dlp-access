import React, { Component } from "react";
import ResultsNumberDropdown from "../../shared/ResultsNumberDropdown";
import Pagination from "../../shared/Pagination";
import SearchBar from "../../components/SearchBar";
import ViewBar from "../../components/ViewBar";
import { ItemsList } from "./ItemsList";

import "../../css/ListPages.css";

class SearchResults extends Component {
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
    return (
      <div>
        <SearchBar
          dataType={this.props.dataType}
          view={this.props.view}
          searchField={this.props.searchField}
          setPage={this.props.setPage}
          updateFormState={this.props.updateFormState}
        />
        <ItemsPaginationDisplay atBottom={false} />
        <ResultsNumberDropdown setLimit={this.props.setLimit} />
        <div className="container">
          <div className="row">
            <div id="sidebar" className="col-md-3 col-sm-4">
              {/* <h2>Limit your search</h2> */}
            </div>
            <div id="content" className="col-md-9 col-sm-8">
              <div>
                <ViewBar
                  view={this.props.view}
                  updateFormState={this.props.updateFormState}
                />
              </div>
              <ItemsList
                items={this.props.items}
                dataType={this.props.dataType}
                view={this.props.view}
              />
            </div>
          </div>
          <ItemsPaginationDisplay atBottom={true} />
        </div>
      </div>
    );
  }
}

export default SearchResults;
