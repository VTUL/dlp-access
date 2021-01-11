import React, { Component } from "react";
import "../css/Footer.scss";

class Footer extends Component {
  render() {
    return (
      <>
        <vtlib-footer swoop="white">
          <i class="fab fa-twitter" slot="vtlib-footer-twitter"></i>
          <i class="fab fa-instagram" slot="vtlib-footer-instagram"></i>
          <i class="fab fa-youtube" slot="vtlib-footer-youtube"></i>
          <i class="fab fa-facebook-f" slot="vtlib-footer-facebook"></i>
        </vtlib-footer>
      </>
    );
  }
}

export default Footer;
