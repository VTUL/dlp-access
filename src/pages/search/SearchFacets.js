import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faAngleDoubleDown
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import qs from "query-string";
import { labelAttr } from "../../lib/MetadataRenderer";
import { fetchSearchResults } from "../../lib/fetchTools";
import "../../css/ListPages.css";
import "../../css/SearchResult.css";

class SearchFacets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      facetNodes: []
    };
    this._isMounted = false;
    this.togglePanel = this.togglePanel.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadFacets("date");
  }

  togglePanel(e) {
    this.setState({ open: !this.state.open });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.loadFacets("date");
    }
  }

  dateRanges = [
    ["1920", "1939"],
    ["1940", "1959"],
    ["1960", "1979"],
    ["1980", "1999"],
    ["2000", "2019"]
  ];

  date = dateRange => {
    return `${dateRange[0]} - ${dateRange[1]}`;
  };

  async loadFacets(field) {
    let fieldFacet = [];
    let parsedObject = {
      data_type: this.props.dataType,
      search_field: field,
      view: this.props.view
    };

    for (const value of this.dateRanges) {
      let options = {
        filter: {
          start_date: { gte: `${value[0]}/01/01`, lte: `${value[1]}/12/31` }
        }
      };
      let searchResults = await fetchSearchResults(this, options);
      let total = searchResults.total;
      if (total > 0) {
        let searchQuery = { q: this.date(value) };
        fieldFacet.push({
          label: this.date(value),
          path: `/search/?${qs.stringify({ ...parsedObject, ...searchQuery })}`,
          count: total
        });
      }
    }
    if (this._isMounted) {
      this.setState({ facetNodes: fieldFacet });
    }
  }

  render() {
    const defaultSearch = {
      data_type: this.props.dataType,
      search_field: "title",
      q: "",
      view: "List"
    };

    const FacetListing = () => {
      if (this.props.q) {
        return (
          <div className="collection-detail-value">
            {this.props.q} ({this.props.total})
            <NavLink to={`/search/?${qs.stringify(defaultSearch)}`}>
              <i className="fas fa-times"></i>
            </NavLink>
          </div>
        );
      } else {
        return (
          <ul>
            {this.state.facetNodes.map((value, index) => {
              return (
                <li key={index}>
                  <NavLink to={value["path"]}>
                    {value["label"]} ({value["count"]})
                  </NavLink>
                </li>
              );
            })}
          </ul>
        );
      }
    };

    return (
      <div>
        <div onClick={e => this.togglePanel(e)} className="facet-header">
          {this.props.q ? labelAttr(this.props.facetField) : "Years"}
          {this.state.open ? (
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
        {this.state.open ? (
          <div className="facet-listing">
            <FacetListing />
          </div>
        ) : null}
      </div>
    );
  }
}

export default SearchFacets;
