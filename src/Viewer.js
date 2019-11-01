import React from "react";
import "./Viewer.css";

class Viewer extends React.Component {
  componentDidMount() {
    window.Mirador(this.props.config);
  }

  render() {
    return <div id={this.props.config.id}></div>;
  }
}

export default Viewer;
