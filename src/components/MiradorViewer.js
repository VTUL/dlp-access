import { Component } from "react";
import Mirador from "mirador/dist/mirador.min.js";
import "../css/Viewer.scss";

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
        allowWindowSideBar: false,
        defaultView: "single",
        panels: {
          canvas: false,
          search: false
        }
      },
      views: [{ key: "single", behaviors: ["individuals"] }],
      windows: [
        {
          manifestId: this.props.item.manifest_url
        }
      ],
      thumbnailNavigation: {
        defaultPosition: "far-bottom"
      },
      workspace: {
        draggingEnabled: false,
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
      this.props.site.miradorOptions &&
      this.props.site.miradorOptions.windowObjects
    ) {
      config.windows[0] = Object.assign(
        config.windows[0],
        this.props.site.miradorOptions.windowObjects
      );
    }
    return config;
  }

  componentDidUpdate(prevProps) {
    if (this.props.item.manifest_url !== prevProps.item.manifest_url) {
      Mirador.viewer(this.miradorConfig());
    }
  }

  componentDidMount() {
    console.log("MiradorViewer componentDidMount Mirador:");
    console.log(Mirador);
    Mirador.viewer(this.miradorConfig());
  }

  render() {
    return <div id={this.miradorConfig().id}></div>;
  }
}

export default MiradorViewer;
