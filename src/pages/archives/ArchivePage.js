import React, { Component } from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import Viewer from "../../components/Viewer";
import SearchBar from "../../components/SearchBar";
import Breadcrumbs from "../../components/Breadcrumbs.js";
import SiteTitle from "../../components/SiteTitle";
import { RenderItemsDetailed } from "../../lib/MetadataRenderer";
import { fetchLanguages } from "../../lib/fetchTools";
import { getArchiveByCustomKey } from "../../graphql/queries";

import "../../css/ArchivePage.css";

const KeyArray = [
  "identifier",
  "belongs_to",
  "bibliographic_citation",
  "contributor",
  "creator",
  "custom_key",
  "format",
  "language",
  "location",
  "medium",
  "resource_type",
  "related_url",
  "rights_holder",
  "rights_statement",
  "source",
  "start_date",
  "tags"
];

class ArchivePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      dataType: "archive",
      searchField: "title",
      view: "List",
      languages: null
    };
  }

  updateFormState = (name, val) => {
    this.setState({
      [name]: val
    });
  };

  setPage = page => {
    this.setState({ page: page });
  };

  componentDidMount() {
    fetchLanguages(this, "abbr");
  }

  render() {
    return (
      <Connect
        query={graphqlOperation(getArchiveByCustomKey, {
          customKey: `ark:/53696/${this.props.customKey}`
        })}
      >
        {({ data: { searchArchives }, loading, errors }) => {
          if (!(errors === undefined || errors.length === 0))
            return <h3>Error</h3>;
          if (loading || !searchArchives) return <h3>Loading...</h3>;
          const item = searchArchives.items[0];
          var miradorConfig = {
            id: "mirador_viewer",
            data: [
              {
                manifestUri: item.manifest_url,
                location: "IAWA"
              }
            ],
            windowObjects: [
              {
                loadedManifest: item.manifest_url,
                viewType: "ImageView"
              }
            ],
            showAddFromURLBox: false
          };

          // log archive identifier in ga
          window.ga("send", "pageview", {
            dimension1: item.identifier
          });
          if (this.state.languages) {
            return (
              <div className="item-page-wrapper">
                <SiteTitle
                  siteTitle={this.props.siteDetails.siteTitle}
                  pageTitle={item.title}
                />
                <SearchBar
                  dataType={this.state.dataType}
                  view={this.state.view}
                  searchField={this.state.searchField}
                  setPage={this.setPage}
                  updateFormState={this.updateFormState}
                />

                <div className="item-image-section">
                  <div className="breadcrumbs-wrapper">
                    <Breadcrumbs dataType={"Archives"} record={item} />
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <Viewer config={miradorConfig} />
                    </div>
                  </div>
                </div>
                <div className="row item-details-section">
                  <div className="col-lg-6 details-section-description">
                    <h4>{item.title}</h4>
                    {item.description.split("\n").map((value, index) => {
                      return <p key={index}>{value}</p>;
                    })}
                  </div>
                  <div className="col-lg-6 details-section-metadata">
                    <table>
                      <tbody>
                        <RenderItemsDetailed
                          keyArray={KeyArray}
                          item={item}
                          languages={this.state.languages}
                        />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          } else {
            return <></>;
          }
        }}
      </Connect>
    );
  }
}

export default ArchivePage;
