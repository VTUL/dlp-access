import React, { Component } from "react";
import { getFile } from "../lib/fetchTools";

class AdditionalPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copy: ""
    };
  }

  componentDidMount() {
    let copyObj = this.props.siteDetails.sitePages[this.props.parentKey];
    if (copyObj.children && this.props.childKey) {
      copyObj = copyObj.children[this.props.childKey];
    }
    const copyUrl = copyObj.data_url;
    getFile(copyUrl, "html", this);
  }

  render() {
    return <div dangerouslySetInnerHTML={{ __html: this.state.copy }}></div>;
  }
}

export default AdditionalPages;
