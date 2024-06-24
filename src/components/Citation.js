import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "../css/Citation.scss";

class Citation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedCitation: false
    };
    this.copyTimer = null;
  }

  getCitation = () => {
    return {
      creator: this.getCreator(),
      title: `${this.props.item.title || "Untitled"}. `,
      dlpInstance: this.getDLPInstance() + ", ",
      sponsor:
        "Virginia Polytechnic Institute and State University, University Libraries. ",
      permalink: this.getPermalink(),
      accessDate: this.getAccessDate() + "."
    };
  };

  getCreator = () => {
    if (this.props.item.creator) {
      const { creator } = this.props.item;
      return creator.join(", ") + ". ";
    }
    return null;
  };

  getDLPInstance = () => {
    const { siteName } = this.props.site;
    return siteName
      ? `Virginia Tech Digital Library, ${siteName}`
      : "Virginia Tech Digital Library";
  };

  getPermalink = () => {
    const redirectURL = this.getRedirectURL();
    return `${redirectURL}/${this.props.item.custom_key}`;
  };

  getRedirectURL = () => {
    let redirect = "";
    try {
      const options = JSON.parse(this.props.site.siteOptions);
      if (options.redirectURL) {
        redirect = options.redirectURL;
      }
    } catch (error) {
      console.log("Redirect url not defined in site config.");
    }
    return redirect;
  };

  getAccessDate = () => {
    const currentDate = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return currentDate.toLocaleDateString("en-US", options);
  };

  onCopyCitation = () => {
    const { copiedCitation } = this.state;
    if (!copiedCitation) {
      const citationText = this.generateCitationText();
      navigator.clipboard.writeText(citationText).then(
        () => {
          this.setState({ copiedCitation: true });
          this.copyTimer = setTimeout(
            () => this.setState({ copiedCitation: false }),
            1000
          );
        },
        (err) => {
          console.error("Failed to copy citation: ", err);
        }
      );
    }
  };

  generateCitationText = () => {
    const citation = this.getCitation();
    return `${citation.creator || ""}${citation.title}${citation.dlpInstance}${
      citation.sponsor
    }${citation.permalink} accessed ${citation.accessDate}`;
  };

  componentWillUnmount() {
    clearTimeout(this.copyTimer);
  }

  render() {
    const citationObj = this.getCitation();
    const { copiedCitation } = this.state;

    return (
      <div aria-label="Item Citation" className="citation-section">
        <div className="citation-heading">Cite this Item</div>
        <div className="citation">
          <div aria-label="Citation Suggest Text" className="suggest-text">
            Here is our suggested citation. Please refer to this{" "}
            <a
              href="https://guides.lib.vt.edu/find/citation-style-manuals/"
              target="_blank"
              rel="noopener noreferrer"
            >
              style guide
            </a>{" "}
            for complete compliance with various citation styles.
          </div>
          <div aria-label="Citation Text" className="citation-text">
            {citationObj.creator && <span>{citationObj.creator}</span>}
            <span className="title">{citationObj.title}</span>
            <span>{citationObj.dlpInstance}</span>
            <span>{citationObj.sponsor}</span>
            <span>
              <a href={citationObj.permalink} className="mr-1">
                {citationObj.permalink}
              </a>
            </span>
            <span>{`accessed ${citationObj.accessDate}`}</span>
          </div>
          <button
            aria-label="Copy citation to clipboard"
            type="button"
            className="btn btn-secondary citation-copy-button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Copy to clipboard"
            onClick={this.onCopyCitation}
            disabled={copiedCitation}
          >
            {copiedCitation ? (
              <>
                <FontAwesomeIcon icon={faCheck} size="1x" className="mr-1" />
                Copied!
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCopy} size="1x" className="mr-1" />
                Copy Citation
              </>
            )}
          </button>
        </div>
      </div>
    );
  }
}

export default Citation;
