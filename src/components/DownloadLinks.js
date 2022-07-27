import React, { useState, useEffect } from "react";
import { fetchSignedLink } from "../lib/fetchTools";
import "../css/DownloadLinks.scss";

const DownloadLinks = ({ title, links }) => {
  const [linkElements, setLinkElements] = useState([]);

  useEffect(() => {
    createLinksSection();
  }, [title, links]);

  const linksExist = () => {
    let exist = false;
    linkElements.forEach(link => {
      if (link.type == "li") {
        exist = true;
      }
    });
    return exist;
  };

  const sortLinks = (a, b) => {
    let retVal = 0;
    if (a.key > b.key) {
      retVal = 1;
    } else if (a.key < b.key) {
      retVal = -1;
    }
    return retVal;
  };

  const createLinksSection = async () => {
    let linksList = [];
    for (const size in links) {
      const signedLink = await fetchSignedLink(links[size]);
      const fileName = new URL(links[size]).pathname.split("/").pop();
      if (size && signedLink?.data?.length && fileName) {
        linksList.push(
          <li key={size}>
            {size}: <a href={signedLink.data}>{fileName}</a>
          </li>
        );
      }
    }
    setLinkElements(linksList.sort(sortLinks).reverse());
  };
  let downloadLinks = null;
  if (linksExist()) {
    downloadLinks = (
      <div className="download-link-section">
        <h3>{title}</h3>
        <ul>{linkElements}</ul>
      </div>
    );
  }
  return downloadLinks;
};

export { DownloadLinks };
