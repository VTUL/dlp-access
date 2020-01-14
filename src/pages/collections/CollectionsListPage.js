import React, { Component } from "react";
import CollectionsList from "./CollectionsList";
import ResultsNumberDropdown from "../../shared/ResultsNumberDropdown";
import Pagination from "../../shared/Pagination";
import "../../css/ListPages.css";

class CollectionsListPage extends Component {
  render() {
    const Header = () => {
      if (this.props.isSearch) {
        return <CollectionsPaginationDisplay atBottom={false} />;
      } else {
        return <h3 className="list-type">Collections</h3>;
      }
    };

    const CollectionsPaginationDisplay = ({ atBottom }) => {
      return (
        <Pagination
          numResults={this.props.collections.length}
          total={this.props.total}
          page={this.props.page}
          limit={this.props.limit}
          previousPage={this.props.previousPage}
          nextPage={this.props.nextPage}
          totalPages={this.props.totalPages}
          isSearch={this.props.isSearch}
          atBottom={atBottom}
        />
      );
    };

    return (
      <div>
        <Header />
        <ResultsNumberDropdown setLimit={this.props.setLimit} />
        <ul>
          <CollectionsList collections={this.props.collections} />
        </ul>
        <CollectionsPaginationDisplay atBottom={true} />
      </div>
    );
  }
}

export default CollectionsListPage;
