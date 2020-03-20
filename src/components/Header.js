import React, { Component } from "react";
import SiteNavigationLinks from "./SiteNavigationLinks";

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
              <div id="vt_logo">
                <a className="vt-logo-link" href="https://vt.edu">
                  <img
                    alt="VT Virginia Tech"
                    src="https://www.assets.cms.vt.edu/images/logo-maroon-whiteBG.svg"
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

                  <SiteNavigationLinks />
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
          <nav aria-label="Page Context" class="vt-page-path row">
            <div class="gateway">
              <ol id="vt_navtrail" class="long_title vt-breadcrumbs">
                <li class="vt-breadcrumbs-item">
                  <a class="vt-breadcrumbs-link" href="https://www.lib.vt.edu/">
                    University Libraries
                  </a>
                  <span class="breadcrumb-slash" aria-hidden="true">
                    {" "}
                    /{" "}
                  </span>
                </li>
              </ol>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
