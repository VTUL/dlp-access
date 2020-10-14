import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { NavLink } from "react-router-dom";
import SiteForm from "./SiteForm";
import ContentUpload from "./ContentUpload";

function SiteAdmin() {
  useEffect(() => {
    checkGroup();
  }, []);

  const [authorized, setAuthorized] = useState(false);
  const [form, setForm] = useState("site");

  const Forms = {
    site: <SiteForm />,
    contentUpload: <ContentUpload />
  };

  async function checkGroup() {
    try {
      const data = await Auth.currentUserPoolUser();
      const groups =
        data.signInUserSession.accessToken.payload["cognito:groups"];
      if (groups.indexOf("SiteAdmin") !== -1) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    } catch (err) {
      console.log("error: ", err);
      setAuthorized(false);
    }
  }

  function getForm() {
    return Forms[form];
  }
  return (
    <div>
      <div>
        <ul>
          <li>
            <NavLink onClick={() => setForm("site")} to={"/siteAdmin"}>
              General Site Config
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => setForm("contentUpload")} to={"/siteAdmin"}>
              Upload Site Content
            </NavLink>
          </li>
        </ul>
      </div>
      <h1>{authorized ? getForm() : "Not authorized to access this page!"}</h1>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(SiteAdmin);
