import "../../css/ArchivePage.scss";
import MiradorViewer from "src/components/MiradorViewer";

const AnotherMirador = ({ item, site }) => {
  const fritzManifestUrl =
    "https://wellcomelibrary.org/iiif/b18035723/manifest";
  item.manifest_url = fritzManifestUrl;
  return (
    <>
      <div role="region" aria-label="Item media" className="pt-4">
        <MiradorViewer item={item} site={site} />
      </div>
    </>
  );
};

export default AnotherMirador;
