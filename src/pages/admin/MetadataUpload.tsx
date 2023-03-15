import { FC, ChangeEvent, useState } from "react";
import ContentUpload from "./ContentUpload";

export const MetadataUpload: FC = () => {
  const [recordType, setRecordType] = useState<String>("collection");

  const typeChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setRecordType(event.target.value);
  };

  return (
    <div className="col-lg-9 col-sm-12 admin-content">
      <div>Upload your metadata in CSV format to create or update your:</div>
      <div className="field">
        <div className="ui radio checkbox">
          <input
            type="radio"
            name="metadataUploadRadioGroup"
            value="collection"
            id="collection"
            checked={recordType === "collection"}
            onChange={typeChangeHandler}
          />
          <label htmlFor="collection">Collection</label>
        </div>
      </div>

      <div className="field">
        <div className="ui radio checkbox">
          <input
            type="radio"
            name="metadataUploadRadioGroup"
            value="archive"
            id="archive"
            checked={recordType === "archive"}
            onChange={typeChangeHandler}
          />
          <label htmlFor="archive">Archive</label>
        </div>
      </div>
      <ContentUpload
        contentType="metadata"
        recordType={recordType}
        prompt={`Upload ${recordType} metadata`}
      />
    </div>
  );
};
