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
import { getCollectionmap } from "../graphql/queries";
import { updateCollectionmap } from "../graphql/mutations";
export default function CollectionmapUpdateForm(props) {
  const {
    id: idProp,
    collectionmap: collectionmapModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    collectionmap_category: "",
    collection_id: "",
    create_date: "",
    map_object: "",
    modified_date: ""
  };
  const [collectionmap_category, setCollectionmap_category] = React.useState(
    initialValues.collectionmap_category
  );
  const [collection_id, setCollection_id] = React.useState(
    initialValues.collection_id
  );
  const [create_date, setCreate_date] = React.useState(
    initialValues.create_date
  );
  const [map_object, setMap_object] = React.useState(initialValues.map_object);
  const [modified_date, setModified_date] = React.useState(
    initialValues.modified_date
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = collectionmapRecord
      ? { ...initialValues, ...collectionmapRecord }
      : initialValues;
    setCollectionmap_category(cleanValues.collectionmap_category);
    setCollection_id(cleanValues.collection_id);
    setCreate_date(cleanValues.create_date);
    setMap_object(cleanValues.map_object);
    setModified_date(cleanValues.modified_date);
    setErrors({});
  };
  const [collectionmapRecord, setCollectionmapRecord] = React.useState(
    collectionmapModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getCollectionmap.replaceAll("__typename", ""),
              variables: { id: idProp }
            })
          )?.data?.getCollectionmap
        : collectionmapModelProp;
      setCollectionmapRecord(record);
    };
    queryData();
  }, [idProp, collectionmapModelProp]);
  React.useEffect(resetStateValues, [collectionmapRecord]);
  const validations = {
    collectionmap_category: [{ type: "Required" }],
    collection_id: [{ type: "Required" }],
    create_date: [],
    map_object: [{ type: "Required" }],
    modified_date: []
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
          collectionmap_category,
          collection_id,
          create_date: create_date ?? null,
          map_object,
          modified_date: modified_date ?? null
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
            query: updateCollectionmap.replaceAll("__typename", ""),
            variables: {
              input: {
                id: collectionmapRecord.id,
                ...modelFields
              }
            }
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
      {...getOverrideProps(overrides, "CollectionmapUpdateForm")}
      {...rest}
    >
      <TextField
        label="Collectionmap category"
        isRequired={true}
        isReadOnly={false}
        value={collectionmap_category}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              collectionmap_category: value,
              collection_id,
              create_date,
              map_object,
              modified_date
            };
            const result = onChange(modelFields);
            value = result?.collectionmap_category ?? value;
          }
          if (errors.collectionmap_category?.hasError) {
            runValidationTasks("collectionmap_category", value);
          }
          setCollectionmap_category(value);
        }}
        onBlur={() =>
          runValidationTasks("collectionmap_category", collectionmap_category)
        }
        errorMessage={errors.collectionmap_category?.errorMessage}
        hasError={errors.collectionmap_category?.hasError}
        {...getOverrideProps(overrides, "collectionmap_category")}
      ></TextField>
      <TextField
        label="Collection id"
        isRequired={true}
        isReadOnly={false}
        value={collection_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              collectionmap_category,
              collection_id: value,
              create_date,
              map_object,
              modified_date
            };
            const result = onChange(modelFields);
            value = result?.collection_id ?? value;
          }
          if (errors.collection_id?.hasError) {
            runValidationTasks("collection_id", value);
          }
          setCollection_id(value);
        }}
        onBlur={() => runValidationTasks("collection_id", collection_id)}
        errorMessage={errors.collection_id?.errorMessage}
        hasError={errors.collection_id?.hasError}
        {...getOverrideProps(overrides, "collection_id")}
      ></TextField>
      <TextField
        label="Create date"
        isRequired={false}
        isReadOnly={false}
        value={create_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              collectionmap_category,
              collection_id,
              create_date: value,
              map_object,
              modified_date
            };
            const result = onChange(modelFields);
            value = result?.create_date ?? value;
          }
          if (errors.create_date?.hasError) {
            runValidationTasks("create_date", value);
          }
          setCreate_date(value);
        }}
        onBlur={() => runValidationTasks("create_date", create_date)}
        errorMessage={errors.create_date?.errorMessage}
        hasError={errors.create_date?.hasError}
        {...getOverrideProps(overrides, "create_date")}
      ></TextField>
      <TextField
        label="Map object"
        isRequired={true}
        isReadOnly={false}
        value={map_object}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              collectionmap_category,
              collection_id,
              create_date,
              map_object: value,
              modified_date
            };
            const result = onChange(modelFields);
            value = result?.map_object ?? value;
          }
          if (errors.map_object?.hasError) {
            runValidationTasks("map_object", value);
          }
          setMap_object(value);
        }}
        onBlur={() => runValidationTasks("map_object", map_object)}
        errorMessage={errors.map_object?.errorMessage}
        hasError={errors.map_object?.hasError}
        {...getOverrideProps(overrides, "map_object")}
      ></TextField>
      <TextField
        label="Modified date"
        isRequired={false}
        isReadOnly={false}
        value={modified_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              collectionmap_category,
              collection_id,
              create_date,
              map_object,
              modified_date: value
            };
            const result = onChange(modelFields);
            value = result?.modified_date ?? value;
          }
          if (errors.modified_date?.hasError) {
            runValidationTasks("modified_date", value);
          }
          setModified_date(value);
        }}
        onBlur={() => runValidationTasks("modified_date", modified_date)}
        errorMessage={errors.modified_date?.errorMessage}
        hasError={errors.modified_date?.hasError}
        {...getOverrideProps(overrides, "modified_date")}
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
          isDisabled={!(idProp || collectionmapModelProp)}
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
              !(idProp || collectionmapModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
