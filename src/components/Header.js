import React, { Component } from "react";
import SiteNavigationLinks from "./SiteNavigationLinks";
import HeaderBreadcrumbs from "./HeaderBreadcrumbs";

class Header extends Component {
  onNavClick() {
    window.navToggle();
  }
  onAccessClick() {
    window.accessToggle();
  }
  render() {
    return (
      <div className="vt-home">
        <div className="header">
          <div className="row vt-one-headerRow">
            <header className="col header-col" role="banner">
              <a
                className="sr-only sr-only-focusable skipLink"
                href="#content-wrapper"
              >
                Skip to main content
              </a>
              <div id="vt_logo">
                <a className="vt-logo-link" href="https://lib.vt.edu">
                  <img
                    alt="University Libraries at Virginia Tech"
                    src="/images/library-logo-lockup_color.png"
                    style={{ width: "220px" }}
                  />
                </a>
              </div>
              {/*
              <!-- ///////////////////////////////////////////// -->
              <!-- MAIN NAVIGATION -->
              <!-- ///////////////////////////////////////////// -->
            */}
              <nav className="col" id="vt_nav" aria-label="Site Menu">
                <div className="linkWrapper">
                  <button
                    className="vt-nav-toggle"
                    aria-controls="vt_main_nav"
                    aria-expanded="false"
                    onClick={this.onNavClick}
                    aria-haspopup="menu"
                  >
                    <span className="vt-nav-toggleLabel">Menu</span>
                    <span
                      className="far fa-bars menu-open"
                      aria-hidden="true"
                      focusable="false"
                      role="img"
                    ></span>
                    <span
                      className="far fa-times menu-close d-none"
                      aria-hidden="true"
                      focusable="false"
                      role="img"
                    ></span>
                  </button>
                </div>
                <div
                  id="vt_offcanvas_nav"
                  role="group"
                  aria-label="Main Menu Drawer"
                  aria-hidden="true"
                  tabIndex="-1"
                >
                  <ol
                    id="vt_parent_org"
                    className="vt-parent-org"
                    aria-label="Parent Organization and Current Site"
                  >
                    <li className="vt-currentSiteTitle">
                      <a
                        className="vt-currentSiteTitle-link"
                        href="https://vt.edu"
                        tabIndex="-1"
                      >
                        Virginia Tech
                      </a>
                    </li>
                  </ol>

                  <SiteNavigationLinks siteDetails={this.props.siteDetails} />
                </div>
              </nav>{" "}
              {/* !-- end vt_nav --> */}
              {/*
                    <!-- ///////////////////////////////////////////// -->
                    <!-- END MAIN NAVIGATION -->
                    <!-- ///////////////////////////////////////////// -->
                  */}
            </header>
          </div>{" "}
          {/* <!-- end vt-one-headerRow --> */}
          {/*
          <!-- ///////////////////////////////////////////// -->
          <!-- END HEADER -->
          <!-- ///////////////////////////////////////////// -->
        */}
          <nav aria-label="Site breadcrumbs" className="vt-page-path row">
            <div className="gateway">
              <HeaderBreadcrumbs
                siteDetails={this.props.siteDetails}
                location={this.props.location}
              />
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
