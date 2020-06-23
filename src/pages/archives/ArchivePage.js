import React, { Component } from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import PDFViewer from "../../components/PDFViewer";
import AudioPlayer from "../../components/AudioPlayer";
import VideoPlayer from "../../components/VideoPlayer";
import KalturaPlayer from "../../components/KalturaPlayer";
import MiradorViewer from "../../components/MiradorViewer";
import SearchBar from "../../components/SearchBar";
import Breadcrumbs from "../../components/Breadcrumbs.js";
import SiteTitle from "../../components/SiteTitle";
import {
  RenderItemsDetailed,
  addNewlineInDesc
} from "../../lib/MetadataRenderer";
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
      category: "archive",
      searchField: "title",
      view: "Gallery",
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

  addNewlineInDesc(content) {
    if (content) {
      content = content.split("\n").map((value, index) => {
        return <p key={index}>{value}</p>;
      });
    }

    return content;
  }

  isImgURL(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  isAudioURL(url) {
    return url.match(/\.(mp3|ogg|wav)$/) != null;
  }

  isVideoURL(url) {
    return url.match(/\.(mp4)$/) != null;
  }

  isKalturaURL(url) {
    return url.match(/\.(kaltura.com)/) != null;
  }

  isPdfURL(url) {
    return url.match(/\.(pdf)$/) != null;
  }

  isJsonURL(url) {
    return url.match(/\.(json)$/) != null;
  }

  mediaDisplay(item) {
    let display = null;
    if (this.isJsonURL(item.manifest_url)) {
      const miradorConfig = {
        id: "mirador_viewer",
        data: [
          {
            manifestUri: item.manifest_url,
            location: this.props.siteDetails.siteId.toUpperCase()
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

      display = <MiradorViewer config={miradorConfig} />;
    } else if (this.isImgURL(item.manifest_url)) {
      display = (
        <img className="item-img" src={item.manifest_url} alt={item.title} />
      );
    } else if (this.isAudioURL(item.manifest_url)) {
      display = <AudioPlayer manifest_url={item.manifest_url} />;
    } else if (this.isVideoURL(item.manifest_url)) {
      display = <VideoPlayer manifest_url={item.manifest_url} />;
    } else if (this.isKalturaURL(item.manifest_url)) {
      display = <KalturaPlayer manifest_url={item.manifest_url} />;
    } else if (this.isPdfURL(item.manifest_url)) {
      display = (
        <PDFViewer manifest_url={item.manifest_url} title={item.title} />
      );
    } else {
      display = <></>;
    }
    return display;
  }

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
                  category={this.state.category}
                  view={this.state.view}
                  searchField={this.state.searchField}
                  setPage={this.setPage}
                  updateFormState={this.updateFormState}
                />

                <div className="item-image-section">
                  <div className="breadcrumbs-wrapper">
                    <Breadcrumbs category={"Archives"} record={item} />
                  </div>
                  <div className="row">
                    <div className="col-sm-12">{this.mediaDisplay(item)}</div>
                  </div>
                </div>
                <div className="row item-details-section">
                  <div className="col-lg-6 details-section-description">
                    <h4>{item.title}</h4>
                    {addNewlineInDesc(item.description)}
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
