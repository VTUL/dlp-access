import React, { Component } from "react";

class HomeStatement extends Component {
  render() {
    if (this.props.statement && this.props.statement !== "") {
      return (
        <div
          className="home-statement"
          dangerouslySetInnerHTML={{ __html: this.props.statement }}
        ></div>
      );
    } else {
      return <></>;
    }
  }
}

export default HomeStatement;
