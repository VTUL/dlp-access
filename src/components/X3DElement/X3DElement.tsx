import { FC, useState } from "react";
import "../../css/Viewer.scss";
import { useSignedLink } from "../../hooks/useSignedLink";

type Props = {
  manifest_url: string;
  frame_size: string;
  site_id: string;
};

const X3DElement: FC<Props> = ({ manifest_url, frame_size, site_id }) => {
  const [x3dLoaded, setX3dLoaded] = useState<boolean>(false);

  const url = useSignedLink(manifest_url, "3d", site_id);

  if (!x3dLoaded) {
    const styles = document.createElement("link");
    styles.rel = "stylesheet";
    styles.type = "text/css";
    styles.href = "https://www.x3dom.org/download/x3dom.css";
    document.head.appendChild(styles);
    
    const script = document.createElement("script");
    script.src = "https://www.x3dom.org/download/x3dom.js";
    script.async = true;
    script.onload = () => {setX3dLoaded(true)};
    document.head.appendChild(script);
  }

  if(!url) {
    return null;
  }
  return (
    <section>
      <div className="model-container x3d">
        <x3d
          id="x3dElement"
          is="x3d"
          width={`${frame_size}px`}
          height={`${frame_size}px`}
        >
          <scene is="x3d">
            <navigationInfo is="x3d" type='"examine" "any"' explorationMode="all"  id="navType" ></navigationInfo>
            <transform
              is="x3d" 
              bboxCenter='0,0,0' 
              bboxSize='-1,-1,-1' 
              center='0,0,0' 
              render='true' 
              rotation='0,0,0,0' 
              scale='5,5,5' 
              scaleOrientation='0,0,1,0' 
              translation='0,0,0' 
              visible='true' >
                <inline
                  is="x3d"
                  url={url}
                ></inline>
            </transform>
          </scene>
        </x3d>
      </div>
    </section>
  );
};
export {X3DElement}
