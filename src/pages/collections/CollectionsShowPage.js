import React, { Component } from "react";
import "../../css/CollectionsShowPage.css";
import SubCollectionsList from "./SubCollectionsList.js";
import CollectionItemsLoader from "./CollectionItemsLoader.js";
import Breadcrumbs from "../../components/Breadcrumbs.js";
import { collectionSize } from "../../shared/MetadataRenderer";
import { RenderItemsDetailed } from "../../shared/MetadataRenderer";

class CollectionsShowPage extends Component {
  creatorDates(props) {
    let collection = props.collection;
    if (collection.creator) {
      return <span className="creator">Created by: {collection.creator}</span>;
    } else {
      return <span></span>;
    }
  }

  handleZeroItems(collection) {
    if (collection > 0) {
      return collection + " items";
    }

    return "";
  }

  render() {
    const KeyArray = [
      "size",
      "creator",
      "rights_statement",
      "date",
      "subject",
      "language",
      "identifier",
      "bibliographic_citation",
      "rights_holder",
      "related_url"
    ];
    return (
      <div>
        <div className="breadcrumbs-wrapper">
          <Breadcrumbs
            dataType={"Collections"}
            record={this.props.collection}
          />
        </div>

        <h1 className="collection-title">{this.props.collection.title}</h1>
        <div className="post-heading">
          <span className="item-count">
            {this.handleZeroItems(collectionSize(this.props.collection))}
          </span>

          <this.creatorDates collection={this.props.collection} />

          <span className="last-updated">
            Last updated: {this.props.collection.modified_date}
          </span>
        </div>
        <div className="description">{this.props.collection.description}</div>
        <SubCollectionsList
          subCollections={this.props.collection.subCollections}
        />

        <div className="details-section">
          <div className="details-section-header">
            <h2>Collection Details</h2>
          </div>
          <div className="details-section-content">
            <table>
              <tbody>
                <RenderItemsDetailed
                  keyArray={KeyArray}
                  item={this.props.collection}
                />
              </tbody>
            </table>
          </div>
        </div>

        <CollectionItemsLoader collection={this.props.collection} />
      </div>
    );
  }
}

export default CollectionsShowPage;
