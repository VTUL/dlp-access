import React from "react";
import { NavLink } from "react-router-dom";
import "../css/ListPages.css";

function labelAttr(attr) {
  if (attr === "resource_type") return "Type";
  else if (attr === "belongs_to") return "Belongs to";
  else return attr.charAt(0).toUpperCase() + attr.slice(1);
}

export function arkLinkFormatted(customKey) {
  return customKey.replace("ark:/53696/", "");
}

export function titleFormatted(item, dataType) {
  return (
    <h4>
      <NavLink to={`/${dataType}/${arkLinkFormatted(item.custom_key)}`}>
        {item.title}
      </NavLink>
    </h4>
  );
}
export function dateFormatted(item) {
  let circa_date = item.circa ? item.circa : "";
  let end_date = item.end_date ? " - " + parseInt(item.end_date) : "";
  let start_date = item.start_date ? parseInt(item.start_date) : "";
  return circa_date + start_date + end_date;
}

export const FormattedAttr = ({ item, attribute }) => {
  function textFormat(item, attr) {
    if (Array.isArray(item[attr])) {
      return item[attr].join(" and ");
    } else if (attr === "description") {
      return item[attr].substring(0, 100) + "...";
    } else if (attr === "date") {
      return dateFormatted(item);
    } else {
      return item[attr];
    }
  }

  function tdFormat(item, attr) {
    if (attr === "source") {
      return (
        <td
          className="collection-detail-value"
          dangerouslySetInnerHTML={{ __html: item[attr] }}
        ></td>
      );
    } else if (attr === "identifier") {
      let dataType = "collection";
      if (item.item_category) dataType = "archive";
      return (
        <td className="collection-detail-value">
          <NavLink to={`/${dataType}/${arkLinkFormatted(item.custom_key)}`}>
            {textFormat(item, attribute)}
          </NavLink>
        </td>
      );
    } else {
      return (
        <td className="collection-detail-value">
          {textFormat(item, attribute)}
        </td>
      );
    }
  }

  if (textFormat(item, attribute)) {
    return (
      <div className="collection-detail">
        <table>
          <tbody>
            <tr>
              <td className="collection-detail-key">{labelAttr(attribute)}:</td>
              {tdFormat(item, attribute)}
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    return "";
  }
};
