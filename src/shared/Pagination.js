import React, { Component } from "react";
import { Button } from "semantic-ui-react";

import "../css/CollectionsListPage.css";

class Pagination extends Component {
  lowerBound() {
    return this.props.page * this.props.limit + 1;
  }

  upperBound() {
    const lower = this.lowerBound();
    const num = lower + this.props.numResults - 1;
    return num != lower ? `- ${num}` : "";
  }

  render() {
    const Displaying = () => {
      return (
        <div>
          Displaying {this.lowerBound()} {this.upperBound()} of{" "}
          {this.props.total}
        </div>
      );
    };
    const Previous = () => {
      if (this.props.page > 0) {
        return <Button onClick={this.props.previousPage}>Previous page</Button>;
      } else {
        return <div></div>;
      }
    };
    const Next = () => {
      if (this.props.page < this.props.totalPages - 1) {
        return <Button onClick={this.props.nextPage}>Next page</Button>;
      } else {
        return <div></div>;
      }
    };

    return (
      <div id="pagination-list-wrapper">
        <Displaying />
        <Previous />
        <Next />
      </div>
    );
  }
}

export default Pagination;
