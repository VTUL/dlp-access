import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faAngleDoubleDown
} from "@fortawesome/free-solid-svg-icons";
import { labelAttr } from "../lib/MetadataRenderer";
import Checkbox from "./Checkbox";

import "../css/collapsible.css";

class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };

    this.togglePanel = this.togglePanel.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  togglePanel(e) {
    this.setState({ expanded: !this.state.expanded });
  }

  updateFilters = filters => {
    this.props.updateFormState("filters", filters);
  };

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;
    if (
      this.props.filters &&
      this.props.filters[this.props.filterField] === name
    ) {
      delete this.props.filters[this.props.filterField];
      this.updateFilters(this.props.filters);
    } else {
      this.updateFilters({
        ...this.props.filters,
        [this.props.filterField]: name
      });
    }
  };

  render() {
    return (
      <div>
        <div
          onClick={e => this.togglePanel(e)}
          className="facet-header"
          data-cy="filter-collapsible"
        >
          {labelAttr(this.props.filterField)}
          {this.state.expanded ? (
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
              size="lg"
              color="orange"
              className="float-right"
            />
          ) : (
            <FontAwesomeIcon
              icon={faAngleDoubleDown}
              size="lg"
              color="orange"
              className="float-right"
            />
          )}
        </div>
        {this.state.expanded ? (
          <div className="facet-listing">
            {this.props.facetNodes.map(value => (
              <Checkbox
                label={`${labelAttr(value["label"])} (${value["count"]})`}
                name={value["label"]}
                selected={value["selected"]}
                onCheckboxChange={this.handleCheckboxChange}
                key={value["label"]}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Collapsible;
