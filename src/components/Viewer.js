import React, { Component } from "react";
import "../styles/Viewer.css";

class Viewer extends Component {
  get miradorConfig() {
    return this.props.config;
  }

  componentDidMount() {
    window.Mirador(this.miradorConfig);
  }

  render() {
    return <div id={this.miradorConfig.id}></div>;
  }
}

export default Viewer;
