import { useState, useEffect } from "react";
import {
  getCollectionFromCustomKey,
  getTopLevelParentForCollection
} from "../../../lib/fetchTools";

export const useGetCollection = (customKey: string) => {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [collectionCustomKey, setCollectionCustomKey] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string[] | null>(null);
  const [thumbnail_path, setThumbnail_path] = useState("");
  const [creator, setCreator] = useState<string[] | null>(null);
  const [updatedAt, setUpdatedAt] = useState("");
  const [isError, setIsError] = useState(false);

  // Fetches collection data from customKey and retrieves top level parent collection
  useEffect(() => {
    const getCollection = async (customKey: string) => {
      const collection = await getCollectionFromCustomKey(customKey);
      if (collection) {
        const topLevelParentCollection = await getTopLevelParentForCollection(
          collection
        );
        setCollection(collection);
        setCollectionCustomKey(topLevelParentCollection.custom_key);
        setTitle(topLevelParentCollection.title);
        setDescription(topLevelParentCollection?.description);
        setThumbnail_path(topLevelParentCollection?.thumbnail_path);
        setCreator(topLevelParentCollection?.creator);
        setUpdatedAt(topLevelParentCollection?.updatedAt);
      } else {
        setIsError(true);
      }
    };
    getCollection(customKey);
  }, [customKey]);

  return {
    collection,
    collectionCustomKey,
    title,
    description,
    thumbnail_path,
    creator,
    updatedAt,
    isError
  };
};
