import React from "react";
import qs from "query-string";
import "../css/ListPages.css";
import ReactHtmlParser from "react-html-parser";

export function labelAttr(attr) {
  if (attr === "resource_type") return "Type";
  else if (attr === "rights_statement") return "Rights";
  else if (attr === "custom_key") return "Permanent Link";
  else if (attr === "related_url") return "Relation";
  else if (attr === "date") return "Years";
  else return (attr.charAt(0).toUpperCase() + attr.slice(1)).replace("_", " ");
}

export function arkLinkFormatted(customKey) {
  return customKey.replace("ark:/53696/", "");
}

export function htmlParsedValue(value) {
  return value.includes("<a href=") ? ReactHtmlParser(value) : value;
}

export function titleFormatted(item, dataType) {
  return (
    <h4>
      <a href={`/${dataType}/${arkLinkFormatted(item.custom_key)}`}>
        {item.title}
      </a>
    </h4>
  );
}
export function dateFormatted(item) {
  let circa_date = item.circa ? item.circa : "";
  let end_date = item.end_date ? " - " + parseInt(item.end_date) : "";
  let start_date = item.start_date ? parseInt(item.start_date) : "";
  return circa_date + start_date + end_date;
}

export function collectionSize(collection) {
  let subCollections =
    collection.subCollections != null ? collection.subCollections.length : 0;
  let archives =
    collection.archives.items != null ? collection.archives.items.length : 0;
  return subCollections + archives;
}

function listValue(dataType, attr, value, languages) {
  const LinkedFields = [
    "creator",
    "belongs_to",
    "language",
    "medium",
    "resource_type",
    "tags"
  ];
  if (attr === "language" && languages !== undefined) {
    value = languages[value];
  }
  if (LinkedFields.indexOf(attr) > -1) {
    const parsedObject = {
      data_type: dataType,
      search_field: attr,
      q: value,
      view: "List"
    };
    return <a href={`/search/?${qs.stringify(parsedObject)}`}>{value}</a>;
  } else if (attr === "source" || attr === "related_url") {
    return htmlParsedValue(value);
  } else {
    return value;
  }
}

function textFormat(item, attr, languages) {
  if (item[attr] === null) return null;
  let dataType = "archive";
  if (item.collection_category) dataType = "collection";
  if (Array.isArray(item[attr])) {
    return (
      <div>
        {item[attr].map((value, i) => (
          <span className="list-unstyled" key={i}>
            {listValue(dataType, attr, value, languages)}
          </span>
        ))}
      </div>
    );
  } else if (attr === "identifier") {
    return (
      <a href={`/${dataType}/${arkLinkFormatted(item.custom_key)}`}>
        {item[attr]}
      </a>
    );
  } else if (attr === "rights_statement") {
    return htmlParsedValue(item[attr]);
  } else if (attr === "custom_key") {
    return htmlParsedValue(
      `<a href="http://idn.lib.vt.edu/${item.custom_key}">idn.lib.vt.edu/${item.custom_key}</a>`
    );
  } else if (attr === "description") {
    return <MoreLink dataType={dataType} item={item} />;
  } else if (attr === "date") {
    return dateFormatted(item);
  } else if (attr === "size") {
    if (dataType === "collection") return collectionSize(item);
    else return 0;
  } else {
    return item[attr];
  }
}

const MoreLink = ({ dataType, item }) => {
  return (
    <span>
      <span>{item["description"].substring(0, 100)}</span>
      <a
        className="more-link"
        href={`/${dataType}/${arkLinkFormatted(item.custom_key)}`}
      >
        . . .[more]
      </a>
    </span>
  );
};

const RenderAttribute = ({ item, attribute, languages }) => {
  if (textFormat(item, attribute, languages)) {
    let value_style = attribute === "identifier" ? "identifier" : "";
    return (
      <div className="collection-detail">
        <table>
          <tbody>
            <tr>
              <td className="collection-detail-key">{labelAttr(attribute)}:</td>
              <td className={`collection-detail-value ${value_style}`}>
                {textFormat(item, attribute, languages)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    return <></>;
  }
};

const RenderAttrDetailed = ({ item, attribute, languages }) => {
  if (textFormat(item, attribute, languages)) {
    let value_style = attribute === "identifier" ? "identifier" : "";
    return (
      <tr>
        <td className="collection-detail-key">{labelAttr(attribute)}</td>
        <td className={`collection-detail-value ${value_style}`}>
          {textFormat(item, attribute, languages)}
        </td>
      </tr>
    );
  } else {
    return <></>;
  }
};
export const RenderItems = ({ keyArray, item, languages }) => {
  let render_items = [];
  for (const [index, value] of keyArray.entries()) {
    render_items.push(
      <RenderAttribute
        item={item}
        attribute={value}
        key={index}
        languages={languages}
      />
    );
  }
  return render_items;
};

export const RenderItemsDetailed = ({ keyArray, item, languages }) => {
  let render_items_detailed = [];
  for (const [index, value] of keyArray.entries()) {
    render_items_detailed.push(
      <RenderAttrDetailed
        item={item}
        attribute={value}
        key={index}
        languages={languages}
      />
    );
  }
  return render_items_detailed;
};
