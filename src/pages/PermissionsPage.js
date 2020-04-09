import React, { Component } from "react";
import SiteTitle from "../components/SiteTitle";
import ContactSection from "../components/ContactSection";
import { getHTML } from "../lib/fetch_tools";

<<<<<<< HEAD:src/pages/PermissionsPage.js
class PermissionsPage extends Component {
=======
import "../css/TermsPage.css";

class TermsPage extends Component {
>>>>>>> Added contact info, css, moved downloads link, and updated link on About:src/pages/TermsPage.js
  constructor(props) {
    super(props);
    this.state = {
      copy: ""
    };
  }

  componentDidMount() {
    getHTML(this.props.siteDetails.termsCopy, this);
  }

  render() {
    return (
      <>
<<<<<<< HEAD:src/pages/PermissionsPage.js
        <SiteTitle
          siteTitle={this.props.siteDetails.siteTitle}
          pageTitle="Permissions"
        />
        <div
          className="terms-details"
          dangerouslySetInnerHTML={{ __html: this.state.copy }}
        ></div>
=======
        <div className="row terms-page-wrapper">
          <div className="col-12 terms-heading">
            <SiteTitle
              siteTitle={this.props.siteDetails.siteTitle}
              pageTitle="Terms"
            />
            <h1>Permissions</h1>
          </div>
          <div className="col-md-8">
            <div
              className="terms-details"
              dangerouslySetInnerHTML={{ __html: this.state.copy }}
            ></div>
          </div>
          <div className="col-md-4 contact-section-wrapper">
            <ContactSection siteDetails={this.props.siteDetails} />
            {this.props.siteDetails.termsCopy.download ? (
              <div>
                <p className="terms-downloads-heading">Downloadable forms</p>
                <a href={this.props.siteDetails.termsCopy.download}>
                  Permission form for image reproductions
                </a>
              </div>
            ) : null}
          </div>
        </div>
>>>>>>> Added contact info, css, moved downloads link, and updated link on About:src/pages/TermsPage.js
      </>
    );
  }
}

export default PermissionsPage;
