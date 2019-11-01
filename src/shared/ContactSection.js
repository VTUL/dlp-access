import React from "react";

import "./ContactSection.css";

const ContactSection = () => (
  <>
    <div className="navbar navbar-inverse contact-section">
      <div className="container">
        <div className="navbar-text">
          <h3 className="contact-iawa">CONTACT IAWA</h3>
          <p>
            IAWA Archivist [<a href="mailto:specref@vt.edu">specref@vt.edu</a>],
            Special Collections
          </p>
          <p>University Libraries (0434)</p>
          <p>560 Drillfield Drive</p>
          <p>Blacksburg, VA 24061</p>
          <p>(540)231-6308</p>
        </div>
        <div className="navbar-text">
          <h3>&nbsp;</h3>
          <p>
            Board Chair [<a href="mailto:ddunay@vt.edu">ddunay@vt.edu</a>], IAWA
            Center
          </p>
          <p>201 Cowgill Hall (0205)</p>
          <p>1325 Perry St.</p>
          <p>Blacksburg, VA 24061</p>
          <p>(540)231-5512</p>
        </div>
      </div>
    </div>
  </>
);

export default ContactSection;
