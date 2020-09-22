import React, { Component } from "react";

import "../css/ContactSection.css";

class ContactSection extends Component {
  render() {
    if (
      this.props.siteDetails.contact &&
      this.props.siteDetails.contact.length
    ) {
      return (
        <>
          <div
            className="contact-section"
            role="region"
            aria-labelledby="contact-section-heading"
          >
            <h2 className="contact-heading" id="contact-section-heading">
              Contact {this.props.site.siteTitle}
            </h2>
            {this.props.siteDetails.contact.map((contact, index) => (
              <div key={index}>
                <p className="contact-title">
                  {contact.title} [
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>],{" "}
                  {contact.group}
                </p>
                <div className="contact-address">
                  <p>{contact.department}</p>
                  <p>{contact.streetAddress}</p>
                  <p>{contact.cityStateZip}</p>
                  <p>{contact.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    } else {
      return <></>;
    }
  }
}

export default ContactSection;
