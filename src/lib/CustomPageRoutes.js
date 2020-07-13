import React from "react";
import { Route } from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import PermissionsPage from "../pages/PermissionsPage";
import AdditionalPages from "../pages/AdditionalPages";

const pageComponents = {
  AboutPage: AboutPage,
  PermissionsPage: PermissionsPage,
  AdditionalPages: AdditionalPages
};

function route(siteDetails, key, path, PageComponent, childKey = null) {
  let elemKey = key;
  if (childKey) {
    elemKey += "." + childKey;
  }
  return (
    <Route
      key={elemKey}
      path={path}
      exact
      render={props => (
        <PageComponent
          siteDetails={siteDetails}
          parentKey={key}
          childKey={childKey}
        />
      )}
    />
  );
}

export function buildRoutes(siteDetails) {
  let routes = [];
  for (const [key, obj] of Object.entries(siteDetails.sitePages)) {
    const pageComponent = pageComponents[obj.component];
    routes.push(route(siteDetails, key, obj.local_url, pageComponent));
    if (obj.children) {
      for (const [childKey, childObj] of Object.entries(obj.children)) {
        const childPageComponent = pageComponents[childObj.component];
        routes.push(
          route(
            siteDetails,
            key,
            childObj.local_url,
            childPageComponent,
            childKey
          )
        );
      }
    }
  }
  return routes;
}
