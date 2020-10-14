import React, { Component } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";

class Contacts extends Component {
  render() {
    const contactList = this.props.contacts.map((obj, index) => {
      return (
        <div key={index}>
          <fieldset>
            <legend>Contact {index + 1}:</legend>
            <label htmlFor={`c${index}_title`}>Title</label>
            <input
              id={`c${index}_title`}
              value={obj.title}
              name="title"
              placeholder="Enter the title for the contact"
              onChange={this.props.updateContactValue}
              data-index={index}
            />
            <label htmlFor={`c${index}_email`}>Email</label>
            <input
              id={`c${index}_email`}
              value={obj.email}
              name="email"
              placeholder="Enter the email for the contact"
              onChange={this.props.updateContactValue}
              data-index={index}
            />
            <label htmlFor={`c${index}_group`}>Group</label>
            <input
              id={`c${index}_group`}
              value={obj.group}
              name="group"
              placeholder="Enter the group for the contact"
              onChange={this.props.updateContactValue}
              data-index={index}
            />
            <label htmlFor={`c${index}_department`}>Department</label>
            <input
              id={`c${index}_department`}
              value={obj.department}
              name="department"
              placeholder="Enter the department for the contact"
              onChange={this.props.updateContactValue}
              data-index={index}
            />
            <label htmlFor={`c${index}_street`}>Street Address</label>
            <input
              id={`c${index}_street`}
              value={obj.streetAddress}
              name="streetAddress"
              placeholder="Enter the street address for the contact"
              onChange={this.props.updateContactValue}
              data-index={index}
            />
            <label htmlFor={`c${index}_city`}>City, State, Zip</label>
            <input
              id={`c${index}_city`}
              value={obj.cityStateZip}
              name="cityStateZip"
              placeholder="Enter the city, state, and zip code for the contact"
              onChange={this.props.updateContactValue}
              data-index={index}
            />
            <label htmlFor={`c${index}_phone`}>Phone</label>
            <input
              id={`c${index}_phone`}
              value={obj.phone}
              name="phone"
              placeholder="Enter the phone number for the contact"
              onChange={this.props.updateContactValue}
              data-index={index}
            />
          </fieldset>
          <button onClick={this.props.removeContact} data-index={index}>
            Remove contact
          </button>
        </div>
      );
    });
    return (
      <div>
        <h2>Contacts</h2>
        <button aria-label="Add contact" onClick={this.props.addContact}>
          <i className="fas fa-plus"></i>
        </button>
        {contactList}
      </div>
    );
  }
}

export default withAuthenticator(Contacts);
