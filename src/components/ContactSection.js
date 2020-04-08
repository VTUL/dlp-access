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
          <div className="contact-section">
            <h2 className="contact-heading">
              Contact {this.props.siteDetails.siteTitle}
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
