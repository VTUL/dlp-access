import React from "react";
import qs from "query-string";
import "../css/ListPages.css";
import ReactHtmlParser from "react-html-parser";

export function labelAttr(attr) {
  if (attr === "resource_type") return "Type";
  else if (attr === "rights_statement") return "Rights";
  else if (attr === "custom_key") return "Permanent Link";
  else if (attr === "related_url") return "Relation";
  else if (attr === "start_date") return "Date";
  else if (attr === "archive") return "Item";
  else return (attr.charAt(0).toUpperCase() + attr.slice(1)).replace("_", " ");
}

export function breadcrumbTitle(title) {
  const titleArray = title.split(",");
  return titleArray[0];
}

export function getCategory(item) {
  return item.collection_category ? "collection" : "archive";
}

export function arkLinkFormatted(customKey) {
  return customKey.replace("ark:/53696/", "");
}

export function htmlParsedValue(value) {
  return value.includes("<a href=") ? ReactHtmlParser(value) : value;
}

export function titleFormatted(item, category) {
  return (
    <h3>
      <a href={`/${category}/${arkLinkFormatted(item.custom_key)}`}>
        {item.title}
      </a>
    </h3>
  );
}
export function dateFormatted(item) {
  let circa_date = item.circa ? item.circa : "";
  let end_date = item.end_date ? " - " + parseInt(item.end_date) : "";
  let start_date = item.start_date ? parseInt(item.start_date) : "";
  return circa_date + start_date + end_date;
}

export function collectionSizeText(collection) {
  let subCollections = null;
  if (collection.subCollections) {
    subCollections =
      collection.subCollections.total != null
        ? collection.subCollections.total
        : 0;
  }
  let archives = collection.archives || 0;
  return (
    <div>
      {subCollections > 0 && <div>Collections: {subCollections}</div>}
      {archives > 0 && <div>Items: {archives}</div>}
    </div>
  );
}

export function addNewlineInDesc(content) {
  if (content) {
    content = content.split("\n").map((value, index) => {
      return <p key={index}>{value}</p>;
    });
    return <span>{content}</span>;
  }
  return <></>;
}

function listValue(category, attr, value, languages) {
  const LinkedFields = [
    "creator",
    "belongs_to",
    "language",
    "medium",
    "resource_type",
    "tags"
  ];
  if (LinkedFields.indexOf(attr) > -1) {
    let attrValue = [value];
    if (["creator", "language"].includes(attr)) {
      attrValue = value;
    }
    let parsedObject = {
      category: category,
      [attr]: attrValue,
      field: "title",
      q: "",
      view: "Gallery"
    };

    if (attr === "language" && languages !== undefined) {
      value = languages[value];
    }
    return <a href={`/search/?${qs.stringify(parsedObject)}`}>{value}</a>;
  } else if (attr === "source" || attr === "related_url") {
    return htmlParsedValue(value);
  } else {
    return value;
  }
}

function textFormat(item, attr, languages) {
  if (item[attr] === null) return null;
  let category = "archive";
  if (item.collection_category) category = "collection";
  if (Array.isArray(item[attr])) {
    return (
      <div>
        {item[attr].map((value, i) => (
          <span className="list-unstyled" key={i} data-cy="multi-field-span">
            {listValue(category, attr, value, languages)}
          </span>
        ))}
      </div>
    );
  } else if (attr === "identifier") {
    return (
      <a href={`/${category}/${arkLinkFormatted(item.custom_key)}`}>
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
    return <MoreLink category={category} item={item} />;
  } else if (attr === "date") {
    return dateFormatted(item);
  } else if (attr === "size") {
    if (category === "collection") return collectionSizeText(item);
    else return 0;
  } else {
    return item[attr];
  }
}

const MoreLink = ({ category, item }) => {
  return (
    <span>
      <span>{item["description"].substring(0, 120)}</span>
      <a
        className="more-link"
        href={`/${category}/${arkLinkFormatted(item.custom_key)}`}
      >
        . . .[more]
      </a>
    </span>
  );
};

const RenderAttribute = ({ item, attribute, languages }) => {
  if (textFormat(item, attribute.field, languages)) {
    let value_style = attribute.field === "identifier" ? "identifier" : "";
    return (
      <div className="collection-detail">
        <table aria-label="Item Metadata">
          <tbody>
            <tr>
              <th className="collection-detail-key" scope="row">
                {attribute.label}:
              </th>
              <td className={`collection-detail-value ${value_style}`}>
                {textFormat(item, attribute.field, languages)}
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

const RenderAttrDetailed = ({ item, attribute, languages, type }) => {
  if (textFormat(item, attribute.field, languages)) {
    let value_style = attribute.field === "identifier" ? "identifier" : "";
    if (type === "table") {
      return (
        <tr>
          <th className="collection-detail-key" scope="row">
            {attribute.label}
          </th>
          <td className={`collection-detail-value ${value_style}`}>
            {textFormat(item, attribute.field, languages)}
          </td>
        </tr>
      );
    } else if (type === "grid") {
      return (
        <div className="collection-detail-entry">
          <div className="collection-detail-key">{attribute.label}</div>
          <div className={`collection-detail-value ${value_style}`}>
            {textFormat(item, attribute.field, languages)}
          </div>
        </div>
      );
    }
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

export const RenderItemsDetailed = ({
  keyArray,
  item,
  languages,
  type = "table"
}) => {
  let render_items_detailed = [];
  for (const [index, value] of keyArray.entries()) {
    render_items_detailed.push(
      <RenderAttrDetailed
        item={item}
        attribute={value}
        key={index}
        languages={languages}
        type={type}
      />
    );
  }
  return render_items_detailed;
};
