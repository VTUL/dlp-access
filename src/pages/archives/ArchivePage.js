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
  "provenance",
  "repository",
  "reference",
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
              <div>
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
                <div className="breadcrumbs-wrapper">
                  <Breadcrumbs dataType={"Archives"} record={item} />
                </div>
                <h3>{item.title}</h3>
                <div className="row">
                  <div className="col-sm-12">
                    <Viewer config={miradorConfig} />
                  </div>
                </div>
                <p>{item.description}</p>
                <div className="details-section">
                  <div className="details-section-header">
                    <h2>Archive Details</h2>
                  </div>
                  <div className="details-section-content">
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
