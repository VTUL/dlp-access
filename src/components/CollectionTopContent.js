import React, { Component } from "react";
import { addNewlineInDesc } from "../lib/MetadataRenderer";
import { Storage } from "aws-amplify";
import { getFile } from "../lib/fetchTools";
import "../css/CollectionsShowPage.scss";

class CollectionTopContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionTruncated: true,
      collectionThumbnail: "",
      rss: ""
    };
  }

  getDescription() {
    let description = this.props.description;
    if (description && this.state.descriptionTruncated) {
      description = description.substr(0, this.props.TRUNCATION_LENGTH);
    }
    return addNewlineInDesc(description);
  }

  moreLessButtons(text) {
    let moreLess = <></>;
    if (text && text.length >= this.props.TRUNCATION_LENGTH) {
      moreLess = (
        <span>
          <button
            onClick={e => this.onMoreLessClick(e)}
            className="more"
            type="button"
            aria-controls="collection-description"
            aria-expanded="false"
          >
            . . .[more]
          </button>
          <button
            onClick={e => this.onMoreLessClick(e)}
            className="less"
            type="button"
            aria-controls="collection-description"
            aria-expanded="true"
          >
            . . .[less]
          </button>
        </span>
      );
    }
    return moreLess;
  }

  onMoreLessClick(e) {
    e.preventDefault();
    let truncated = true;
    if (this.state.descriptionTruncated) {
      truncated = false;
    }
    this.setState({ descriptionTruncated: truncated }, function() {
      this.render();
    });
  }

  getFeeds = () => {
    let links = this.props.collectionOptions.podcast_links.map(link => {
      let l = link.toLowerCase();
      if (l.indexOf("amazon.com") >= 0) {
        return (
          <li key="amazon">
            <a
              href={l}
              target="_blank"
              rel="noopener noreferrer"
              className="border-square"
            >
              <img
                src="https://static.lib.vt.edu/vtdlp/images/Amazon.png"
                alt="Listen on Amazon Music"
              />
            </a>
          </li>
        );
      } else if (l.indexOf("apple.com") >= 0) {
        return (
          <li key="apple">
            <a
              href={l}
              target="_blank"
              rel="noopener noreferrer"
              className="border-square"
            >
              <img
                src="https://static.lib.vt.edu/vtdlp/images/Apple.svg"
                alt="Listen on Apple Music"
              />
            </a>
          </li>
        );
      } else if (l.indexOf("goo.gl") >= 0) {
        return (
          <li key="google">
            <a
              href={l}
              target="_blank"
              rel="noopener noreferrer"
              className="border-curved"
            >
              <img
                src="https://static.lib.vt.edu/vtdlp/images/Google.svg"
                alt="Listen on Google Podcasts"
              />
            </a>
          </li>
        );
      } else if (l.indexOf("spotify.com") >= 0) {
        return (
          <li key="spotify" className="badge-outline">
            <a
              href={l}
              target="_blank"
              rel="noopener noreferrer"
              className="border-curved"
            >
              <img
                className="p-1"
                src="https://static.lib.vt.edu/vtdlp/images/Spotify.png"
                alt="Listen on Spotify"
              />
            </a>
          </li>
        );
      } else if (l.indexOf("stitcher.com") >= 0) {
        return (
          <li key="stitcher">
            <a
              href={l}
              target="_blank"
              rel="noopener noreferrer"
              className="border-square"
            >
              <img
                src="https://static.lib.vt.edu/vtdlp/images/Stitcher.png"
                alt="Listen on Stitcher"
              />
            </a>
          </li>
        );
      } else if (l.indexOf("breaker.audio") >= 0) {
        return (
          <li key="breaker" className="badge-outline">
            <a
              href={l}
              target="_blank"
              rel="noopener noreferrer"
              className="border-curved"
            >
              <img
                src="https://static.lib.vt.edu/vtdlp/images/breaker--white.svg"
                alt="Listen on Breaker"
              />
            </a>
          </li>
        );
      } else if (l.indexOf("radiopublic.com") >= 0) {
        return (
          <li key="radio_public">
            <a
              href={l}
              target="_blank"
              rel="noopener noreferrer"
              className="border-square"
            >
              <img
                src="https://static.lib.vt.edu/vtdlp/images/radiopublic-white.png"
                alt="Listen on Radio Public"
              />
            </a>
          </li>
        );
      } else if (l.indexOf("pocketcasts.com") >= 0) {
        return (
          <li key="pocket_casts">
            <a
              href={l}
              target="_blank"
              rel="noopener noreferrer"
              className="border-square"
            >
              <img
                src="https://static.lib.vt.edu/vtdlp/images/pocketcasts.png"
                alt="Listen on Pocket Casts"
              />
            </a>
          </li>
        );
      } else if (l.indexOf("tunein.com") >= 0) {
        return (
          <li key="tunein">
            <a
              href={l}
              target="_blank"
              rel="noopener noreferrer"
              className="border-square"
            >
              <img
                src="https://static.lib.vt.edu/vtdlp/images/tunein.png"
                alt="Listen on Tune In"
              />
            </a>
          </li>
        );
      } else if (l.indexOf("podchaser.com") >= 0) {
        return (
          <li key="podchaser">
            <a
              href={l}
              target="_blank"
              rel="noopener noreferrer"
              className="border-square"
            >
              <img
                src="https://static.lib.vt.edu/vtdlp/images/podchaser.png"
                alt="Listen on Podchaser"
              />
            </a>
          </li>
        );
      } else if (l.indexOf("podbean.com") >= 0) {
        return (
          <li key="podbean">
            <a
              href={l}
              target="_blank"
              rel="noopener noreferrer"
              className="border-square"
            >
              <img
                src="https://static.lib.vt.edu/vtdlp/images/podbean.png"
                alt="Listen on Podbean"
              />
            </a>
          </li>
        );
      } else if (l.indexOf("castbox.fm") >= 0) {
        return (
          <li key="castbox">
            <a
              href={l}
              target="_blank"
              rel="noopener noreferrer"
              className="border-square"
            >
              <img
                src="https://static.lib.vt.edu/vtdlp/images/Castbox.svg"
                alt="Listen on Castbox"
              />
            </a>
          </li>
        );
      } else {
        console.log(`Error: ${l}`);
        return <></>;
      }
    });

    return links;
  };

  getRSS = () => {
    if (this.state.rss) {
      return (
        <li key="rss" className="custom-badge">
          <a href={this.state.rss} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-rss"></i>
            RSS Link
          </a>
        </li>
      );
    }
  };

  creatorDates(creator) {
    if (creator) {
      return <span className="creator">Created by: {creator}</span>;
    } else {
      return <span></span>;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.collectionImg !== prevProps.collectionImg) {
      getFile(this.props.collectionImg, "image", this, "collectionThumbnail");
    }
  }

  componentDidMount() {
    if (this.props.collectionImg) {
      getFile(this.props.collectionImg, "image", this, "collectionThumbnail");
    }

    if (this.props.siteId === "podcasts") {
      let rss_link = `https://${
        Storage._config.AWSS3.bucket
      }.s3.amazonaws.com/public/sitecontent/text/${process.env.REACT_APP_REP_TYPE.toLowerCase()}/rss/${
        this.props.customKey
      }.rss`;
      getFile(rss_link, "text", this, "rss");
    }
  }

  render() {
    return (
      <div
        className="top-content-row row"
        role="region"
        aria-labelledby="collection-page-title"
      >
        <div className="collection-img-col col-sm-4">
          <img src={this.state.collectionThumbnail} alt="" />
        </div>
        <div className="collection-details-col col-md-8">
          <h1 className="collection-title" id="collection-page-title">
            {this.props.collectionTitle}
          </h1>
          <div className="post-heading">
            {this.creatorDates(this.props.creator)}
            <span className="last-updated">
              Last updated: {new Date(this.props.updatedAt).toString()}
            </span>
          </div>
          <div
            className={`description ${
              this.state.descriptionTruncated ? "trunc" : "full"
            }`}
            id="collection-description"
          >
            <div>
              <h2 className="introduction">Introduction</h2>
              {this.getDescription()}{" "}
              {this.moreLessButtons(this.props.description)}
            </div>
          </div>
          {this.props.siteId === "podcasts" ? (
            <ul className="feed-links">
              {this.props.collectionOptions &&
              this.props.collectionOptions.podcast_links &&
              this.props.collectionOptions.podcast_links.length ? (
                this.getFeeds()
              ) : (
                <></>
              )}
              {this.getRSS()}
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

export default CollectionTopContent;
