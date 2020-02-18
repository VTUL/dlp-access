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
      <div className="header">
        {/*
        <!-- ///////////////////////////////////////////// -->
        <!-- EYEBROW -->
        <!-- ///////////////////////////////////////////// -->
        */}
        <div className="row vt-one-preHeader">
          <div className="vt-universal-access">
            <button
              onClick={this.onAccessClick}
              className="vt-access-toggle"
              aria-labelledby="vt_universal_access_label"
            >
              <img
                alt=""
                src="https://www.assets.cms.vt.edu/images/accessibility_icon_white.svg"
                className="vt-access-toggle-icon vt-transparent-bg"
                focusable="false"
                aria-hidden="true"
              />
              <span className="sr-only">Universal Access Toggle</span>
            </button>
            <div
              role="tooltip"
              id="vt_universal_access_label"
              className="vt-universal-access-label"
            >
              Universal Access
            </div>
            <div
              role="dialog"
              id="vt_access_dialog"
              aria-labelledby="access_dialog_label"
              aria-describedby="access_dialog_label"
              aria-modal="true"
              className="vt-access-dialog-wrapper"
              aria-hidden="true"
            >
              <div className="vt-access-dialog">
                <button
                  onClick={this.onAccessClick}
                  className="vt-access-dialog-close"
                  tabIndex="-1"
                  aria-label="Close Universal Access dialog"
                >
                  <span
                    className="far fa-times"
                    focusable="false"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Close Universal Access dialog</span>
                </button>
                <span
                  id="vt_access_dialog_label"
                  className="vt-access-dialog-label"
                >
                  Universal Access Options
                </span>
                <ul id="uaRender" className="vt-access-options"></ul>
              </div>{" "}
              {/* <!-- end vt-access-dialog --> */}
            </div>{" "}
            {/* <!-- end vt_access_dialog --> */}
          </div>{" "}
          {/* <!-- end vt-universal-access --> */}
          <nav className="vt-actions-header" aria-label="Actions and Audiences">
            <ul id="vt_common" role="group" aria-label="Actions">
              <li className="vt-common-item">
                <a className="vt-common-link" href="https://vt.edu/apply.html">
                  Apply
                </a>
              </li>
              <li className="vt-common-item">
                <a className="vt-common-link" href="https://vt.edu/visit.html">
                  Visit
                </a>
              </li>
              <li className="vt-common-item">
                <a
                  className="vt-common-link"
                  href="https://webapps.es.vt.edu/givingto/gift"
                >
                  Give
                </a>
              </li>
              <li className="vt-common-item">
                <a
                  className="vt-common-link"
                  href="http://www.hokiegear.com/?_s=bm-storefront&utm_source=vt_edu&utm_medium=referral"
                >
                  Shop
                </a>
              </li>
            </ul>
            <div
              className="vt-resources-for-wrapper"
              role="group"
              aria-label="Audiences"
            >
              <button
                id="vt_header_resources_toggle"
                className="vt-resources-toggle"
                aria-haspopup="true"
                aria-controls="vt_header_resources_options"
                aria-expanded="false"
              >
                <span className="vt-resources-toggle-text">Resources for</span>
                <span
                  className="far fa-chevron-down"
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                ></span>
              </button>
              <ul
                id="vt_header_resources_options"
                role="menu"
                className="vt-resources-options closed"
                aria-labelledby="header_resources_toggle"
                aria-hidden="true"
              >
                <li role="none presentation" className="vt-resources-item">
                  <a
                    role="menuitem"
                    tabIndex="-1"
                    className="vt-resources-item-link"
                    href="https://vt.edu/admissions.html"
                  >
                    Future Students
                  </a>
                </li>
                <li role="none presentation" className="vt-resources-item">
                  <a
                    role="menuitem"
                    tabIndex="-1"
                    className="vt-resources-item-link"
                    href="https://vt.edu/resources/current-students.html"
                  >
                    Current Students
                  </a>
                </li>
                <li role="none presentation" className="vt-resources-item">
                  <a
                    role="menuitem"
                    tabIndex="-1"
                    className="vt-resources-item-link"
                    href="https://vt.edu/resources/parents-and-families.html"
                  >
                    Parents and Families
                  </a>
                </li>
                <li role="none presentation" className="vt-resources-item">
                  <a
                    role="menuitem"
                    tabIndex="-1"
                    className="vt-resources-item-link"
                    href="https://vt.edu/resources/faculty-and-staff.html"
                  >
                    Faculty and Staff
                  </a>
                </li>
                <li role="none presentation" className="vt-resources-item">
                  <a
                    role="menuitem"
                    tabIndex="-1"
                    className="vt-resources-item-link"
                    href="https://alumni.vt.edu"
                  >
                    Alumni
                  </a>
                </li>
                <li role="none presentation" className="vt-resources-item">
                  <a
                    role="menuitem"
                    tabIndex="-1"
                    className="vt-resources-item-link"
                    href="https://vt.edu/link.html"
                  >
                    Industry and Partners
                  </a>
                </li>
              </ul>
            </div>
          </nav>{" "}
          {/* <!-- end vt-actions-header --> */}
        </div>{" "}
        {/* <!-- end vt-one-preHeader --> */}
        {/*
          <!-- ///////////////////////////////////////////// -->
          <!-- END EYEBROW -->
          <!-- ///////////////////////////////////////////// -->
        */}
        {/*
          <!-- ///////////////////////////////////////////// -->
          <!-- HEADER -->
          <!-- ///////////////////////////////////////////// -->
        */}
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
            <div id="iawa-home-link-wrapper">
              <a href="/">{this.props.siteDetails.siteName}</a>
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

                <ul className="vt-actions-nav" role="menu" aria-label="Actions">
                  <li className="vt-common-item">
                    <a
                      className="vt-common-link"
                      href="https://vt.edu/apply.html"
                    >
                      Apply
                    </a>
                  </li>
                  <li className="vt-common-item">
                    <a
                      className="vt-common-link"
                      href="https://vt.edu/visit.html"
                    >
                      Visit
                    </a>
                  </li>
                  <li className="vt-common-item">
                    <a
                      className="vt-common-link"
                      href="https://webapps.es.vt.edu/givingto/gift"
                    >
                      Give
                    </a>
                  </li>
                  <li className="vt-common-item">
                    <a
                      className="vt-common-link"
                      href="http://www.hokiegear.com/?_s=bm-storefront&utm_source=vt_edu&utm_medium=referral"
                    >
                      Shop
                    </a>
                  </li>
                </ul>
                <div className="vt-resources-for-wrapper d-md-none">
                  <div
                    className="vt-nav-resources-wrapper"
                    aria-label="Audiences"
                  >
                    <div className="vt-resources-link-wrapper">
                      <button
                        id="vt_nav_resources_toggle"
                        className="fold-icon vt-resources-toggle"
                        aria-controls="vt_nav_resources_options"
                        aria-expanded="true"
                      >
                        <span className="vt-nav-resources-title">
                          Resources for
                        </span>
                        <span className="far fa-times" focusable="false"></span>
                      </button>
                    </div>
                    <ul
                      id="vt_nav_resources_options"
                      role="group"
                      className="vt-resources-options open"
                      aria-labelledby="vt_nav_resources_toggle"
                    >
                      <li
                        role="none presentation"
                        className="vt-resources-item"
                      >
                        <a
                          role="menuitem"
                          tabIndex="-1"
                          className="vt-resources-item-link"
                          href="https://vt.edu/admissions.html"
                        >
                          Future Students
                        </a>
                      </li>
                      <li
                        role="none presentation"
                        className="vt-resources-item"
                      >
                        <a
                          role="menuitem"
                          tabIndex="-1"
                          className="vt-resources-item-link"
                          href="https://vt.edu/resources/current-students.html"
                        >
                          Current Students
                        </a>
                      </li>
                      <li
                        role="none presentation"
                        className="vt-resources-item"
                      >
                        <a
                          role="menuitem"
                          tabIndex="-1"
                          className="vt-resources-item-link"
                          href="https://vt.edu/resources/parents-and-families.html"
                        >
                          Parents and Families
                        </a>
                      </li>
                      <li
                        role="none presentation"
                        className="vt-resources-item"
                      >
                        <a
                          role="menuitem"
                          tabIndex="-1"
                          className="vt-resources-item-link"
                          href="https://vt.edu/resources/faculty-and-staff.html"
                        >
                          Faculty and Staff
                        </a>
                      </li>
                      <li
                        role="none presentation"
                        className="vt-resources-item"
                      >
                        <a
                          role="menuitem"
                          tabIndex="-1"
                          className="vt-resources-item-link"
                          href="https://alumni.vt.edu"
                        >
                          Alumni
                        </a>
                      </li>
                      <li
                        role="none presentation"
                        className="vt-resources-item"
                      >
                        <a
                          role="menuitem"
                          tabIndex="-1"
                          className="vt-resources-item-link"
                          href="https://vt.edu/resources/industry-and-partners.html"
                        >
                          Industry and Partners
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
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
      </div>
    );
  }
}

export default Header;
