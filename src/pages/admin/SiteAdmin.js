import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { NavLink } from "react-router-dom";
import SiteForm from "./SiteForm";
import SitePagesForm from "./SitePagesForm";
import ContentUpload from "./ContentUpload";
import Homepage from "./Homepage";
import SearchFacetsForm from "./SearchFacetsForm";
import BrowseCollectionsForm from "./BrowseCollectionsForm";

class SiteAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: false,
      form: "site"
    };
  }

  async checkGroup() {
    try {
      const data = await Auth.currentUserPoolUser();
      const groups =
        data.signInUserSession.accessToken.payload["cognito:groups"];
      if (groups.indexOf("SiteAdmin") !== -1) {
        this.setAuthorized(true);
      } else {
        this.setAuthorized(false);
      }
    } catch (err) {
      console.log("error: ", err);
      this.setAuthorized(false);
    }
  }

  setAuthorized(authorized) {
    this.setState({ authorized: authorized });
  }

  setForm(form) {
    this.setState({ form: form });
  }

  getForm() {
    const forms = {
      site: <SiteForm />,
      contentUpload: <ContentUpload />,
      sitePages: <SitePagesForm />,
      homepage: <Homepage />,
      searchFacets: <SearchFacetsForm />,
      browseCollections: <BrowseCollectionsForm />
    };
    return forms[this.state.form];
  }

  componentDidMount() {
    this.checkGroup();
  }

  render() {
    return (
      <div>
        <div>
          <ul>
            <li>
              <NavLink onClick={() => this.setForm("site")} to={"/siteAdmin"}>
                General Site Config
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => this.setForm("sitePages")}
                to={"/siteAdmin"}
              >
                Site Pages Config
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => this.setForm("contentUpload")}
                to={"/siteAdmin"}
              >
                Upload Site Content
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => this.setForm("homepage")}
                to={"/siteAdmin"}
              >
                Homepage Config
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => this.setForm("searchFacets")}
                to={"/siteAdmin"}
              >
                Search Facets Config
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => this.setForm("browseCollections")}
                to={"/siteAdmin"}
              >
                Filter and Sort Config for Browse Collections Page
              </NavLink>
            </li>
          </ul>
        </div>
        {this.state.authorized ? (
          this.getForm()
        ) : (
          <h1>"Not authorized to access this page!"</h1>
        )}
        <AmplifySignOut />
      </div>
    );
  }
}

export default withAuthenticator(SiteAdmin);
