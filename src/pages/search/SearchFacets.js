import React, { Component } from "react";
import { fetchSearchResults } from "../../lib/fetchTools";
import Collapsible from "../../components/Collapsible";
import "../../css/ListPages.css";
import "../../css/SearchResult.css";

class SearchFacets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      creatorList: [],
      dateList: [],
      formatList: [],
      languageList: [],
      mediumList: [],
      resource_typeList: []
    };
    this._isMounted = false;
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

  async loadFacets() {
    const Categories = ["collection", "archive"];
    this.loadFieldFacet(Categories, "category", "categoryList", false);
    const Creators = [
      "Alexander, Dorothy Baxter",
      "Chadeayne, Olive, 1904-2001",
      "Cochrane, Margaret Ann",
      "Crawford, Martha J. (1925-1994)",
      "King, Dorothee Stelzer (1934- )",
      "Pfeiffer, Alberta, 1899-1994",
      "Rodeck, Melita (1914-2011)",
      "Roth, E. Maria",
      "Rudoff, Lorraine (1920- )",
      "Tebbs, Robert W.",
      "Young, Jean Linden (1922-1997)"
    ];
    this.loadFieldFacet(Creators, "creator", "creatorList", false);
    const DateRanges = [
      "1920 - 1939",
      "1940 - 1959",
      "1960 - 1979",
      "1980 - 1999",
      "2000 - 2019"
    ];
    this.loadFieldFacet(DateRanges, "date", "dateList", false);
    const Formats = [
      "12 in. x 17 in.",
      "12 in. x 18 in.",
      "13.5 in. x 16 in.",
      "30.48 cm x 43.18 cm",
      "30.48 cm x 45.72 cm",
      "34.29 cm x 40.64 cm",
      "Scale: 1/8 in. = 1 ft.",
      "Scale: 1/16 in. = 1 ft."
    ];
    this.loadFieldFacet(Formats, "format", "formatList", true);
    const Languages = ["en", "fr"];
    this.loadFieldFacet(Languages, "language", "languageList", false);
    const Mediums = ["Blueprints", "Diazotypes (copies)", "Ink"];
    this.loadFieldFacet(Mediums, "medium", "mediumList", true);
    const Types = [
      "Architectural drawings (visual works)",
      "Conceptual drawings",
      "Elevations (orthographic projections)",
      "Floor plans (orthographic projections)",
      "Sections (orthographic projections)",
      "Site plans",
      "Sketches"
    ];
    this.loadFieldFacet(Types, "resource_type", "resource_typeList", true);
  }

  setFilters(field, value, isMulti) {
    let updatedFilters = {};
    let updatedFieldValues = null;
    if (isMulti) {
      if (
        this.props.filters.hasOwnProperty(field) &&
        Array.isArray(this.props.filters[field])
      ) {
        if (this.props.filters[field].indexOf(value) === -1) {
          updatedFieldValues = this.props.filters[field].concat([value]);
        } else {
          updatedFieldValues = this.props.filters[field];
        }
      } else {
        updatedFieldValues = [value];
      }
    } else {
      updatedFieldValues = value;
    }
    updatedFilters = {
      ...this.props.filters,
      ...this.searchInput(),
      [field]: updatedFieldValues
    };
    return updatedFilters;
  }

  async loadFieldFacet(facetValues, field, fieldList, isMulti) {
    let facetNodes = [];
    for (const value of facetValues) {
      let updatedFilters = this.setFilters(field, value, isMulti);
      let options = { filter: updatedFilters };
      let searchResults = await fetchSearchResults(this, options);
      let total = searchResults.total;
      let isSelected = false;
      if (isMulti) {
        if (
          this.props.filters[field] &&
          this.props.filters[field].includes(value)
        ) {
          isSelected = true;
        }
      } else {
        isSelected = this.props.filters[field] === value;
      }
      if (total > 0) {
        facetNodes.push({
          label: value,
          count: total,
          selected: isSelected
        });
      }
    }
    if (this._isMounted) {
      this.setState({ [fieldList]: facetNodes });
    }
  }

  render() {
    const facetFields = [
      "category",
      "creator",
      "date",
      "format",
      "language",
      "medium",
      "resource_type"
    ];
    const multiFields = ["format", "medium", "resource_type"];
    return (
      <div>
        <h2>Filter</h2>
        <div className="collection-detail" data-cy="filter-collapsibles">
          {facetFields.map((field, idx) => (
            <Collapsible
              filters={this.props.filters}
              filterField={field}
              updateFormState={this.props.updateFormState}
              facetNodes={this.state[`${field}List`]}
              multiSelect={multiFields.includes(field) ? true : false}
              key={idx}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default SearchFacets;
