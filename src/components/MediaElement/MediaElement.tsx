import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faFile } from "@fortawesome/free-solid-svg-icons";
import { cleanHTML } from "../../lib/MetadataRenderer";
import { downloadFile } from "../../lib/fetchTools";
import { MediaPlayer } from "./MediaPlayer";
import { useSignedLink } from "../../hooks/useSignedLink";
import { useGetFileContent } from "../../hooks/useGetFileContent";
import "../../css/podcastMediaElement.scss";

type Props = {
  src: string | null;
  mediaType: "generic" | "audio" | "video" | "iiif" | "3d_2diiif";
  site: {
    siteId: string;
  };
  poster: string;
  title?: string;
  transcript?: string | null;
  isPodcast?: boolean;
};

export const MediaElement: FC<Props> = ({
  src,
  mediaType,
  site,
  poster,
  title,
  transcript,
  isPodcast
}) => {
  const [isTranscriptActive, setIsTranscriptActive] = useState(false);
  const transcriptContent = useGetFileContent(transcript || null, "html");
  const audioImg = useSignedLink(poster, "image", site.siteId);
  const filename = src ? src.split("/").pop()! : null;
  const mediaSrc = useSignedLink(filename, "audio", site.siteId);

  if (!filename || !mediaSrc) {
    return null;
  }

  return (
    <div className={isPodcast ? "media-element-container row" : ""}>
      {mediaType === "audio" && audioImg && (
        <div
          className={`audio-image-wrapper${
            isPodcast ? ` col-12 col-sm-4` : ``
          }`}
        >
          <img className="audio-img" src={audioImg} alt={title} />
        </div>
      )}
      <div className={isPodcast ? "media-player-wrapper col-12 col-sm-8" : ""}>
        <div className={isPodcast ? "media-player" : ""}>
          <MediaPlayer
            mediaSrc={mediaSrc}
            filename={filename}
            id="player1"
            width="100%"
            height="640"
            preload="auto"
            mediaType={mediaType}
            site={site}
            poster={audioImg}
          />
        </div>
        <div className="media-buttons">
          {transcript && transcriptContent && (
            <button
              type="button"
              className="transcript-button"
              aria-label="Transcript"
              onClick={() => setIsTranscriptActive(!isTranscriptActive)}
              title="View transcript"
            >
              <span className="fa-layers fa-fw fa-3x">
                <FontAwesomeIcon
                  icon={faCircle}
                  color="var(--themeHighlightColor)"
                />
                <FontAwesomeIcon icon={faFile} inverse transform="shrink-7" />
              </span>
            </button>
          )}
        </div>
      </div>
      <div
        className={isTranscriptActive ? "transcript-section" : "d-none"}
        data-testid="mediaElement_transcript"
      >
        <div id="transcript1">{cleanHTML(transcriptContent, "transcript")}</div>
        <button
          className="download-link"
          title="Download transcript"
          aria-label="Download transcript"
          onClick={() => downloadFile(transcript)}
        >
          Download Transcript
        </button>
      </div>
    </div>
  );
};
