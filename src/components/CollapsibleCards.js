import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import CopyrightIcon from "@mui/icons-material/Copyright";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { LeafletThumb } from "./LeafletThumb";
import Citation from "../components/Citation";

import "../css/CollapsibleCards.scss";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

const single_value_headers = [
  "bibliographic_citation",
  "circa",
  "end_date",
  "explicit",
  "explicit_content",
  "identifier",
  "start_date",
  "title"
];

const multi_value_headers = [
  "alternative",
  "basis_of_record",
  "belongs_to",
  "contributor",
  "conforms_to",
  "coverage",
  "created",
  "creator",
  "date",
  "description",
  "display_date",
  "extent",
  "format",
  "has_format",
  "has_part",
  "has_version",
  "is_format_of",
  "is_version_of",
  "language",
  "license",
  "location",
  "medium",
  "other_identifier",
  "provenance",
  "publisher",
  "references",
  "related_url",
  "repository",
  "resource_type",
  "rights",
  "rights_holder",
  "source",
  "spatial",
  "subject",
  "tags",
  "temporal",
  "type"
];

const getMarker = (marker) => {
  switch (marker) {
    case "location":
      return <LocationOnIcon style={{ color: "#ffffff", fontSize: "0.8em" }} />;

    case "about":
      return <InfoIcon style={{ color: "#ffffff", fontSize: "0.8em" }} />;

    case "copyright":
      return <CopyrightIcon style={{ color: "#ffffff", fontSize: "0.8em" }} />;

    case "citation":
      return (
        <LocalLibraryIcon style={{ color: "#ffffff", fontSize: "0.8em" }} />
      );

    default:
      return null;
  }
};

const getLocationData = (data) => {
  console.log(data.location);
  return (
    <>
      {data.location ? (
        <div className="map-wrapper section-wrapper">
          <LeafletThumb location={data.location} title={data.title} />
        </div>
      ) : (
        <div className="no-location">Location data not available</div>
      )}
    </>
  );
};

const modifyKey = (key) => {
  const newKey = key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return newKey;
};

const getAboutData = (data) => {
  let items = ["description", "rights_holder", "location", "visibility"];
  return (
    <div>
      {single_value_headers.map((key) =>
        data[key] && !items.includes(key) ? (
          <div style={{ display: "flex", padding: "2px" }}>
            <h6 style={{ flex: 3 }}>{modifyKey(key)}</h6>
            <div style={{ flex: 7 }}>{data[key]}</div>
          </div>
        ) : null
      )}
      {multi_value_headers.map((key) =>
        data[key] && !items.includes(key) && data[key].length > 0 ? (
          <div style={{ display: "flex", padding: "4px 2px" }}>
            <h6 style={{ flex: 3 }}>{modifyKey(key)}</h6>
            <div style={{ flex: 7 }}>
              {data[key].map((value, index) => (
                <div key={index}>{value}</div>
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

const getCitationData = (data, site) => {
  return <Citation item={data} site={site} />;
};

const getCopyrightData = (data) => {
  let key = "rights_holder";
  return (
    <div>
      {data[key] && (
        <div style={{ display: "flex" }}>
          <h6 key={key} style={{ flex: 3 }}>{`${modifyKey(key)} `}</h6>
          <p key={key} style={{ flex: 7 }}>{` ${data[key]}`}</p>
        </div>
      )}
    </div>
  );
};

const getContent = (marker, data, site) => {
  switch (marker) {
    case "location":
      return getLocationData(data);

    case "about":
      return getAboutData(data);

    case "copyright":
      return getCopyrightData(data);

    case "citation":
      return getCitationData(data, site);

    default:
      return null;
  }
};

export default function CollapsibleCard({ title, marker, data, site }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ width: "100%", marginBottom: "1vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#861f41",
          color: "white",
          fontSize: "2rem"
        }}
      >
        <CardHeader
          avatar={getMarker(marker)}
          title={title}
          titleTypographyProps={{ style: { fontSize: "0.55em" } }}
          style={{ padding: "0.2em" }}
        />
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            style={{ padding: "2px" }}
          >
            <ExpandMoreIcon
              style={{ padding: "2px", color: "white", fontSize: "2rem" }}
            />
          </ExpandMore>
        </CardActions>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="card-content">
          {getContent(marker, data, site)}
        </CardContent>
      </Collapse>
    </Card>
  );
}
