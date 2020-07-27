import React, { Component } from "react";

import "../../css/CollectionHighlights.css";

class CollectionHighlights extends Component {
  render() {
    if (this.props.collectionHighlights) {
      const tiles = this.props.collectionHighlights.map(item => {
        return (
          <div className="col-md-6 col-lg-3">
            <a href={item.link}>
              <div
                className="category-container"
                style={{
                  backgroundImage: `url(${item.img})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover"
                }}
              >
                <div className="category-details">
                  <span>{item.itemCount}</span>
                  <h3>{item.title}</h3>
                </div>
                <div className="category-link">
                  <p>
                    Explore<i className="fal fa-arrow-right"></i>
                  </p>
                </div>
              </div>
            </a>
          </div>
        );
      });

      return (
        <div className="collection-highlights-wrapper">
          <div className="collection-highlights-heading">
            <h2>
              Collection <span>Highlights</span>
            </h2>
          </div>
          <div className="row">{tiles}</div>
        </div>
      );
    } else {
      return <> </>;
    }
  }
}

export default CollectionHighlights;
