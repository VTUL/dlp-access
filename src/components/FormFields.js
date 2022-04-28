import React from "react";
import { Form } from "semantic-ui-react";
import FileUploadField from "./FileUploadField";

export const input = (options, type) => {
  let retVal = null;
  switch (type) {
    case "select":
      retVal = selectInput(options);
      break;
    case "textArea":
      retVal = textAreaInput(options);
      break;
    case "date":
      retVal = dateInput(options);
      break;
    case "checkBox":
      retVal = checkBox(options);
      break;
    case "file":
      retVal = fileInput(options);
      break;
    default:
      retVal = defaultInput(options);
      break;
  }
  return retVal;
};

const defaultInput = options => {
  const {
    label,
    id,
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    required
  } = options;
  return (
    <Form.Input
      required={required}
      key={id || name}
      id={id || name}
      label={label}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

const selectInput = options => {
  const { label, id, name, value, onChange, entries, required } = options;
  return (
    <div className={`${required ? "required " : ""} field`}>
      <label key={id || name} htmlFor={id}>
        {label}
      </label>
      <select id={id || name} name={name} value={value} onChange={onChange}>
        {entries.map(entry => (
          <option key={entry.id} value={entry.id}>
            {entry.text}
          </option>
        ))}
      </select>
    </div>
  );
};

const textAreaInput = options => {
  const { id, label, name, placeholder, value, onChange } = options;
  return (
    <Form.TextArea
      key={id || name}
      id={id || name}
      label={label}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

const dateInput = options => {
  const {
    outerClass,
    innerClass,
    label,
    id,
    name,
    value,
    required,
    onChange
  } = options;
  return (
    <div
      className={`${outerClass} ${required ? "required" : ""}`}
      key={id || name}
    >
      <label htmlFor={id || name}>{label}</label>
      <div className={innerClass}>
        <input
          type="date"
          id={id || name}
          name={name}
          value={value}
          onChange={event => onChange(event, id)}
        ></input>
      </div>
    </div>
  );
};

const checkBox = options => {
  const { outerClass, label, id, name, onChange, checked } = options;
  return (
    <div className={outerClass} key={`${id || name}_wrapper`}>
      <label htmlFor={id || name}>
        {label}
        <input
          id={id || name}
          type="checkbox"
          onChange={onChange}
          key={id || name}
          name={name}
          checked={checked}
        />
      </label>
    </div>
  );
};

const fileInput = options => {
  const {
    label,
    id,
    name,
    placeholder,
    setSrc,
    fileType,
    setFileFolder,
    setFileCharacterization,
    context,
    required,
    value
  } = options;
  return (
    <FileUploadField
      required={required}
      key={id || name}
      label={label}
      input_id={id || name}
      name={name}
      placeholder={placeholder}
      setSrc={setSrc}
      fileType={fileType}
      setFileFolder={setFileFolder}
      setFileCharacterization={setFileCharacterization}
      context={context}
      value={value}
    />
  );
};
