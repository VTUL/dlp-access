const Auth = require ("aws-amplify").Auth;
import "cypress-file-upload"
import "cypress-localstorage-commands"; 
import { Amplify } from "aws-amplify";
import config from "../../src/aws-exports";
const username = "devtest"; 
const password = Cypress. env("password"); 

Amplify.configure(config)
const awsconfig = { 
  aws_user_pools_id: Amplify.Auth._config.aws_user_pools_id, 
  aws_user_pools_web_client_id: Amplify.Auth._config.aws_user_pools_web_client_id, 
}; 
Auth.configure(awsconfig);

Cypress.Commands.add("signIn", () => {
    cy.then(() => Auth.signIn(username, password)).then((cognitoUser) => {
      const idToken = cognitoUser.signInUserSession.idToken.jwtToken;
      const accessToken = cognitoUser.signInUserSession.accessToken.jwtToken;
  
      const makeKey = (name) => `CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.${cognitoUser.username}.${name}`;
  
      cy.setLocalStorage(makeKey("accessToken"), accessToken);
      cy.setLocalStorage(makeKey("idToken"), idToken);
      cy.setLocalStorage(
        `CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.LastAuthUser`,
        cognitoUser.username
      );
    });
    cy.saveLocalStorage();
  });