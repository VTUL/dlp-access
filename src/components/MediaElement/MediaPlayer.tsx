import { FC } from "react";
import { useSignedLink } from "../../hooks/useSignedLink";

type Props = {
  mediaSrc: string;
  filename: string;
  id?: string;
  width?: string;
  height?: string;
  preload?: string;
  mediaType: "generic" | "audio" | "video" | "iiif" | "3d_2diiif";
  site: {
    siteId: string;
  };
  poster: string | null;
};

export const MediaPlayer: FC<Props> = ({
  mediaSrc,
  filename,
  id,
  width,
  height,
  preload,
  mediaType,
  site,
  poster
}) => {
  const fileExt = filename && filename.split(".").pop();
  const trackSrc = filename && filename.replace(`.${fileExt}`, ".vtt");
  const captionSrc = useSignedLink(trackSrc, "audio", site.siteId);
  const sourceTag = (
    <source src={mediaSrc ?? undefined} type={`${mediaType}/${fileExt}`} />
  );
  const tracksTag = captionSrc && (
    <track
      src={captionSrc}
      kind="subtitles"
      srcLang="en"
      label="English"
      data-testid="track1"
    />
  );

  return mediaType === "video" ? (
    <video
      id={id}
      width={width}
      height={height}
      poster={poster || ""}
      controls
      preload={preload || ""}
      data-testid="video1"
    >
      {sourceTag} {tracksTag}
    </video>
  ) : (
    <audio
      id={id}
      preload={preload || ""}
      controls
      style={{ width }}
      data-testid="audio1"
    >
      {sourceTag}
    </audio>
  );
};
