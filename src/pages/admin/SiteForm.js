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
  siteTitle: ""
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
      let siteInfo = {
        analyticsID: site.analyticsID || "",
        siteColor: site.siteColor || "",
        siteName: site.siteName,
        siteTitle: site.siteTitle
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

  handleSubmit = async () => {
    const { siteTitle, siteName } = this.state.formState;
    if (!siteTitle || !siteName) return;

    this.setState({ viewState: "viewSite" });
    const siteID = this.state.site.id;
    const siteInfo = { id: siteID, ...this.state.formState };
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
