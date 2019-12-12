import React, { Component } from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import * as queries from "../graphql/queries";
import SearchBar from "../components/SearchBar";
import ViewBar from "../components/ViewBar";
import Items from "../components/Items";
import "../css/SearchResult.css";

class ItemsPage extends Component {
  constructor(props) {
    super(props);
    this.updateFormState = this.updateFormState.bind(this);
    this.state = {
      view: props.view
    };
  }

  updateFormState(name, val) {
    this.setState({
      [name]: val
    });
  }

  render() {
    return (
      <Connect
        query={graphqlOperation(queries.searchArchives, {
          filter: {
            visibility: { eq: true }
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
              <SearchBar view={this.state.view} />
              <div className="container">
                <div className="row">
                  <div id="sidebar" className="col-md-3 col-sm-4">
                    {/* <h2>Limit your search</h2> */}
                  </div>
                  <div id="content" className="col-md-9 col-sm-8">
                    <div>
                      <ViewBar
                        view={this.state.view}
                        updateFormState={this.updateFormState}
                      />
                    </div>
                    <Items
                      items={searchArchives.items}
                      view={this.state.view}
                    />
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

export default ItemsPage;
