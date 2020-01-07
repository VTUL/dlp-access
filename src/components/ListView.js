import React from "react";
import { NavLink } from "react-router-dom";
import { arkLinkFormatted } from "../shared/TextFormatTools";
import ItemThumbnail from "../components/ItemThumbnail";
import "../css/SearchResult.css";
import ReactHtmlParser from "react-html-parser";

const DateValue = archive => {
  let circa_date = archive.circa ? archive.circa : "";
  let end_date = archive["end_date"] ? " - " + archive["end_date"] : "";
  return circa_date + archive["start_date"] + end_date;
};

const MultiValueAttr = (label, value) => {
  if (Array.isArray(value)) {
    return (
      <tr>
        <th>{label}:</th>
        <td>{value.join(" and ")}</td>
      </tr>
    );
  } else {
    return "";
  }
};

const ListView = ({ archive }) => {
  return (
    <div className="row search-result-wrapper">
      <div className="col-sm-12 title-wrapper">
        <h4>
          <NavLink to={`/item/${arkLinkFormatted(archive.custom_key)}`}>
            {archive.title}
          </NavLink>
        </h4>
      </div>
      <div className="col-md-4 col-sm-4">
        <ItemThumbnail archive={archive} />
      </div>
      <div className="col-md-8 col-sm-8">
        <table>
          <tbody>
            <tr>
              <th>Identifier:</th>
              <td>
                <NavLink to={`/item/${arkLinkFormatted(archive.custom_key)}`}>
                  {archive.identifier}
                </NavLink>
              </td>
            </tr>
            <tr>
              <th>Date:</th>
              <td>{DateValue(archive)}</td>
            </tr>
            {MultiValueAttr("Type", archive.resource_type)}
            {MultiValueAttr("Medium", archive.medium)}
            <tr>
              <th>Source:</th>
              <td>
                {archive.source.map((value, i) => (
                  <li key={i}>{ReactHtmlParser(value)}</li>
                ))}
              </td>
            </tr>
            {MultiValueAttr("Belongs to", archive.belongs_to)}
            {MultiValueAttr("Tags", archive.tags)}
            {MultiValueAttr("Creator", archive.creator)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListView;
