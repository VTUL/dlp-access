import React from "react";
import "../css/LinkDropdown.scss";

const DownloadLinks = ({ title, links }) => {
  console.log(links);
  return (
    <div className="download-link-section">
      <h3>{title}</h3>
    </div>
  );
};

export { DownloadLinks };
