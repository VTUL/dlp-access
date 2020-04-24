import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThList, faTh, faImages } from "@fortawesome/free-solid-svg-icons";
import "../css/SearchResult.css";

class ViewBar extends Component {
  state = {
    view: this.props.view
  };

  updateView = viewType => {
    this.props.updateFormState("view", viewType);
  };

  render() {
    return (
      <div className="btn-group" aria-label="View Options">
        <button
          className="btn btn-outline-light"
          data-toggle="tooltip"
          title="List"
          onClick={() => this.updateView("List")}
          active={(this.state.view === "List").toString()}
        >
          <FontAwesomeIcon
            icon={faThList}
            size="lg"
            style={{ color: "var(--themeHighlightColor" }}
          />
        </button>
        <button
          className="btn btn-outline-light"
          data-toggle="tooltip"
          title="Gallery"
          onClick={() => this.updateView("Gallery")}
          active={(this.state.view === "Gallery").toString()}
        >
          <FontAwesomeIcon
            icon={faTh}
            size="lg"
            style={{ color: "var(--themeHighlightColor" }}
          />
        </button>
        <button
          className="btn btn-outline-light"
          data-toggle="tooltip"
          title="Masonry"
          onClick={() => this.updateView("Masonry")}
          active={(this.state.view === "Masonry").toString()}
        >
          <FontAwesomeIcon
            icon={faImages}
            size="lg"
            style={{ color: "var(--themeHighlightColor" }}
          />
        </button>
      </div>
    );
  }
}
export default ViewBar;
