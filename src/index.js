import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import "./css/colors.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import Amplify from "aws-amplify";
import config from "./aws-exports";

import "bootstrap/dist/css/bootstrap.css";

Amplify.configure(config);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
