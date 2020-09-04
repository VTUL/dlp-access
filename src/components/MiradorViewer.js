import React, { Component } from "react";
import mirador from "mirador";
import "../css/Viewer.css";

class MiradorViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annotationTooltipVisible: false,
      viewTypeControlVisible: false
    };
  }

  miradorConfig() {
    let config = {
      language: "en",
      id: "mirador_viewer",
      window: {
        allowClose: false,
        allowFullscreen: true,
        allowMaximize: false,
        allowWindowSideBar: true,
        defaultView: "single",
        panels: {
          canvas: false,
          search: false
        }
      },
      windows: [
        {
          manifestId: this.props.item.manifest_url
        }
      ],
      workspace: {
        allowNewWindows: false,
        isWorkspaceAddVisible: false,
        showZoomControls: true,
        type: "mosaic"
      },
      workspaceControlPanel: {
        enabled: false
      }
    };
    if (
      this.props.siteDetails.miradorOptions &&
      this.props.siteDetails.miradorOptions.windowObjects
    ) {
      config.windows[0] = Object.assign(
        config.windows[0],
        this.props.siteDetails.miradorOptions.windowObjects
      );
    }
    return config;
  }

  componentDidMount() {
    this.miradorConfig();
    mirador.viewer(this.miradorConfig());
  }

  render() {
    return <div id={this.miradorConfig().id}></div>;
  }
}

export default MiradorViewer;
