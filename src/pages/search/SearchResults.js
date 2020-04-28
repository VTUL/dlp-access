import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import qs from "query-string";
import ResultsNumberDropdown from "../../components/ResultsNumberDropdown";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import ViewBar from "../../components/ViewBar";
import ItemsList from "./ItemsList";
import { labelAttr } from "../../lib/MetadataRenderer";
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
      <div className="search-result-wrapper">
        <SearchBar
          dataType={this.props.dataType}
          view={this.props.view}
          searchField={this.props.searchField}
          q={this.props.q}
          setPage={this.props.setPage}
        />
        <div className="container search-results">
          <div className="row">
            <div id="sidebar" className="col-lg-3 col-sm-12">
              {/* <h2>Limit your search</h2> */}
              <div className="collection-detail">
                <SearchFieldDisplay />
              </div>
            </div>
            <div id="content" className="col-lg-9 col-sm-12">
              <div className="navbar navbar-light justify-content-between">
                <div className="navbar-text text-dark">
                  <ItemsPaginationDisplay atBottom={false} />
                </div>
                <div className="form-inline">
                  <ViewBar
                    view={this.props.view}
                    updateFormState={this.props.updateFormState}
                  />
                  <ResultsNumberDropdown setLimit={this.props.setLimit} />
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
