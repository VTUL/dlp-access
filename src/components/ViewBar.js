import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThList, faTh, faImages } from "@fortawesome/free-solid-svg-icons";
import "../css/SearchResult.css";

class ViewBar extends Component {
  constructor(props) {
    super(props);
    this.updateView = this.updateView.bind(this);
    this.state = {
      q: props.q,
      view: props.view
    };
  }

  updateView(view_type) {
    this.props.updateFormState("view", view_type);
  }

  render() {
    return (
      <div>
        <div className="btn-group mr-2" aria-label="View Options">
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
              style={{ color: "red" }}
            />
          </button>
          <button
            className="btn btn-outline-light"
            data-toggle="tooltip"
            title="Gallery"
            onClick={() => this.updateView("Gallery")}
            active={(this.state.view === "Gallery").toString()}
          >
            <FontAwesomeIcon icon={faTh} size="lg" style={{ color: "red" }} />
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
              style={{ color: "red" }}
            />
          </button>
        </div>
      </div>
    );
  }
}
export default ViewBar;
