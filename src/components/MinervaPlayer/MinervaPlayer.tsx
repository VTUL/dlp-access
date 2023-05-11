import React, { FC, ReactElement, useState } from "react";
import "../../css/Viewer.scss";
import MinervaStory from "minerva-browser";
import { Thumbnail } from "../Thumbnail";
import { Link, useLocation } from "react-router-dom";
import Modal from "react-modal";

interface MinervaPlayerProps {
  item: any;
}

declare global {
  interface Window { viewer: any; }
}

export const MinervaPlayer: FC<MinervaPlayerProps> = ({item}: MinervaPlayerProps): ReactElement => {
  let display:(ReactElement);
  const location = useLocation();
  const [fullScreenViewer, setFullScreenViewer] = useState(false);

  const setFullScreenView = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    const nav = document.getElementById("vt_nav");
    nav?.classList.add("hidden");
    setFullScreenViewer(true);
  };

  const setDefaultView = (event: React.SyntheticEvent): void => {
    window.viewer.then((v:any) => {v.destroy()})
    const nav = document.getElementById("vt_nav");
    nav?.classList.remove("hidden")

    setFullScreenViewer(false);
  };


  const defaultView = (): ReactElement => {
    return (
      <div>
        <Thumbnail
          item={item}
          imgURL={item.thumbnail_path}
          className={"minerva-thumbnail"}
          label={item.title}
          altText={item.title}
          category="archive"
          site={{siteId: ""}}
        />
        <span id="minerva-open-dialog">
          This record type requires a full screen image viewer. Please
          click{" "}
          <Link to={location.pathname} onClick={setFullScreenView}>
            here
          </Link>{" "}
          to open the viewer.
        </span>
      </div>
    );
  };


  const fullScreenView = (): ReactElement  => {
    const customStyles = {
      content: {
        display: 'block',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        zIndex: 10000
      }
    };
    return (
      <Modal
        isOpen={fullScreenViewer}
        onAfterOpen={initializeMinerva}
        style={customStyles}
        contentLabel="Minerva Modal"
        appElement={document.getElementById('fullScreenWrapper') as HTMLElement}
      >
        <>
          <div id="minerva-browser"></div>
          <span id="minerva-browser-closer">
            <Link to={location.pathname} onClick={setDefaultView}>Return to metadata view</Link>
          </span>
        </>
      </Modal>
    );
  };

  
  const initializeMinerva = () => {
    try {
      window.viewer = MinervaStory.build_page({
        hideWelcome: true,
        exhibit: item.manifest_url,
        id: "minerva-browser",
        embedded: true
      });
    } catch (error) {
      console.log("error rendering Minerva")
    }
  };

  if (fullScreenViewer) {
    display = fullScreenView();
  } else {
    display = defaultView();
  }
  
  return <div>{display}</div>;
};
