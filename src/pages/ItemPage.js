import React, { Component } from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import Viewer from "../components/Viewer";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import SetAttrArray from "../components/SetAttrArray";

const GetArchive = `query searchArchive($customKey: String) {
  searchArchives(filter: {
      custom_key: {
          eq: $customKey
      }
  })
  {
    items {
      id
      title
      description
      identifier
      belongs_to
      bibliographic_citation
      contributor
      creator
      custom_key
      format
      language
      location
      medium
      resource_type
      related_url
      rights_holder
      rights_statement
      source
      circa
      start_date
      end_date
      tags
      parent_collection
      manifest_url
    }
  }
}
`;

const keyArray = [
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

class ItemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: "title",
      q: "",
      view: "List"
    };
  }

  render() {
    return (
      <Connect
        query={graphqlOperation(GetArchive, {
          customKey: `ark:/53696/${this.props.match.params.customKey}`
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

          return (
            <div>
              <SearchBar view={this.state.view} />
              <h3>{item.title}</h3>
              <div className="row">
                <div className="col-sm-12">
                  <Viewer config={miradorConfig} />
                </div>
              </div>
              <p>{item.description}</p>
              <div className="row">
                <div id="metadata_table" className="col-sm-12">
                  <Table rows={SetAttrArray(keyArray, item)} />
                </div>
              </div>
            </div>
          );
        }}
      </Connect>
    );
  }
}

export default ItemPage;
