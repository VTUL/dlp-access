import React from "react";
import { Form } from "semantic-ui-react";
import FileUploadField from "./FileUploadField";

const setImgSrc = (context, srcName, elName) => {
  let evt = { target: { name: null, value: null, type: "upload" } };
  evt.target.name = elName;
  const filePrefix = `https://img.cloud.lib.vt.edu/sites/images/${process.env.REACT_APP_REP_TYPE.toLowerCase()}`;
  evt.target.value = `${filePrefix}/${srcName}`;
  context.updateInputValue(evt);
};

const CollectionHighlightsForm = props => {
  const items = props.highlightsList.map((obj, index) => {
    return (
      <Form id={`collectionHighlight${index}_form`} key={index}>
        <legend>Highlight {index + 1}:</legend>
        <section>
          <FileUploadField
            context={props.context}
            value={obj.img}
            label="Upload file: (Image file only):"
            name={`highlightImageSrc${index}`}
            placeholder="Enter image source"
            site={props.site}
            setSrc={setImgSrc}
          />
          <label htmlFor={`highlight${index}_title`}>Title</label>
          <input
            id={`highlight${index}_title`}
            value={obj.title}
            name="title"
            placeholder="Enter the title for the highlight."
            onChange={props.updateHighlightValue}
            data-index={index}
          />
          <label htmlFor={`highlight${index}_link`}>Link</label>
          <input
            id={`highlight${index}_link`}
            value={obj.link}
            name="link"
            placeholder="Enter the link for the highlight"
            onChange={props.updateHighlightValue}
            data-index={index}
          />
          <label htmlFor={`highlight${index}_count`}>Item Count</label>
          <input
            id={`highlight${index}_count`}
            value={obj.itemCount}
            name="itemCount"
            placeholder="Enter the item count for this highlight"
            onChange={props.updateHighlightValue}
            data-index={index}
          />
          <button onClick={props.removeHighlight} data-index={index}>
            Remove highlight
          </button>
        </section>
      </Form>
    );
  });
  return (
    <div>
      <h2>Collection Highlights</h2>
      <button
        aria-label="Add a collection highlight"
        onClick={props.addHighlight}
      >
        <i className="fas fa-plus"></i>
      </button>
      {items}
    </div>
  );
};

const CollectionHighlights = props => {
  const fields = props.highlightsList.map((obj, index) => {
    return (
      <div key={`field_${index}`} className="p-1">
        <strong>Collection Highlight {index + 1}</strong>
        <br />
        <p>
          <span className="key">Image Source:</span> {obj.img}
        </p>
        <p>
          <span className="key">Title:</span> {obj.title}
        </p>
        <p>
          <span className="key">Link:</span> {obj.link}
        </p>
        <p>
          <span className="key">Item Count:</span> {obj.itemCount}
        </p>
      </div>
    );
  });
  return fields;
};

export { CollectionHighlightsForm, CollectionHighlights };
