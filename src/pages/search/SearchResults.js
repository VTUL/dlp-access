import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import qs from "query-string";
import ResultsNumberDropdown from "../../shared/ResultsNumberDropdown";
import Pagination from "../../shared/Pagination";
import SearchBar from "../../components/SearchBar";
import ViewBar from "../../components/ViewBar";
import ItemsList from "./ItemsList";
import { labelAttr } from "../../shared/MetadataRenderer";

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
    const defaultSearch = {
      data_type: this.props.dataType,
      search_field: "title",
      q: "",
      view: "List"
    };
    const SearchFieldDisplay = () => {
      if (this.props.q) {
        return (
          <table>
            <tbody>
              <tr>
                <td className="collection-detail-key">
                  {labelAttr(this.props.searchField)}
                </td>
              </tr>
              <tr>
                <td className="collection-detail-value">
                  {this.props.q} ({this.props.total})
                  <NavLink to={`/search/?${qs.stringify(defaultSearch)}`}>
                    <i className="fas fa-times"></i>
                  </NavLink>
                </td>
              </tr>
            </tbody>
          </table>
        );
      } else {
        return "";
      }
    };
    return (
      <div>
        <SearchBar
          dataType={this.props.dataType}
          view={this.props.view}
          searchField={this.props.searchField}
          q={this.props.q}
          setPage={this.props.setPage}
        />
        <div className="container">
          <div className="row">
            <div id="sidebar" className="col-md-3 col-sm-4">
              {/* <h2>Limit your search</h2> */}
              <div className="collection-detail">
                <SearchFieldDisplay />
              </div>
            </div>
            <div id="content" className="col-md-9 col-sm-8">
              <div className="navbar navbar-light justify-content-between">
                <div className="navbar-text text-dark">
                  <ItemsPaginationDisplay atBottom={false} />
                </div>
                <div className="form-inline">
                  <ResultsNumberDropdown setLimit={this.props.setLimit} />
                  <ViewBar
                    view={this.props.view}
                    updateFormState={this.props.updateFormState}
                  />
                </div>
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
