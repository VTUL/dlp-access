import React, { Component } from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import Viewer from "../Viewer";
import Table from "../Table";

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

class ItemPage extends Component {
  render() {
    return (
      <Connect
        query={graphqlOperation(GetArchive, {
          customKey: "ark:/53696/" + this.props.customKey
        })}
      >
        {({ data: { searchArchives }, loading, errors }) => {
          if (!(errors === undefined || errors.length === 0))
            return <h3>Error</h3>;
          if (loading || !searchArchives) return <h3>Loading...</h3>;
          let item = searchArchives.items[0];
          let mirador_config = {
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

          let attributeList = [];
          const attrArray = [
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

          for (var key in item) {
            if (item.hasOwnProperty(key) && attrArray.includes(key)) {
              var item_values = item[key];
              var key_name = (
                key.charAt(0).toUpperCase() + key.slice(1)
              ).replace("_", " ");
              if (item_values) {
                if (key_name === "Start date") {
                  key_name = "Date";
                  var circa_date = item["circa"] ? item["circa"] : "";
                  var end_date = item["end_date"]
                    ? " - " + item["end_date"]
                    : "";
                  item_values = circa_date + item["start_date"] + end_date;
                } else if (key_name === "Custom key") {
                  key_name = "NOID";
                }
                attributeList.push({
                  name: key_name,
                  values: item_values
                });
              }
            }
          }

          return (
            <div>
              <h3>{item.title}</h3>
              <div className="row">
                <div className="col-sm-12">
                  <Viewer config={mirador_config} />
                </div>
              </div>
              <p>{item.description}</p>
              <div className="row">
                <div id="metadata_table" className="col-sm-12">
                  <Table rows={attributeList} />
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
