import React, { Component } from "react";
import ItemListView from "../search/ItemListView";
import GalleryView from "../search/GalleryView";
import ResultsNumberDropdown from "../../components/ResultsNumberDropdown";
import Pagination from "../../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThList, faTh } from "@fortawesome/free-solid-svg-icons";

import "../../css/ListPages.css";
import "../../css/CollectionsListPage.css";

class CollectionsListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: this.props.view
    };
  }

  updateView = viewType => {
    this.props.updateFormState("view", viewType);
  };

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
                <div className="btn-group" aria-label="View Options">
                  <button
                    className="btn btn-outline-light"
                    data-toggle="tooltip"
                    title="List"
                    onClick={() => this.updateView("List")}
                    active={(this.state.view === "List").toString()}
                  >
                    <FontAwesomeIcon
                      icon={faThList}
                      size="lg"
                      style={{ color: "var(--themeHighlightColor" }}
                    />
                  </button>
                  <button
                    className="btn btn-outline-light"
                    data-toggle="tooltip"
                    title="Gallery"
                    onClick={() => this.updateView("Gallery")}
                    active={(this.state.view === "Gallery").toString()}
                  >
                    <FontAwesomeIcon
                      icon={faTh}
                      size="lg"
                      style={{ color: "var(--themeHighlightColor" }}
                    />
                  </button>
                </div>
                <ResultsNumberDropdown setLimit={this.props.setLimit} />
              </div>
            </div>
            {this.props.collections.map(collection => {
              if (this.props.view === "Gallery") {
                return (
                  <GalleryView
                    key={collection.id}
                    item={collection}
                    dataType="collection"
                  />
                );
              } else {
                return (
                  <ItemListView
                    key={collection.id}
                    item={collection}
                    dataType="collection"
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
