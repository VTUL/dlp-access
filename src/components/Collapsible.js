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
      expanded: false,
      fullList: false
    };

    this.togglePanel = this.togglePanel.bind(this);
    this.allLessButton = this.allLessButton.bind(this);
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
    let filterValues = [];
    if (this.props.multiSelect) {
      if (Array.isArray(this.props.filters[this.props.filterField])) {
        if (this.props.filters[this.props.filterField].includes(name)) {
          filterValues = this.props.filters[this.props.filterField].filter(
            function(value) {
              return value !== name;
            }
          );
        } else {
          filterValues = this.props.filters[this.props.filterField].concat([
            name
          ]);
        }
      } else {
        filterValues = [name];
      }
      if (filterValues.length > 0) {
        this.updateFilters({
          ...this.props.filters,
          [this.props.filterField]: filterValues
        });
      } else {
        delete this.props.filters[this.props.filterField];
        this.updateFilters(this.props.filters);
      }
    } else {
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
    }
  };

  allLessButton(e) {
    this.setState({ fullList: !this.state.fullList });
  }

  partialListLength() {
    let len = this.props.facetNodes.length;
    if (!this.state.fullList && this.props.facetNodes.length > 5) {
      len = 5;
    }
    return len;
  }

  scrollableClassName() {
    if (this.partialListLength() > 5) {
      return "scroll";
    } else {
      return "";
    }
  }

  render() {
    const DisplayAllLess = () => {
      if (this.props.facetNodes.length > 5) {
        return this.partialListLength() > 5 ? (
          <button className="less" data-cy="show-less-button">
            Show Less
          </button>
        ) : (
          <button className="more" data-cy="show-all-button">
            Show All
          </button>
        );
      } else return null;
    };

    return (
      <div>
        <div
          onClick={e => this.togglePanel(e)}
          className="facet-title"
          data-cy="filter-collapsible"
        >
          {labelAttr(this.props.filterField)}
          {this.state.expanded ? (
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
              size="1x"
              color="#75787b"
              className="float-right"
            />
          ) : (
            <FontAwesomeIcon
              icon={faAngleDoubleDown}
              size="1x"
              color="#75787b"
              className="float-right"
            />
          )}
        </div>
        {this.state.expanded ? (
          <div>
            <div className={`facet-listing ${this.scrollableClassName()}`}>
              {this.props.facetNodes
                .slice(0, this.partialListLength())
                .map(value => (
                  <Checkbox
                    label={`${labelAttr(value["label"])} (${value["count"]})`}
                    name={value["label"]}
                    selected={value["selected"]}
                    onCheckboxChange={this.handleCheckboxChange}
                    key={value["label"]}
                  />
                ))}
            </div>
            <div onClick={e => this.allLessButton(e)} className="all-less">
              <DisplayAllLess />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Collapsible;
