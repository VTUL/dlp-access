import React, { Component } from "react";
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
      id: "mirador_viewer",
      mainMenuSettings: {
        show: false
      },
      data: [
        {
          manifestUri: this.props.item.manifest_url,
          location: this.props.siteDetails.siteId.toUpperCase()
        }
      ],
      windowObjects: [
        {
          loadedManifest: this.props.item.manifest_url,
          viewType: "ImageView",
          displayLayout: false,
          bottomPanel: false,
          bottomPanelAvailable: false,
          bottomPanelVisible: false,
          sidePanel: false,
          annotationLayer: false
        }
      ],
      showAddFromURLBox: false
    };
    if (
      this.props.siteDetails.miradorOptions &&
      this.props.siteDetails.miradorOptions.windowObjects
    ) {
      config.windowObjects[0] = Object.assign(
        config.windowObjects[0],
        this.props.siteDetails.miradorOptions.windowObjects
      );
    }
    return config;
  }

  hideElement(elementClassName) {
    window.setTimeout(function() {
      try {
        let elem = document.getElementsByClassName(elementClassName)[0];
        elem.style.display = "none";
      } catch (error) {
        console.log(`error hiding ${elementClassName}`);
      }
    }, 500);
  }

  setOptionState(option) {
    if (
      this.props.siteDetails.miradorOptions &&
      option in this.props.siteDetails.miradorOptions
    ) {
      let stateObj = {};
      stateObj[option] = this.props.siteDetails.miradorOptions[option];

      this.setState(stateObj, function() {
        this.setOptionVisibility();
      });
    } else {
      this.setOptionVisibility();
    }
  }

  setOptionVisibility() {
    if (!this.state.annotationTooltipVisible) {
      this.hideElement("mirador-osd-annotation-controls");
    }
    if (!this.state.viewTypeControlVisible) {
      this.hideElement("mirador-icon-view-type");
    }
  }

  componentDidMount() {
    this.miradorConfig();
    window.Mirador(this.miradorConfig());

    this.setOptionState("annotationTooltipVisible");
    this.setOptionState("viewTypeControlVisible");
  }

  render() {
    return <div id={this.miradorConfig().id}></div>;
  }
}

export default MiradorViewer;
