import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import SubCollectionsLoader from "./SubCollectionsLoader.js";
import CollectionItemsLoader from "./CollectionItemsLoader.js";
import Breadcrumbs from "../../components/Breadcrumbs.js";
import {
  RenderItemsDetailed,
  collectionSize,
  addNewlineInDesc
} from "../../lib/MetadataRenderer";
import { fetchLanguages } from "../../lib/fetchTools";

import "../../css/CollectionsShowPage.css";

class CollectionsShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: null,
      descriptionTruncated: true,
      subDescriptionTruncated: true,
      description: "",
      title: "",
      thumbnail_path: ""
    };
    this.onMoreLessClick = this.onMoreLessClick.bind(this);
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

  updateSubCollections(collection, subCollections) {
    collection.subCollections = subCollections;
  }

  async setTopLevelAttributes(attributes) {
    let attributeResults = {};
    if (this.props.collection.parent_collection) {
      attributeResults = await this.getTopLevelAttributes(
        this.props.collection.parent_collection[0],
        attributes
      );
    }
    this.setState(attributeResults, function() {
      this.render();
    });
  }

  async getTopLevelAttributes(parent_id, attributes) {
    let attributeResults = {};
    while (parent_id) {
      let parent = await this.getParent(parent_id);
      let parentData = parent.data.getCollection;
      for (const key of attributes) {
        attributeResults[key] = parentData[key];
      }
      if (parentData.parent_collection) {
        parent_id = parentData.parent_collection[0];
      } else {
        parent_id = null;
      }
    }
    return attributeResults;
  }

  async getParent(parent_id) {
    const parent_collection = await API.graphql(
      graphqlOperation(queries.getCollection, {
        id: parent_id
      })
    );
    return parent_collection;
  }

  collectionImg() {
    return this.state.thumbnail_path || this.props.collection.thumbnail_path;
  }

  collectionTitle() {
    return this.state.title || this.props.collection.title;
  }

  subCollectionTitle() {
    let title = "";
    if (this.state.title && this.state.title !== this.props.collection.title) {
      title = this.props.collection.title;
    }
    return title;
  }

  subCollectionDescription() {
    let descriptionSection = <></>;
    let descriptionText = this.props.collection.description;
    if (descriptionText && this.state.subDescriptionTruncated) {
      descriptionText = descriptionText.substr(0, 600);
    }
    if (this.props.collection.parent_collection && descriptionText) {
      descriptionSection = (
        <div className="collection-detail-description">
          <div className="collection-detail-key">Description</div>
          <div
            className={`collection-detail-value description ${
              this.state.subDescriptionTruncated ? "trunc" : "full"
            }`}
          >
            {addNewlineInDesc(descriptionText)}
            <a
              href="#"
              onClick={e => this.onMoreLessClick("metadata", e)}
              className="more"
            >
              . . .[more]
            </a>
            <a
              href="#"
              onClick={e => this.onMoreLessClick("metadata", e)}
              className="less"
            >
              . . .[less]
            </a>
          </div>
        </div>
      );
    }
    return descriptionSection;
  }

  onMoreLessClick(src, e) {
    e.preventDefault();
    let key = "descriptionTruncated";
    if (src === "metadata") {
      key = "subDescriptionTruncated";
    }
    let truncated = true;
    if (this.state[key]) {
      truncated = false;
    }
    let stateObj = {};
    stateObj[key] = truncated;
    this.setState(stateObj, function() {
      this.render();
    });
  }

  getDescription() {
    let description =
      this.state.description || this.props.collection.description;
    if (description && this.state.descriptionTruncated) {
      description = description.substr(0, 600);
    }
    return addNewlineInDesc(description);
  }

  componentDidMount() {
    fetchLanguages(this, "abbr");
    const topLevelAttributes = ["title", "description", "thumbnail_path"];
    this.setTopLevelAttributes(topLevelAttributes);
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
      "related_url",
      "provenance",
      "belongs_to"
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
          <div className="top-content-row row">
            <div className="collection-img-col col-4">
              <img
                src={this.collectionImg()}
                alt={`${this.props.collection} header`}
              />
            </div>
            <div className="collection-details-col col-8">
              <h1 className="collection-title">{this.collectionTitle()}</h1>
              <div className="post-heading">
                <span className="item-count">
                  {this.handleZeroItems(collectionSize(this.props.collection))}
                </span>

                <this.creatorDates collection={this.props.collection} />

                <span className="last-updated">
                  Last updated: {this.props.collection.modified_date}
                </span>
              </div>
              <div
                className={`description ${
                  this.state.descriptionTruncated ? "trunc" : "full"
                }`}
              >
                <div>
                  <h3 className="introduction">Introduction</h3>
                  {this.getDescription()}{" "}
                  <a
                    href="#"
                    onClick={e => this.onMoreLessClick("top-level", e)}
                    className="more"
                  >
                    . . .[more]
                  </a>
                  <a
                    href="#"
                    onClick={e => this.onMoreLessClick("top-level", e)}
                    className="less"
                  >
                    . . .[less]
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="mid-content-row row">
              <div className="col-12 col-lg-8 details-section">
                <div className="details-section-header"></div>
                <div className="details-section-content-grid">
                  {this.subCollectionDescription()}

                  <RenderItemsDetailed
                    keyArray={KeyArray}
                    item={this.props.collection}
                    languages={this.state.languages}
                    type="grid"
                  />
                </div>
              </div>

              <div className="col-12 col-lg-4 subcollections-section">
                <SubCollectionsLoader
                  collection={this.props.collection}
                  updateSubCollections={this.updateSubCollections}
                />
              </div>
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
