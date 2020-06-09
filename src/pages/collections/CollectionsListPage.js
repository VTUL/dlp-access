import React, { Component } from "react";
import ItemListView from "../search/ItemListView";
import GalleryView from "../search/GalleryView";
import ResultsNumberDropdown from "../../components/ResultsNumberDropdown";
import Pagination from "../../components/Pagination";
import ViewBar from "../../components/ViewBar";

import "../../css/ListPages.css";
import "../../css/CollectionsListPage.css";

class CollectionsListPage extends Component {
  render() {
    const Header = () => {
      if (this.props.isSearch) {
        return <CollectionsPaginationDisplay atBottom={false} />;
      } else {
        return (
          <h1 className="list-type">
            About Our <span>Collections</span>
          </h1>
        );
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
      <div className="collection-browse-wrapper">
        <div className="collection-browse-header">
          <Header />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 navbar navbar-light justify-content-between">
              <div></div>
              <div className="form-inline collection-view-options">
                <ViewBar
                  view={this.props.view}
                  updateFormState={this.props.updateFormState}
                  pageViews={["Gallery", "List"]}
                />
                <ResultsNumberDropdown setLimit={this.props.setLimit} />
              </div>
            </div>
            {this.props.collections.map(collection => {
              if (this.props.view === "Gallery") {
                return (
                  <GalleryView
                    key={collection.id}
                    item={collection}
                    category="collection"
                    label={false}
                  />
                );
              } else {
                return (
                  <ItemListView
                    key={collection.id}
                    item={collection}
                    category="collection"
                    label={false}
                  />
                );
              }
            })}
          </div>
        </div>
        <CollectionsPaginationDisplay atBottom={true} />
      </div>
    );
  }
}

export default CollectionsListPage;
