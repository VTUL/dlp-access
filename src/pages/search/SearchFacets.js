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
      languageList: [],
      dateList: []
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
    this.loadCategoryFacet();
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
    this.loadFieldFacet(Creators, "creator", "creatorList");
    const Languages = ["en", "fr"];
    this.loadFieldFacet(Languages, "language", "languageList");
    this.loadDateFacet();
  }

  async loadCategoryFacet() {
    let categoryNodes = [];
    const Categories = ["collection", "archive"];

    for (const category of Categories) {
      let filter = {
        ...this.props.filters,
        ...this.searchInput(),
        category: category
      };
      let options = { filter: filter };
      let searchResults = await fetchSearchResults(this, options);
      let total = searchResults.total;
      if (total > 0) {
        categoryNodes.push({
          label: category,
          count: total,
          selected: this.props.filters.category === category
        });
      }
    }
    if (this._isMounted) {
      this.setState({ categoryList: categoryNodes });
    }
  }

  async loadFieldFacet(facetValues, field, fieldList) {
    let facetNodes = [];

    for (const value of facetValues) {
      let filter = {
        ...this.props.filters,
        ...this.searchInput(),
        [field]: value
      };
      let options = { filter: filter };
      let searchResults = await fetchSearchResults(this, options);
      let total = searchResults.total;
      if (total > 0) {
        facetNodes.push({
          label: value,
          count: total,
          selected: this.props.filters[field] === value
        });
      }
    }
    if (this._isMounted) {
      this.setState({ [fieldList]: facetNodes });
    }
  }

  async loadDateFacet() {
    let dateNodes = [];
    const DateRanges = [
      ["1920", "1939"],
      ["1940", "1959"],
      ["1960", "1979"],
      ["1980", "1999"],
      ["2000", "2019"]
    ];

    for (const dateRange of DateRanges) {
      let start_date = `${dateRange[0]} - ${dateRange[1]}`;
      let filter = {
        ...this.props.filters,
        ...this.searchInput(),
        date: start_date
      };
      let options = { filter: filter };
      let searchResults = await fetchSearchResults(this, options);
      let total = searchResults.total;
      if (total > 0) {
        dateNodes.push({
          label: start_date,
          count: total,
          selected: this.props.filters.date === start_date
        });
      }
    }
    if (this._isMounted) {
      this.setState({ dateList: dateNodes });
    }
  }

  render() {
    const facetFields = ["category", "creator", "language", "date"];
    return (
      <div>
        <h2>Filter</h2>
        <div className="collection-detail">
          {facetFields.map((field, idx) => (
            <Collapsible
              filters={this.props.filters}
              filterField={field}
              updateFormState={this.props.updateFormState}
              facetNodes={this.state[`${field}List`]}
              multiSelect={false}
              key={idx}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default SearchFacets;
