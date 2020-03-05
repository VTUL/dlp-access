import React, { Component } from "react";
import "../../css/CollectionsShowPage.css";
import SubCollectionsList from "./SubCollectionsList.js";
import CollectionItemsLoader from "./CollectionItemsLoader.js";
import Breadcrumbs from "../../components/Breadcrumbs.js";

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

  collectionSize(collection) {
    let subCollections =
      collection.subCollections.items != null
        ? collection.subCollections.items.length
        : 0;
    let archives =
      collection.archives.items != null ? collection.archives.items.length : 0;
    return subCollections + archives;
  }
  creatorList(collection) {
    return collection.creator.join("; ");
  }
  dateRange(collection) {
    return `${collection.start_date} - ${collection.end_date}`;
  }
  subjectsFormatted(collection) {
    if (collection.subject != null) {
      return collection.subject.map(subject => (
        <div className="subject-entry" key={subject}>
          {subject}
        </div>
      ));
    } else {
      return <div></div>;
    }
  }
  render() {
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
            {this.handleZeroItems(this.collectionSize(this.props.collection))}
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
                {this.collectionSize(this.props.collection) > 0 ? (
                  <tr>
                    <td className="collection-detail-key">Size</td>
                    <td className="collection-detail-value">
                      {this.collectionSize(this.props.collection)}
                    </td>
                  </tr>
                ) : (
                  <tr></tr>
                )}

                {this.props.collection.creator != null ? (
                  <tr>
                    <td className="collection-detail-key">Creator</td>
                    <td className="collection-detail-value">
                      {this.creatorList(this.props.collection)}
                    </td>
                  </tr>
                ) : (
                  <tr></tr>
                )}

                {this.props.collection.rights_statement != null ? (
                  <tr>
                    <td className="collection-detail-key">Rights</td>
                    <td className="collection-detail-value">
                      {this.props.collection.rights_statement}
                    </td>
                  </tr>
                ) : (
                  <tr></tr>
                )}

                {this.props.collection.start_date != null &&
                this.props.collection.end_date != null ? (
                  <tr>
                    <td className="collection-detail-key">Date Created</td>
                    <td className="collection-detail-value">
                      {this.dateRange(this.props.collection)}
                    </td>
                  </tr>
                ) : (
                  <tr></tr>
                )}

                {this.props.collection.subject != null ? (
                  <tr>
                    <td className="collection-detail-key">Subject</td>
                    <td className="collection-detail-value">
                      {this.subjectsFormatted(this.props.collection)}
                    </td>
                  </tr>
                ) : (
                  <tr></tr>
                )}

                {this.props.collection.language != null ? (
                  <tr>
                    <td className="collection-detail-key">Language</td>
                    <td className="collection-detail-value">
                      {this.props.collection.language}
                    </td>
                  </tr>
                ) : (
                  <tr></tr>
                )}

                {this.props.collection.identifier != null ? (
                  <tr>
                    <td className="collection-detail-key">Identifier</td>
                    <td className="collection-detail-value identifier">
                      {this.props.collection.identifier}
                    </td>
                  </tr>
                ) : (
                  <tr></tr>
                )}

                {this.props.collection.bibliographic_citation != null ? (
                  <tr>
                    <td className="collection-detail-key">
                      Bibliographic citation
                    </td>
                    <td className="collection-detail-value">
                      {this.props.collection.bibliographic_citation}
                    </td>
                  </tr>
                ) : (
                  <tr></tr>
                )}

                {this.props.collection.rights_holder != null ? (
                  <tr>
                    <td className="collection-detail-key">Rights holder</td>
                    <td className="collection-detail-value">
                      {this.props.collection.rights_holder}
                    </td>
                  </tr>
                ) : (
                  <tr></tr>
                )}
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
