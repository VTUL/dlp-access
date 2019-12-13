import React, { Component } from "react";
import CollectionsList from "./CollectionsList";
import ResultsNumberDropdown from "../../shared/ResultsNumberDropdown";
import Pagination from "../../shared/Pagination";
import "../../css/CollectionsListPage.css";

class CollectionsListPage extends Component {
  render() {
    return (
      <div>
        <h3>Collections List</h3>
        <ResultsNumberDropdown setLimit={this.props.setLimit} />
        <ul>
          <CollectionsList collections={this.props.collections} />
        </ul>

        <Pagination
          numResults={this.props.collections.length}
          total={this.props.total}
          page={this.props.page}
          limit={this.props.limit}
          previousPage={this.props.previousPage}
          nextPage={this.props.nextPage}
          totalPages={this.props.totalPages}
        />
      </div>
    );
  }
}

export default CollectionsListPage;
