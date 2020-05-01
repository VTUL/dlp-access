import React, { Component } from "react";
import "../../css/CollectionsShowPage.css";
import SubCollectionsLoader from "./SubCollectionsLoader.js";
import CollectionItemsLoader from "./CollectionItemsLoader.js";
import Breadcrumbs from "../../components/Breadcrumbs.js";
import {
  RenderItemsDetailed,
  collectionSize
} from "../../lib/MetadataRenderer";
import { fetchLanguages } from "../../lib/fetchTools";

class CollectionsShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: null
    };
  }

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

  componentDidMount() {
    fetchLanguages(this, "abbr");
  }

  updateSubCollections(collection, subCollections) {
    collection.subCollections = subCollections;
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
    if (this.state.languages) {
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
          <div className="description">
            {this.props.collection.description
              .split("\n")
              .map((value, index) => {
                return <p key={index}>{value}</p>;
              })}
          </div>

          <SubCollectionsLoader
            collection={this.props.collection}
            updateSubCollections={this.updateSubCollections}
          />
          <br />
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
                    languages={this.state.languages}
                  />
                </tbody>
              </table>
            </div>
          </div>

          <CollectionItemsLoader collection={this.props.collection} />
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default CollectionsShowPage;
