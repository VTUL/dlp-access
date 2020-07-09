import React, { Component } from "react";
import { fetchSearchResults } from "../../lib/fetchTools";
import Collapsible from "../../components/Collapsible";
import { NavLink } from "react-router-dom";
import qs from "query-string";
import "../../css/ListPages.css";
import "../../css/SearchResult.css";

class SearchFacets extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
  }

  hideModal = () => {
    this.props.updateModal();
  };

  componentWillMount() {
    const facetFields = this.loadfacetFields();
    facetFields.forEach(field => {
      this.setState({ [`${field.name}List`]: [] });
    });
  }
  componentDidMount() {
    this._isMounted = true;
    this.loadFacets();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.loadFacets();
    }
  }
  searchInput = () => {
    if (this.props.field && this.props.q) {
      return { [this.props.field]: this.props.q };
    } else return {};
  };

  loadfacetFields() {
    let facetFields = null;
    try {
      facetFields = this.props.searchFacets;
    } catch (err) {
      console.error("Error config search facets: ", err);
    }
    return facetFields || [];
  }

  async loadFacets() {
    const facetFields = this.loadfacetFields();
    facetFields.forEach(field => {
      this.loadFieldFacet(field.values, field.name);
    });
  }

  setFilters(name, value) {
    let updatedFilters = {};
    let updatedFieldValues = [];
    if (name === "category") {
      updatedFieldValues = value;
    } else {
      if (
        this.props.filters.hasOwnProperty(name) &&
        Array.isArray(this.props.filters[name])
      ) {
        if (this.props.filters[name].indexOf(value) === -1) {
          updatedFieldValues = this.props.filters[name].concat([value]);
        } else {
          updatedFieldValues = this.props.filters[name];
        }
      } else {
        updatedFieldValues = [value];
      }
    }
    updatedFilters = {
      ...this.props.filters,
      ...this.searchInput(),
      [name]: updatedFieldValues
    };
    return updatedFilters;
  }

  async loadFieldFacet(facetValues, fieldName) {
    let facetNodes = [];
    for (const value of facetValues) {
      let updatedFilters = this.setFilters(fieldName, value);
      let options = { filter: updatedFilters };
      let searchResults = await fetchSearchResults(this, options);
      let total = searchResults.total;
      let isSelected =
        this.props.filters[fieldName] &&
        this.props.filters[fieldName].includes(value)
          ? true
          : false;
      if (total > 0) {
        facetNodes.push({
          label: value,
          count: total,
          selected: isSelected
        });
      }
    }

    if (this._isMounted) {
      this.setState({ [`${fieldName}List`]: facetNodes });
    }
  }

  render() {
    const facetFields = this.loadfacetFields();
    return (
      <div className={this.props.isActive ? "facet-modal-wrapper" : null}>
        <div className="facet-wrapper">
          <h4 className="facet-heading">Filter My Results</h4>
          <div className="facet-fields" data-cy="filter-collapsibles">
            {facetFields.map((field, idx) => (
              <Collapsible
                filters={this.props.filters}
                filterField={field.name}
                updateFormState={this.props.updateFormState}
                facetNodes={this.state[`${field.name}List`]}
                key={idx}
              />
            ))}
            <div
              className="facet-modal-buttons"
              style={
                this.props.isActive ? { display: "flex" } : { display: "none" }
              }
            >
              <NavLink
                to={`/search/?${qs.stringify(this.props.defaultSearch)}`}
              >
                Clear
              </NavLink>
              <button
                type="button"
                className="apply-filters"
                onClick={this.hideModal}
              >
                Apply Filters
              </button>
              <NavLink
                to={`/search/?${qs.stringify(this.props.defaultSearch)}`}
                onClick={this.hideModal}
              >
                X
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFacets;
