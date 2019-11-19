import React from "react";
import { Link } from "react-router-dom";
import "../styles/Table.css";
import ReactHtmlParser from "react-html-parser";

const DateValue = archive => {
  let circa_date = archive.circa ? archive.circa : "";
  let end_date = archive["end_date"] ? " - " + archive["end_date"] : "";
  return circa_date + archive["start_date"] + end_date;
};

const SearchTable = ({ archive }) => {
  return (
    <div className="row search-result-wrapper">
      <h4>
        <Link to={`/item/${archive.custom_key.slice(11)}`}>
          {archive.title}
        </Link>
      </h4>

      <div className="col-md-4 col-sm-4">
        <Link to={`/item/${archive.custom_key.slice(11)}`}>
          <img src={archive.thumbnail_path} alt={archive.title} />
        </Link>
      </div>
      <div className="col-md-8 col-sm-8">
        <table>
          <tbody>
            <tr>
              <th>Identifier:</th>
              <td>
                <Link to={`/item/${archive.custom_key.slice(11)}`}>
                  {archive.identifier}
                </Link>
              </td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{DateValue(archive)}</td>
            </tr>
            <tr>
              <th>Type:</th>
              <td>{archive.resource_type.join(" and ")}</td>
            </tr>
            <tr>
              <th>Medium:</th>
              <td>{archive.medium.join(" and ")}</td>
            </tr>
            <tr>
              <th>Source:</th>
              <td>
                {archive.source.map((value, i) => (
                  <li key={i}>{ReactHtmlParser(value)}</li>
                ))}
              </td>
            </tr>
            <tr>
              <th>Belongs to:</th>
              <td>{archive.belongs_to.join(" and ")}</td>
            </tr>
            <tr>
              <th>Tags</th>
              <td>{archive.tags.join(" and ")}</td>
            </tr>
            <tr>
              <th>Creator</th>
              <td>{archive.creator.join(" and ")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchTable;
