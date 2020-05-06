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
    const buttons = this.props.pageViews.map((button, index) => {
      return (
        <button
          key={index}
          className="btn btn-outline-light"
          data-toggle="tooltip"
          title={button}
          onClick={() => this.updateView(button)}
          active={(this.state.view === button).toString()}
        >
          <FontAwesomeIcon
            icon={
              button === "Gallery"
                ? faTh
                : button === "List"
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
