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
    const buttons = this.props.pageViews.map((buttonType, index) => {
      return (
        <button
          key={index}
          className="btn btn-outline-light"
          data-toggle="tooltip"
          title={buttonType}
          onClick={() => this.updateView(buttonType)}
          active={(this.state.view === buttonType).toString()}
        >
          <FontAwesomeIcon
            icon={
              buttonType === "Gallery"
                ? faTh
                : buttonType === "List"
                ? faThList
                : faImages
            }
            size="lg"
            style={{ color: "var(--themeHighlightColor" }}
          />
        </button>
      );
    });
    return (
      <div className="btn-group" aria-label="View Options">
        {buttons}
      </div>
    );
  }
}
export default ViewBar;
