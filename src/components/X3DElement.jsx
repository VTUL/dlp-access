import React, { Component } from "react";
import "../css/imports/x3domStyles.css";

class X3DElement extends Component {
  constructor(props) {
    super(props);
    this.x3dLoaded = this.x3dLoaded.bind(this);
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
  }

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
      <section>
        <div className="model-container x3d">
          <x3d
            id="x3dElement"
            is="x3d"
            width={`${this.props.frameWidth}px`}
            height={`${this.props.frameHeight}px`}
          >
            <scene is="x3d">
              <navigationInfo type="EXAMINE" is="x3d" />
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
          </x3d>
        </div>
      </section>
    );
  }
}
export default X3DElement;
