import React, { Component } from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import * as queries from "../graphql/queries";
import SearchBar from "../components/SearchBar";
import SearchTable from "../components/SearchTable";

class SearchPage extends Component {
  render() {
    const searchQuery = new URLSearchParams(this.props.location.search);
    return (
      <Connect
        query={graphqlOperation(queries.searchArchives, {
          filter: {
            visibility: { eq: true },
            [searchQuery.get("search_field")]: {
              matchPhrase: searchQuery.get("q")
            }
          },
          sort: {
            field: "identifier",
            direction: "asc"
          },
          limit: 10
        })}
      >
        {({ data: { searchArchives }, loading, errors }) => {
          if (!(errors === undefined || errors.length === 0))
            return <h3>Error</h3>;
          if (loading || !searchArchives) return <h3>Loading...</h3>;
          return (
            <div>
              <SearchBar />
              <div className="container">
                <div class="row">
                  <div id="sidebar" className="col-md-3 col-sm-4">
                    {/* <h2>Limit your search</h2> */}
                  </div>
                  <div id="content" className="col-md-9 col-sm-8">
                    <div id="search-results">
                      <ul>
                        {searchArchives.items.map(item => (
                          <li key={item.id}>
                            <SearchTable archive={item} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Connect>
    );
  }
}
export default SearchPage;
