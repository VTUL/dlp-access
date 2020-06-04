import React, { Component } from "react";

class AnalyticsConfig extends Component {
  componentDidMount() {
    window.ga("create", this.props.analyticsID, "auto");
    window.ga("set", "anonymizeIp", true);
    window.ga("send", "pageview");
  }

  render() {
    return <></>;
  }
}

export default AnalyticsConfig;
