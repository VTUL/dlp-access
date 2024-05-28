import { FC, useEffect, useState } from "react";
import X3DElement from "src/components/X3DElement";
import MiradorViewer from "src/components/MiradorViewer";
import "../../css/3D2Diiif.scss";
import { LeafletThumb } from "../LeafletThumb";

type Props = {
  item: {
    archiveOptions: string;
    location: [number, number];
    manifest_url: string;
    thumbnail_path: string;
    title: string;
  };
  frameWidth: number;
  frameHeight: number;
  site: {};
};

export const ThreeD2DiiifHandler: FC<Props> = ({
  item,
  frameWidth,
  frameHeight,
  site
}) => {
  const options = JSON.parse(item.archiveOptions);
  const [threeD, setThreeD] = useState(
    options.assets.media_type === "3d_2diiif" ? "primary" : "secondary"
  );

  useEffect(() => {
    const w = window as any;
    const x3dom = w.x3dom;
    if (x3dom) {
      x3dom.reload();
    }
  }, [item, threeD]);

  const getThreeDThumb = () => {
    return options?.assets?.morpho_thumb || item.thumbnail_path;
  };

  const getIIIFThumb = () => {
    return item.thumbnail_path;
  };

  const thumbClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setThreeD(threeD === "primary" ? "secondary" : "primary");
  };

  const primarySectionContent = () => {
    let primaryContent = <></>;
    try {
      primaryContent = (
        <>
          <div
            className={`x3d-vis ${threeD === "primary" ? "primary" : "hidden"}`}
          >
            <X3DElement
              url={options.assets.x3d_config}
              frameWidth={frameWidth}
              frameHeight={frameHeight}
            />
          </div>
          <MiradorViewer
            item={item}
            site={site}
            type="3d_2diiif"
            hidden={threeD === "primary"}
          />
        </>
      );
    } catch (e) {
      console.error(e);
    }
    return primaryContent;
  };

  const secondarySectionContent = () => {
    const thumb = threeD === "primary" ? getIIIFThumb() : getThreeDThumb();
    return (
      <span className="thumb-wrapper">
        <span className="thumb-label">
          View {threeD === "primary" ? "2D" : "3D"} Full size
        </span>
        <button onClick={thumbClickHandler}>
          <img
            src={thumb}
            alt={threeD === "primary" ? "2D Thumbnail" : "3D Thumbnail"}
          />
        </button>
      </span>
    );
  };

  const controlSectionContent = () => {
    return (
      <div className="controls">
        <table>
          <tbody>
            <tr>
              <td>
                <span className="control-header-label">Action</span>
              </td>
              <td>
                <span className="control-header-label">Mouse command</span>
              </td>
              <td>
                <span className="control-header-label">Key/pad command</span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="action-label">Rotate</span>
              </td>
              <td>
                <span className="control-label">Left click</span>
              </td>
              <td>
                <span className="control-label">Shift + Left drag</span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="action-label">Pan</span>
              </td>
              <td>
                <span className="control-label">Middle click</span>
              </td>
              <td>
                <span className="control-label">Ctrl + Left drag</span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="action-label">Zoom</span>
              </td>
              <td>
                <span className="control-label">Right click + Scroll</span>
              </td>
              <td>
                <span className="control-label">Alt(option) + Left drag</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="multimedia-section" id="multimedia-section">
      <div className="left-wrapper section-border">
        <div className="primary-wrapper section-wrapper">
          {primarySectionContent()}
        </div>
      </div>
      <div className="right-wrapper">
        <div className="map-wrapper section-wrapper section-border">
          <LeafletThumb location={item.location} title={item.title} />
        </div>
        <div className="secondary-wrapper section-wrapper section-border">
          {secondarySectionContent()}
        </div>
        <div
          className={`contols-wrapper section-wrapper section-border ${
            threeD === "primary" ? "" : "hidden"
          }`}
        >
          {controlSectionContent()}
        </div>
      </div>
    </div>
  );
};
