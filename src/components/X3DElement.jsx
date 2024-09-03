import React, { Component } from "react";
import "../css/imports/x3domStyles.css";

class X3DElement extends Component {
  constructor(props) {
    super(props);
    this.x3dLoaded = this.x3dLoaded.bind(this);
    this.poller = null;
    this.timer = null;
    this.viewpointRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ url: this.props.url });

    if (!document.getElementById("x3domScript")) {
      const script = document.createElement("script");
      script.id = "x3domScript";
      script.src = "https://img.cloud.lib.vt.edu/scripts/x3dom_1.8.4-dev.js";
      script.async = true;
      document.head.appendChild(script);
    }
    this.x3dLoaded();
    // this.setNavigationMode("examine");
    this.zoomFactor = 1.0;
  }

  zoomIn = () => {
    this.zoomFactor -= 0.1; // Decrease zoom factor to zoom in
    this.updateViewpointPosition();
  };

  zoomOut = () => {
    this.zoomFactor += 0.1; // Increase zoom factor to zoom out
    this.updateViewpointPosition();
  };

  updateViewpointPosition = () => {
    const viewpoint = this.viewpointRef.current;
    if (viewpoint) {
      const initialPosition = [0, 0, 10]; // The initial viewpoint position
      const newPosition = initialPosition.map(
        (coord) => coord * this.zoomFactor
      );
      viewpoint.setAttribute("position", newPosition.join(" "));
    }
  };

  x3dLoaded = () => {
    const poller = () => {
      this.timer = setTimeout(() => {
        const loaded = document.querySelector("inline").getAttribute("load");
        if (loaded) {
          let x3dElement = document.getElementById("x3dElement");
          window.setTimeout(() => {
            x3dElement?.runtime?.showAll();
          }, 1000);
        } else {
          poller();
        }
      }, 250);
    };
    poller();
  };

  render() {
    return (
      <section style={{ width: "100%", height: "100%" }}>
        <div style={{ width: "100%", height: "100%", alignItems: "center" }}>
          <x3d id="x3dElement" is="x3d" width="100%" height="100%">
            <scene is="x3d">
              <viewpoint ref={this.viewpointRef} position="0 0 10" />
              <navigationInfo type="examine" id="navType" />
              <inline
                id="x3dInline"
                DEF="x3dInline"
                nameSpaceName="tanatloc"
                is="x3d"
                mapDEFToID="true"
                url={this.props.url}
                onload={this.x3dLoaded}
              />
            </scene>
            <div className="controls">
              <button onClick={this.zoomIn} title="Zoom In">
                <i class="far fa-plus-circle"></i>
              </button>
              <button onClick={this.zoomOut} title="Zoom Out">
                <i class="far fa-minus-circle"></i>
              </button>
            </div>
          </x3d>
        </div>
      </section>
    );
  }
}
export default X3DElement;
