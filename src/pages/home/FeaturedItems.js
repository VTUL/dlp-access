import React, { Component } from "react";
import FeaturedItem from "./FeaturedItem";

import "../../css/FeaturedItems.css";

class FeaturedItems extends Component {
  constructor() {
    super();
    this.state = {
      startIndex: 0,
      endIndex: 4
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(start, end) {
    this.setState({
      startIndex: start,
      endIndex: end
    });
  }

  render() {
    if (this.props.featuredItems) {
      const tiles = this.props.featuredItems
        .slice(this.state.startIndex, this.state.endIndex)
        .map((item, index) => {
          return <FeaturedItem key={index} tile={item} />;
        });

      return (
        <div className="featured-items-wrapper">
          <div className="featured-items-heading">
            <h2>
              Our Featured <span>Items</span>
            </h2>
          </div>

          <div className="row">{tiles}</div>

          {/* Indicators - dots*/}
          <div className="featured-items-indicators">
            <span
              className={this.state.startIndex === 0 ? "dot dot-active" : "dot"}
              onClick={() => this.handleClick(0, 4)}
            ></span>
            <span
              className={this.state.startIndex === 4 ? "dot dot-active" : "dot"}
              onClick={() => this.handleClick(4, 8)}
            ></span>
            <span
              className={this.state.startIndex === 8 ? "dot dot-active" : "dot"}
              onClick={() => this.handleClick(8, 13)}
            ></span>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}
export default FeaturedItems;
