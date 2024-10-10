/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { getEmbargo } from "../graphql/queries";
import { updateEmbargo } from "../graphql/mutations";
export default function EmbargoUpdateForm(props) {
  const {
    id: idProp,
    embargo: embargoModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    identifier: "",
    start_date: "",
    end_date: "",
    note: "",
    record_type: "",
  };
  const [identifier, setIdentifier] = React.useState(initialValues.identifier);
  const [start_date, setStart_date] = React.useState(initialValues.start_date);
  const [end_date, setEnd_date] = React.useState(initialValues.end_date);
  const [note, setNote] = React.useState(initialValues.note);
  const [record_type, setRecord_type] = React.useState(
    initialValues.record_type
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = embargoRecord
      ? { ...initialValues, ...embargoRecord }
      : initialValues;
    setIdentifier(cleanValues.identifier);
    setStart_date(cleanValues.start_date);
    setEnd_date(cleanValues.end_date);
    setNote(cleanValues.note);
    setRecord_type(cleanValues.record_type);
    setErrors({});
  };
  const [embargoRecord, setEmbargoRecord] = React.useState(embargoModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getEmbargo.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getEmbargo
        : embargoModelProp;
      setEmbargoRecord(record);
    };
    queryData();
  }, [idProp, embargoModelProp]);
  React.useEffect(resetStateValues, [embargoRecord]);
  const validations = {
    identifier: [{ type: "Required" }],
    start_date: [],
    end_date: [],
    note: [],
    record_type: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          identifier,
          start_date: start_date ?? null,
          end_date: end_date ?? null,
          note: note ?? null,
          record_type,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: updateEmbargo.replaceAll("__typename", ""),
            variables: {
              input: {
                id: embargoRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "EmbargoUpdateForm")}
      {...rest}
    >
      <TextField
        label="Identifier"
        isRequired={true}
        isReadOnly={false}
        value={identifier}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              identifier: value,
              start_date,
              end_date,
              note,
              record_type,
            };
            const result = onChange(modelFields);
            value = result?.identifier ?? value;
          }
          if (errors.identifier?.hasError) {
            runValidationTasks("identifier", value);
          }
          setIdentifier(value);
        }}
        onBlur={() => runValidationTasks("identifier", identifier)}
        errorMessage={errors.identifier?.errorMessage}
        hasError={errors.identifier?.hasError}
        {...getOverrideProps(overrides, "identifier")}
      ></TextField>
      <TextField
        label="Start date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={start_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              identifier,
              start_date: value,
              end_date,
              note,
              record_type,
            };
            const result = onChange(modelFields);
            value = result?.start_date ?? value;
          }
          if (errors.start_date?.hasError) {
            runValidationTasks("start_date", value);
          }
          setStart_date(value);
        }}
        onBlur={() => runValidationTasks("start_date", start_date)}
        errorMessage={errors.start_date?.errorMessage}
        hasError={errors.start_date?.hasError}
        {...getOverrideProps(overrides, "start_date")}
      ></TextField>
      <TextField
        label="End date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={end_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              identifier,
              start_date,
              end_date: value,
              note,
              record_type,
            };
            const result = onChange(modelFields);
            value = result?.end_date ?? value;
          }
          if (errors.end_date?.hasError) {
            runValidationTasks("end_date", value);
          }
          setEnd_date(value);
        }}
        onBlur={() => runValidationTasks("end_date", end_date)}
        errorMessage={errors.end_date?.errorMessage}
        hasError={errors.end_date?.hasError}
        {...getOverrideProps(overrides, "end_date")}
      ></TextField>
      <TextField
        label="Note"
        isRequired={false}
        isReadOnly={false}
        value={note}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              identifier,
              start_date,
              end_date,
              note: value,
              record_type,
            };
            const result = onChange(modelFields);
            value = result?.note ?? value;
          }
          if (errors.note?.hasError) {
            runValidationTasks("note", value);
          }
          setNote(value);
        }}
        onBlur={() => runValidationTasks("note", note)}
        errorMessage={errors.note?.errorMessage}
        hasError={errors.note?.hasError}
        {...getOverrideProps(overrides, "note")}
      ></TextField>
      <TextField
        label="Record type"
        isRequired={true}
        isReadOnly={false}
        value={record_type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              identifier,
              start_date,
              end_date,
              note,
              record_type: value,
            };
            const result = onChange(modelFields);
            value = result?.record_type ?? value;
          }
          if (errors.record_type?.hasError) {
            runValidationTasks("record_type", value);
          }
          setRecord_type(value);
        }}
        onBlur={() => runValidationTasks("record_type", record_type)}
        errorMessage={errors.record_type?.errorMessage}
        hasError={errors.record_type?.hasError}
        {...getOverrideProps(overrides, "record_type")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || embargoModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || embargoModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
