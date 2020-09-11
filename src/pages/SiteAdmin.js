import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

function SiteAdmin() {
  useEffect(() => {
    checkGroup();
  }, []);

  const [authorized, setAuthorized] = useState(false);

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

  return (
    <div>
      <h1>
        {authorized
          ? "Update Site Configurations"
          : "Not authorized to access this page!"}
      </h1>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(SiteAdmin);
