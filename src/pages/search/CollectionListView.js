import React from "react";
import { NavLink } from "react-router-dom";
import { arkLinkFormatted } from "../../shared/TextFormatTools";
import { Thumbnail } from "../../components/Thumbnail";
import "../../css/SearchResult.css";
import ReactHtmlParser from "react-html-parser";

const DateValue = collection => {
  let circa_date = collection.circa ? collection.circa : "";
  let end_date = collection["end_date"] ? " - " + collection["end_date"] : "";
  return circa_date + collection["start_date"] + end_date;
};

const DescFormatted = collection => {
  return collection.description.substring(0, 100) + "...";
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

export const CollectionListView = ({ collection }) => {
  return (
    <div className="row search-result-wrapper">
      <div className="col-sm-12 title-wrapper">
        <h4>
          <NavLink
            to={`/collection/${arkLinkFormatted(collection.custom_key)}`}
          >
            {collection.title}
          </NavLink>
        </h4>
      </div>
      <div className="col-md-4 col-sm-4 my-auto">
        <Thumbnail item={collection} dataType="collection" />
      </div>
      <div className="col-md-8 col-sm-8">
        <table className="table">
          <tbody>
            <tr>
              <th>Identifier:</th>
              <td>
                <NavLink
                  to={`/collection/${arkLinkFormatted(collection.custom_key)}`}
                >
                  {collection.identifier}
                </NavLink>
              </td>
            </tr>
            <tr>
              <th>Description:</th>
              <td>{DescFormatted(collection)}</td>
            </tr>
            <tr>
              <th>Date:</th>
              <td>{DateValue(collection)}</td>
            </tr>
            <tr>
              <th>Source:</th>
              <td>
                {collection.source.map((value, i) => (
                  <li className="list-unstyled" key={i}>
                    {ReactHtmlParser(value)}
                  </li>
                ))}
              </td>
            </tr>
            {MultiValueAttr("language", collection.language)}
            {MultiValueAttr("Creator", collection.creator)}
          </tbody>
        </table>
      </div>
    </div>
  );
};
