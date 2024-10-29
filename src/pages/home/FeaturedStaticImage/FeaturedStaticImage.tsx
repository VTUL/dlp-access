import { FC } from "react";
import "../../../css/FeaturedStaticImage.scss";
import { useSignedLink } from "../../../hooks/useSignedLink";

type Props = {
  staticImage: {
    altText: string;
    titleFont: string;
    textStyle: "capitalize" | "uppercase" | "lowercase" | "none" | null;
    titleSize: string;
    src: string;
  };
  site: {
    siteId: string;
    siteName: string;
  };
};

export const FeaturedStaticImage: FC<Props> = ({ staticImage, site }) => {
  const filename = staticImage?.src ? staticImage.src.split("/").pop()! : null;
  const imgSrc = useSignedLink(filename, "image", site?.siteId);

  if (!imgSrc) {
    return null;
  }
  return (
    <div className="home-featured-image-wrapper">
      <div className="home-static-image-wrapper">
        <img src={imgSrc} alt={staticImage.altText || ""} />
      </div>
      <div id="home-site-title-wrapper">
        <h1
          style={{
            fontFamily:
              staticImage?.titleFont || "gineso-condensed, sans-serif",
            textTransform: staticImage?.textStyle || "uppercase",
            fontSize: staticImage?.titleSize || "40px"
          }}
        >
          {site?.siteName || ""}
        </h1>
      </div>
    </div>
  );
};
