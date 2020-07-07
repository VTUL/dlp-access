import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";

export const fetchSiteDetails = async (component, siteName) => {
  let response = null;
  let data = null;
  try {
    data = JSON.parse(
      sessionStorage.getItem(`${siteName.toLowerCase()}_config`)
    );
  } catch (error) {
    console.log("Site details not in storage");
  }
  if (data === null) {
    console.log("Fetching site details");
    try {
      response = await fetch(
        `${process.env.REACT_APP_CONFIG_PATH}/${siteName.toLowerCase()}.json`
      );
      data = await response.json();
    } catch (error) {
      console.error(`Error fetching config file`);
      console.error(error);
    }
    if (data === null) {
      try {
        response = await fetch(
          `${process.env.REACT_APP_CONFIG_PATH}/default.json`
        );
        data = await response.json();
      } catch (error) {
        console.error("Error fetching default.json");
        console.error(error);
      }
    } else {
      sessionStorage.setItem(
        `${siteName.toLowerCase()}_config`,
        JSON.stringify(data)
      );
    }
  }
  component.setState({
    siteDetails: data
  });
};

export function getHTML(copyObj, component) {
  let copy = null;
  try {
    if (copyObj.type === "string") {
      copy = copyObj.value;
    } else if (copyObj.type === "file") {
      fetchCopyHTML(copyObj, component);
    }
  } catch (error) {
    console.error("Error setting copy for component");
  }
  if (copy !== null) {
    component.setState({ copy: copy });
  }
}

const fetchCopyHTML = async (copyObj, component) => {
  let data = null;
  try {
    data = sessionStorage.getItem(copyObj.value);
  } catch (error) {
    console.log(`${copyObj.value} not in sessionStorage`);
  }
  if (data === null) {
    try {
      const copyLink = `${process.env.REACT_APP_CONFIG_PATH}/${copyObj.value}`;
      console.log(`fetching copy from: ${copyLink}`);
      const response = await fetch(copyLink);
      data = await response.text();
    } catch (error) {
      console.error(
        `Error fetching html for ${component.constructor.name} component`
      );
      console.error(error);
    }
  }
  if (data !== null) {
    sessionStorage.setItem(copyObj.value, data);
    component.setState({ copy: data });
  }
};

export const fetchLanguages = async (component, key, callback) => {
  let data = null;
  try {
    data = JSON.parse(sessionStorage.getItem(`lang_by_${key}`));
  } catch (error) {
    console.log(`lang_by_${key} not in sessionStorage`);
  }
  if (data === null) {
    console.log(`fetching by lang_by_${key}`);
    let response = null;
    try {
      const htmlLink = `${process.env.REACT_APP_CONFIG_PATH}/language_codes_by_${key}.json`;
      response = await fetch(htmlLink);
      data = await response.json();
    } catch (error) {
      console.error(`Error fetching languages`);
      console.error(error);
    }
  }
  if (data !== null) {
    sessionStorage.setItem(`lang_by_${key}`, JSON.stringify(data));
    component.setState({ languages: data }, function() {
      if (typeof component.loadItems === "function") {
        component.loadItems();
      }
    });
  }
};

export const fetchSearchResults = async (
  component,
  { filter, sort, limit, nextToken }
) => {
  const REP_TYPE = process.env.REACT_APP_REP_TYPE;
  let archiveFilter = {
    item_category: { eq: REP_TYPE },
    visibility: { eq: true }
  };
  let collectionFilter = {
    collection_category: { eq: REP_TYPE },
    visibility: { eq: true },
    parent_collection: { exists: false }
  };
  let objectFilter = {
    or: [
      {
        collection_category: { eq: REP_TYPE },
        visibility: { eq: true },
        parent_collection: { exists: false }
      },
      {
        item_category: { eq: REP_TYPE },
        visibility: { eq: true }
      }
    ]
  };
  let searchResults = null;
  let category = "";
  let filters = {};
  let andArray = [];
  let allFields = null;
  for (const key of Object.keys(filter)) {
    if (key === "all") {
      allFields = filter["all"];
      delete filter["allFields"];
    } else if (key === "category") {
      category = filter.category;
    } else if (key === "title" || key === "description") {
      filters[key] = { matchPhrase: filter[key] };
    } else if (Array.isArray(filter[key])) {
      if (key === "date") {
        filter[key].forEach(function(value) {
          let dates = value.split(" - ");
          andArray.push({
            start_date: {
              gte: `${dates[0]}/01/01`,
              lte: `${dates[1]}/12/31`
            }
          });
        });
      } else {
        filter[key].forEach(function(value) {
          andArray.push({ [key]: { eq: value } });
        });
      }
      filters["and"] = andArray;
    } else {
      filters[key] = { eq: filter[key] };
    }
  }
  let options = {
    filter: filters,
    sort: sort,
    limit: limit,
    nextToken: nextToken
  };
  if (allFields) {
    options["otherArgs"] = { allFields: allFields };
  }
  if (category === "collection") {
    const item_fields = ["format", "medium", "resource_type", "tags"];
    if (
      filters.hasOwnProperty("and") &&
      item_fields.some(e => Object.keys(filter).indexOf(e) > -1)
    ) {
      searchResults = {
        items: [],
        total: 0,
        nextToken: null
      };
    } else {
      options["filter"] = { ...collectionFilter, ...filters };
      let Collections = null;
      if (allFields) {
        Collections = await fetchObjects(queries.fulltextCollections, options);
        searchResults = Collections.data.fulltextCollections;
      } else {
        Collections = await fetchObjects(queries.searchCollections, options);
        searchResults = Collections.data.searchCollections;
      }
    }
  } else if (category === "archive") {
    options["filter"] = { ...archiveFilter, ...filters };
    let Archives = null;
    if (allFields) {
      Archives = await fetchObjects(queries.fulltextArchives, options);
      searchResults = Archives.data.fulltextArchives;
    } else {
      Archives = await fetchObjects(queries.searchArchives, options);
      searchResults = Archives.data.searchArchives;
    }
  } else {
    options["filter"] = { ...objectFilter, ...filters };
    const Objects = await fetchObjects(queries.searchObjects, options);
    searchResults = Objects.data.searchObjects;
  }
  return searchResults;
};

const fetchObjects = async (
  gqlQuery,
  { filter, sort, limit, nextToken, otherArgs }
) => {
  const Objects = await API.graphql(
    graphqlOperation(gqlQuery, {
      filter: filter,
      sort: sort,
      limit: limit,
      nextToken: nextToken,
      ...otherArgs
    })
  );
  return Objects;
};
