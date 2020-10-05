import React, { Component } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Form } from "semantic-ui-react";
import { updatedDiff } from "deep-object-diff";
import { API, Auth } from "aws-amplify";
import { getSite } from "../../lib/fetchTools";
import * as mutations from "../../graphql/mutations";

const initialFormState = {
  analyticsID: "",
  siteColor: "",
  siteName: "",
  siteTitle: "",
  contact: []
};

class SiteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formState: initialFormState,
      prevFormState: initialFormState,
      viewState: "viewSite",
      site: null
    };
  }

  async loadSite() {
    const site = await getSite();
    if (site) {
      const contact1 = site.contact[0] ? JSON.parse(site.contact[0]) : {};
      const contact2 = site.contact[1] ? JSON.parse(site.contact[1]) : {};
      let siteInfo = {
        analyticsID: site.analyticsID || "",
        siteColor: site.siteColor || "",
        siteName: site.siteName,
        siteTitle: site.siteTitle,
        contact: [
          {
            title: contact1.title || "",
            email: contact1.email || "",
            group: contact1.group || "",
            department: contact1.department || "",
            streetAddress: contact1.streetAddress || "",
            cityStateZip: contact1.cityStateZip || "",
            phone: contact1.phone || ""
          },
          {
            title: contact2.title || "",
            email: contact2.email || "",
            group: contact2.group || "",
            department: contact2.department || "",
            streetAddress: contact2.streetAddress || "",
            cityStateZip: contact2.cityStateZip || "",
            phone: contact2.phone || ""
          }
        ]
      };
      this.setState({
        formState: siteInfo,
        prevFormState: siteInfo,
        site: site
      });
    }
  }

  componentDidMount() {
    this.loadSite();
  }

  updateInputValue = event => {
    const { name, value } = event.target;
    this.setState(prevState => {
      return {
        formState: { ...prevState.formState, [name]: value }
      };
    });
  };

  updateContactValue = event => {
    const { name, value, dataset } = event.target;
    const index = dataset.index;
    this.setState(prevState => {
      let contactArray = [...prevState.formState.contact];
      let contact = { ...contactArray[index], [name]: value };
      contactArray[index] = contact;
      return { formState: { ...prevState.formState, contact: contactArray } };
    });
  };

  formatData = siteInfo => {
    let site = siteInfo;
    site.contact = site.contact.map(contact => {
      return JSON.stringify(contact);
    });
    return site;
  };

  handleSubmit = async () => {
    const { siteTitle, siteName } = this.state.formState;
    if (!siteTitle || !siteName) return;

    this.setState({ viewState: "viewSite" });
    const siteID = this.state.site.id;
    let siteInfo = { id: siteID, ...this.state.formState };
    siteInfo = this.formatData(siteInfo);
    await API.graphql({
      query: mutations.updateSite,
      variables: { input: siteInfo },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    });
    const newData = updatedDiff(this.state.prevFormState, this.state.formState);
    const oldData = updatedDiff(this.state.formState, this.state.prevFormState);
    const eventInfo = Object.keys(newData).reduce((acc, key) => {
      return {
        ...acc,
        [key]: {
          old: oldData[key],
          new: newData[key]
        }
      };
    }, {});
    const userInfo = await Auth.currentUserPoolUser();
    let historyInfo = {
      userEmail: userInfo.attributes.email,
      siteID: siteID,
      event: JSON.stringify(eventInfo)
    };
    await API.graphql({
      query: mutations.createHistory,
      variables: { input: historyInfo },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    });
  };

  handleChange = (e, { value }) => {
    this.setState({ viewState: value });
  };

  editSiteForm = () => {
    return (
      <div>
        <h2>{`Edit Site with SiteId: ${process.env.REACT_APP_REP_TYPE.toLowerCase()}`}</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Analytics ID"
            value={this.state.formState.analyticsID}
            name="analyticsID"
            placeholder="Enter Analytics ID"
            onChange={this.updateInputValue}
          />
          <Form.Input
            label="Site Color"
            value={this.state.formState.siteColor}
            name="siteColor"
            placeholder="Enter Site Color"
            onChange={this.updateInputValue}
          />
          <Form.TextArea
            label="Site Name"
            value={this.state.formState.siteName}
            name="siteName"
            placeholder="Enter Site Name"
            onChange={this.updateInputValue}
          />
          <Form.Input
            label="Site Title"
            value={this.state.formState.siteTitle}
            name="siteTitle"
            placeholder="Enter Site Title"
            onChange={this.updateInputValue}
          />
          <p>Contacts</p>
          <fieldset>
            <legend>Contact 1:</legend>
            <label htmlFor="c1_title">Title</label>
            <input
              id="c1_title"
              value={this.state.formState.contact[0].title}
              name="title"
              placeholder="Enter the title for the first contact"
              onChange={this.updateContactValue}
              data-index="0"
            />
            <label htmlFor="c1_email">Email</label>
            <input
              id="c1_email"
              value={this.state.formState.contact[0].email}
              name="email"
              placeholder="Enter the email for the first contact"
              onChange={this.updateContactValue}
              data-index="0"
            />
            <label htmlFor="c1_group">Group</label>
            <input
              id="c1_group"
              value={this.state.formState.contact[0].group}
              name="group"
              placeholder="Enter the group for the first contact"
              onChange={this.updateContactValue}
              data-index="0"
            />
            <label htmlFor="c1_department">Department</label>
            <input
              id="c1_department"
              value={this.state.formState.contact[0].department}
              name="department"
              placeholder="Enter the department for the first contact"
              onChange={this.updateContactValue}
              data-index="0"
            />
            <label htmlFor="c1_streetAddress">Street Address</label>
            <input
              id="c1_streetAddress"
              value={this.state.formState.contact[0].streetAddress}
              name="streetAddress"
              placeholder="Enter the street address for the first contact"
              onChange={this.updateContactValue}
              data-index="0"
            />
            <label htmlFor="c1_cityStateZip">City, State, Zip</label>
            <input
              id="c1_cityStateZip"
              value={this.state.formState.contact[0].cityStateZip}
              name="cityStateZip"
              placeholder="Enter the city, state, and zip code for the first contact"
              onChange={this.updateContactValue}
              data-index="0"
            />
            <label htmlFor="c1_phone">Phone</label>
            <input
              id="c1_phone"
              value={this.state.formState.contact[0].phone}
              name="phone"
              placeholder="Enter the phone number for the first contact"
              onChange={this.updateContactValue}
              data-index="0"
            />
          </fieldset>
          <fieldset>
            <legend>Contact 2:</legend>
            <label htmlFor="c2_title">Title</label>
            <input
              id="c2_title"
              value={this.state.formState.contact[1].title}
              name="title"
              placeholder="Enter the title for the second contact"
              onChange={this.updateContactValue}
              data-index="1"
            />
            <label htmlFor="c2_email">Email</label>
            <input
              id="c2_email"
              value={this.state.formState.contact[1].email}
              name="email"
              placeholder="Enter the email for the second contact"
              onChange={this.updateContactValue}
              data-index="1"
            />
            <label htmlFor="c2_group">Group</label>
            <input
              id="c2_group"
              value={this.state.formState.contact[1].group}
              name="group"
              placeholder="Enter the group for the second contact"
              onChange={this.updateContactValue}
              data-index="1"
            />
            <label htmlFor="c2_department">Department</label>
            <input
              id="c2_department"
              value={this.state.formState.contact[1].department}
              name="department"
              placeholder="Enter the department for the second contact"
              onChange={this.updateContactValue}
              data-index="1"
            />
            <label htmlFor="c2_streetAddress">Street Address</label>
            <input
              id="c2_streetAddress"
              value={this.state.formState.contact[1].streetAddress}
              name="streetAddress"
              placeholder="Enter the street address for the second contact"
              onChange={this.updateContactValue}
              data-index="1"
            />
            <label htmlFor="c2_cityStateZip">City, State, Zip</label>
            <input
              id="c2_cityStateZip"
              value={this.state.formState.contact[1].cityStateZip}
              name="cityStateZip"
              placeholder="Enter the city, state, and zip code for the second contact"
              onChange={this.updateContactValue}
              data-index="1"
            />
            <label htmlFor="c2_phone">Phone</label>
            <input
              id="c2_phone"
              value={this.state.formState.contact[1].phone}
              name="phone"
              placeholder="Enter the phone number for the second contact"
              onChange={this.updateContactValue}
              data-index="1"
            />
          </fieldset>
          <Form.Button>Update Site</Form.Button>
        </Form>
      </div>
    );
  };

  viewSite = () => {
    if (this.state.site) {
      return (
        <div>
          <div>
            <p>SiteId: {this.state.site.siteId} </p>
            <p>Analytics ID: {this.state.formState.analyticsID}</p>
            <p>Site Color: {this.state.formState.siteColor}</p>
            <p>Site Name: {this.state.formState.siteName}</p>
            <p>Site Title: {this.state.formState.siteTitle}</p>
            <p>Contact 1</p>
            <p>Title: {this.state.formState.contact[0].title}</p>
            <p>Email: {this.state.formState.contact[0].email}</p>
            <p>Group: {this.state.formState.contact[0].group}</p>
            <p>Department: {this.state.formState.contact[0].department}</p>
            <p>
              Street Address: {this.state.formState.contact[0].streetAddress}
            </p>
            <p>
              City, State, Zip: {this.state.formState.contact[0].cityStateZip}
            </p>
            <p>Phone: {this.state.formState.contact[0].phone}</p>
            <p>Contact 2</p>
            <p>Title: {this.state.formState.contact[1].title}</p>
            <p>Email: {this.state.formState.contact[1].email}</p>
            <p>Group: {this.state.formState.contact[1].group}</p>
            <p>Department: {this.state.formState.contact[1].department}</p>
            <p>
              Street Address: {this.state.formState.contact[1].streetAddress}
            </p>
            <p>
              City, State, Zip: {this.state.formState.contact[1].cityStateZip}
            </p>
            <p>Phone: {this.state.formState.contact[1].phone}</p>
          </div>
        </div>
      );
    } else {
      return <div>Error fetching site configurations......</div>;
    }
  };

  render() {
    return (
      <div>
        <Form>
          <Form.Group inline>
            <label>Switch between view and edit</label>
            <Form.Radio
              label="Edit Site"
              name="viewStateRadioGroup"
              value="editSite"
              checked={this.state.viewState === "editSite"}
              onChange={this.handleChange}
            />

            <Form.Radio
              label="View Site"
              name="viewStateRadioGroup"
              value="viewSite"
              checked={this.state.viewState === "viewSite"}
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form>
        {this.state.viewState === "viewSite"
          ? this.viewSite()
          : this.editSiteForm()}
      </div>
    );
  }
}

export default withAuthenticator(SiteForm);
