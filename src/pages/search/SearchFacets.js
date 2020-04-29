import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import "../../css/ListPages.css";
import "../../css/SearchResult.css";

class SearchFacets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      facetNodes: null
    };
    this._isMounted = false;
    this.togglePanel = this.togglePanel.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadFacets(this.props.field);
  }

  togglePanel(e) {
    this.setState({ open: !this.state.open });
  }

  componentWillUnmount() {
    this._isMounted = false;
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
    const REP_TYPE = process.env.REACT_APP_REP_TYPE;
    let archiveFilter = {
      item_category: { eq: REP_TYPE },
      visibility: { eq: true }
    };
    let fieldFacet = [];
    let searchPhrase = {};
    if (field === this.props.field) {
      for (const [index, value] of this.dateRanges.entries()) {
        searchPhrase = {
          start_date: { gte: `${value[0]}/01/01`, lte: `${value[1]}/12/31` }
        };
        archiveFilter = { ...archiveFilter, ...searchPhrase };
        const Archives = await API.graphql(
          graphqlOperation(queries.searchArchives, {
            filter: archiveFilter
          })
        );
        let total = Archives.data.searchArchives.total;
        if (total > 0) {
          fieldFacet.push({ label: this.date(value), count: total });
        }
      }
      if (this._isMounted) {
        this.setState({ facetNodes: fieldFacet });
      }
    }
  }

  render() {
    return (
      <div>
        <div onClick={e => this.togglePanel(e)} className="facet-header">
          {this.props.field}
        </div>
        {this.state.open ? (
          <div className="facet-listing">
            <ul>
              {this.state.facetNodes.map((value, index) => {
                return (
                  <li key={index}>
                    {value["label"]} ({value["count"]})
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

export default SearchFacets;
