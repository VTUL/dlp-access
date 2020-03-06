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
          <div className="navbar navbar-inverse contact-section">
            <div className="container">
              <h3 className="contact-iawa">
                CONTACT {this.props.siteDetails.siteTitle}
              </h3>
              {this.props.siteDetails.contact.map((contact, index) => (
                <div className="navbar-text" key={index}>
                  <p>
                    {contact.title} [
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>],{" "}
                    {contact.group}
                  </p>
                  <p>{contact.department}</p>
                  <p>{contact.streetAddress}</p>
                  <p>{contact.cityStateZip}</p>
                  <p>{contact.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  }
}

export default ContactSection;
