import { FC } from "react";
import "../../css/Thumbnail.scss";
import { useSignedLink } from "../../hooks/useSignedLink";

const THUMBNAIL_FALLBACK = "/images/fallback_thumbnail.jpg";

type Props = {
  item: Collection | Archive;
  site: Site;
  category?: string;
  className?: string;
  altText?: boolean;
  imgURL?: string;
};

export const Thumbnail: FC<Props> = ({
  item,
  site,
  category,
  className,
  altText,
  imgURL
}) => {
  const image = useSignedLink(
    imgURL || item.thumbnail_path,
    "image",
    site?.siteId
  );

  return (
    <div className="image-container">
      {category && (
        <div className={`${category}-label`}>
          <p>{category === "collection" ? "Collection" : "Item"}</p>
        </div>
      )}
      <img
        className={className}
        src={image || THUMBNAIL_FALLBACK}
        alt={altText ? item.title : ""}
      />
    </div>
  );
};
