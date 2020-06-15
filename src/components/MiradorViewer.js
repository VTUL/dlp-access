import React, { Component } from "react";
import "../css/Viewer.css";

class MiradorViewer extends Component {
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

export default MiradorViewer;
