import React, { Component } from "react";
import { Button } from "semantic-ui-react";

import "../css/ListPages.css";

class Pagination extends Component {
  lowerBound() {
    return this.props.page * this.props.limit + 1;
  }

  upperBound() {
    const lower = this.lowerBound();
    const num = lower + this.props.numResults - 1;
    return num !== lower ? `- ${num}` : "";
  }

  render() {
    const Displaying = () => {
      let displayingCopy = "";
      if (this.props.numResults === 0) {
        displayingCopy = <div>No results found</div>;
      } else {
        const textBefore = this.props.isSearch
          ? "Search Results:"
          : "Displaying:";
        displayingCopy = (
          <div className="pagination-text">
            {textBefore} {this.lowerBound()} {this.upperBound()} of{" "}
            {this.props.total}
          </div>
        );
      }
      return displayingCopy;
    };
    const Previous = () => {
      if (this.props.page > 0) {
        return (
          <Button onClick={this.props.previousPage}>&laquo; Previous</Button>
        );
      } else {
        return <div></div>;
      }
    };
    const Next = () => {
      if (this.props.page < this.props.totalPages - 1) {
        return <Button onClick={this.props.nextPage}>Next &raquo;</Button>;
      } else {
        return <div></div>;
      }
    };

    if (this.props.atBottom) {
      return (
        <div className="pagination-section">
          <Displaying />
          <Previous />
          <Next />
        </div>
      );
    } else {
      return (
        <div className="pagination-section">
          <Displaying />
        </div>
      );
    }
  }
}

export default Pagination;
