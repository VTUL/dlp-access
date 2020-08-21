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
          return (
            <FeaturedItem
              key={index}
              tile={item}
              position={index + 1}
              length={this.props.featuredItems.length}
            />
          );
        });

      return (
        <div
          className="featured-items-wrapper"
          role="region"
          aria-roledescription="carousel"
          aria-label="Our Featured Items"
        >
          <div className="featured-items-heading">
            <h2>
              Our Featured <span>Items</span>
            </h2>
          </div>
          <div className="row" id="slide-row" aria-live="off">
            {tiles}
          </div>
          {/* Indicators - dots*/}
          <div
            className="featured-items-indicators"
            role="group"
            aria-label="Choose slide group"
          >
            <button
              aria-label="Slide group one"
              className={this.state.startIndex === 0 ? "dot dot-active" : "dot"}
              onClick={() => this.handleClick(0, 4)}
              type="button"
              aria-disabled={this.state.startIndex === 0 ? true : false}
              aria-controls="slide-row"
            ></button>
            <button
              aria-label="Slide group two"
              className={this.state.startIndex === 4 ? "dot dot-active" : "dot"}
              onClick={() => this.handleClick(4, 8)}
              type="button"
              aria-disabled={this.state.startIndex === 4 ? true : false}
              aria-controls="slide-row"
            ></button>
            <button
              aria-label="Slide group three"
              className={this.state.startIndex === 8 ? "dot dot-active" : "dot"}
              onClick={() => this.handleClick(8, 13)}
              type="button"
              aria-disabled={this.state.startIndex === 8 ? true : false}
              aria-controls="slide-row"
            ></button>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}
export default FeaturedItems;
