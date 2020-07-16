import React, { Component } from "react";
import { getHTML } from "../lib/fetchTools";

class AdditionalPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copy: ""
    };
  }

  componentDidMount() {
    getHTML(this.props.siteDetails.assetBasePath, this.props.page, this);
  }

  render() {
    return <div dangerouslySetInnerHTML={{ __html: this.state.copy }}></div>;
  }
}

export default AdditionalPages;
