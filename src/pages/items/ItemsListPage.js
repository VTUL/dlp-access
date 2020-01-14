import React, { Component } from "react";
import ResultsNumberDropdown from "../../shared/ResultsNumberDropdown";
import Pagination from "../../shared/Pagination";
import SearchBar from "../../components/SearchBar";
import ViewBar from "../../components/ViewBar";
import { ItemsList } from "./ItemsList";

import "../../css/ListPages.css";

class ItemsListPage extends Component {
  state = {
    view: "List",
    dataType: "items",
    searchField: "title",
    q: ""
  };

  updateFormState = (name, val) => {
    this.setState({
      [name]: val
    });
  };

  render() {
    return (
      <div>
        <SearchBar
          dataType={this.state.dataType}
          view={this.state.view}
          searchField={this.state.searchField}
          setPage={this.props.setPage}
          updateFormState={this.updateFormState}
        />
        <h3 className="list-type">Items</h3>
        <ResultsNumberDropdown setLimit={this.props.setLimit} />
        <div className="container">
          <div className="row">
            <div id="sidebar" className="col-md-3 col-sm-4">
              {/* <h2>Limit your search</h2> */}
            </div>
            <div id="content" className="col-md-9 col-sm-8">
              <div>
                <ViewBar
                  view={this.state.view}
                  updateFormState={this.updateFormState}
                />
              </div>
              <ItemsList items={this.props.items} view={this.state.view} />
            </div>
          </div>
          <Pagination
            numResults={this.props.items.length}
            total={this.props.total}
            page={this.props.page}
            limit={this.props.limit}
            previousPage={this.props.previousPage}
            nextPage={this.props.nextPage}
            totalPages={this.props.totalPages}
          />
        </div>
      </div>
    );
  }
}

export default ItemsListPage;
