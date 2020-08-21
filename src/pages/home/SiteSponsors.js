import React, { Component } from "react";

import "../../css/SiteSponsors.css";

class SiteSponsors extends Component {
  render() {
    if (this.props.sponsors) {
      return (
        <div
          className="container home-sponsors-section"
          role="region"
          aria-label="Sponsors"
        >
          <div className="row home-sponsors-wrapper">
            {this.props.sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="col-6 col-md-4 col-lg-3 sponsor-wrapper"
              >
                <a
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={sponsor.img}
                    alt={sponsor.alt}
                    className="img-fluid"
                  />
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
