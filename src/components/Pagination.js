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
      let textBefore = this.props.isSearch ? "Search Results:" : "Displaying";
      return (
        <div>
          {textBefore} {this.lowerBound()} {this.upperBound()} of{" "}
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

    if (this.props.atBottom) {
      return (
        <div>
          <Displaying />
          <Previous />
          <Next />
        </div>
      );
    } else {
      return (
        <div>
          <Displaying />
        </div>
      );
    }
  }
}

export default Pagination;
