import { useEffect, useState } from "react";

export async function getManifestJSON(manifest_url) {
  try {
    const res = await fetch(manifest_url);
    if (!res.ok) {
      throw new Error("Failed to download manifest");
    }
    const manifest = await res.json();
    return manifest;
  } catch (error) {
    console.error("Failed to get manifest:", error);
    throw error;
  }
}

export function useItemPageCount(item) {
  const [pageCnt, setPageCnt] = useState(null);
  useEffect(() => {
    if (item.collection !== "collection" && "manifest_url" in item) {
      getManifestJSON(item.manifest_url)
        .then((manifest) => {
          if (manifest && manifest.sequences && manifest.sequences.length > 0) {
            const pageCnt = manifest.sequences[0].canvases.length;
            setPageCnt(pageCnt);
          } else {
            throw new Error("Invalid manifest JSON");
          }
        })
        .catch((error) => {
          console.error("Failed to get item page count: ", error);
        });
    }
  }, [item]);

  return pageCnt;
}
