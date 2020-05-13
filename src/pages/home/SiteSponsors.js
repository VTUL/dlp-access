import React, { Component } from "react";

import "../../css/SiteSponsors.css";

class SiteSponsors extends Component {
  render() {
    if (this.props.sponsors) {
      return (
        <div className="home-sponsors-section">
          <div className="home-sponsors-wrapper">
            {this.props.sponsors.map((sponsor, index) => (
              <div key={index} className="sponsor-wrapper">
                <a href={sponsor.link} target="_blank">
                  <img src={sponsor.img} alt={sponsor.alt} />
                </a>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default SiteSponsors;
