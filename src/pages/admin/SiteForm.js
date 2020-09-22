import React, { Component } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Form } from "semantic-ui-react";
import { API } from "aws-amplify";
import { getSite } from "../../lib/fetchTools";
import * as mutations from "../../graphql/mutations";

class SiteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formState: {
        siteTitle: "",
        siteName: ""
      },
      viewState: "viewSite",
      site: null
    };
  }

  async loadSite() {
    const site = await getSite();
    if (site) {
      this.setState({
        formState: {
          siteTitle: site.siteTitle,
          siteName: site.siteName
        },
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
    let siteInfo = { id: this.state.site.id, ...this.state.formState };
    await API.graphql({
      query: mutations.updateSite,
      variables: { input: siteInfo },
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
            label="Site Title"
            value={this.state.formState.siteTitle}
            name="siteTitle"
            placeholder="Enter Site Title"
            onChange={this.updateInputValue}
          />

          <Form.TextArea
            label="Site Name"
            value={this.state.formState.siteName}
            name="siteName"
            placeholder="Enter Site Name"
            onChange={this.updateInputValue}
          />
          <Form.Button>Update Site</Form.Button>
        </Form>
      </div>
    );
  };

  viewSite = () => {
    return (
      <div>
        <div>
          <p>SiteId: iawa</p>
          <p>Site Title: {this.state.formState.siteTitle}</p>
          <p>Site Name: {this.state.formState.siteName}</p>
        </div>
      </div>
    );
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
