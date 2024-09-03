/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextAreaField,
  TextField,
  useTheme
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { getCollection } from "../graphql/queries";
import { updateCollection } from "../graphql/mutations";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles }
      }
    }
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor: index === selectedBadgeIndex ? "#B8CEF9" : ""
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black"
                    }
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function CollectionUpdateForm(props) {
  const {
    id: idProp,
    collection: collectionModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    bibliographic_citation: [],
    collection_category: "",
    collectionmap_id: "",
    collectionOptions: "",
    create_date: "",
    creator: [],
    custom_key: "",
    description: [],
    display_date: [],
    end_date: "",
    explicit_content: false,
    heirarchy_path: [],
    identifier: "",
    is_part_of: [],
    language: [],
    location: [],
    modified_date: "",
    ownerinfo: "",
    parent_collection: [],
    provenance: [],
    relation: [],
    rights_holder: [],
    rights: [],
    source: [],
    spatial: [],
    start_date: "",
    subject: [],
    thumbnail_path: "",
    title: "",
    visibility: false
  };
  const [bibliographic_citation, setBibliographic_citation] = React.useState(
    initialValues.bibliographic_citation
  );
  const [collection_category, setCollection_category] = React.useState(
    initialValues.collection_category
  );
  const [collectionmap_id, setCollectionmap_id] = React.useState(
    initialValues.collectionmap_id
  );
  const [collectionOptions, setCollectionOptions] = React.useState(
    initialValues.collectionOptions
  );
  const [create_date, setCreate_date] = React.useState(
    initialValues.create_date
  );
  const [creator, setCreator] = React.useState(initialValues.creator);
  const [custom_key, setCustom_key] = React.useState(initialValues.custom_key);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [display_date, setDisplay_date] = React.useState(
    initialValues.display_date
  );
  const [end_date, setEnd_date] = React.useState(initialValues.end_date);
  const [explicit_content, setExplicit_content] = React.useState(
    initialValues.explicit_content
  );
  const [heirarchy_path, setHeirarchy_path] = React.useState(
    initialValues.heirarchy_path
  );
  const [identifier, setIdentifier] = React.useState(initialValues.identifier);
  const [is_part_of, setIs_part_of] = React.useState(initialValues.is_part_of);
  const [language, setLanguage] = React.useState(initialValues.language);
  const [location, setLocation] = React.useState(initialValues.location);
  const [modified_date, setModified_date] = React.useState(
    initialValues.modified_date
  );
  const [ownerinfo, setOwnerinfo] = React.useState(initialValues.ownerinfo);
  const [parent_collection, setParent_collection] = React.useState(
    initialValues.parent_collection
  );
  const [provenance, setProvenance] = React.useState(initialValues.provenance);
  const [relation, setRelation] = React.useState(initialValues.relation);
  const [rights_holder, setRights_holder] = React.useState(
    initialValues.rights_holder
  );
  const [rights, setRights] = React.useState(initialValues.rights);
  const [source, setSource] = React.useState(initialValues.source);
  const [spatial, setSpatial] = React.useState(initialValues.spatial);
  const [start_date, setStart_date] = React.useState(initialValues.start_date);
  const [subject, setSubject] = React.useState(initialValues.subject);
  const [thumbnail_path, setThumbnail_path] = React.useState(
    initialValues.thumbnail_path
  );
  const [title, setTitle] = React.useState(initialValues.title);
  const [visibility, setVisibility] = React.useState(initialValues.visibility);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = collectionRecord
      ? { ...initialValues, ...collectionRecord }
      : initialValues;
    setBibliographic_citation(cleanValues.bibliographic_citation ?? []);
    setCurrentBibliographic_citationValue("");
    setCollection_category(cleanValues.collection_category);
    setCollectionmap_id(cleanValues.collectionmap_id);
    setCollectionOptions(
      typeof cleanValues.collectionOptions === "string" ||
        cleanValues.collectionOptions === null
        ? cleanValues.collectionOptions
        : JSON.stringify(cleanValues.collectionOptions)
    );
    setCreate_date(cleanValues.create_date);
    setCreator(cleanValues.creator ?? []);
    setCurrentCreatorValue("");
    setCustom_key(cleanValues.custom_key);
    setDescription(cleanValues.description ?? []);
    setCurrentDescriptionValue("");
    setDisplay_date(cleanValues.display_date ?? []);
    setCurrentDisplay_dateValue("");
    setEnd_date(cleanValues.end_date);
    setExplicit_content(cleanValues.explicit_content);
    setHeirarchy_path(cleanValues.heirarchy_path ?? []);
    setCurrentHeirarchy_pathValue("");
    setIdentifier(cleanValues.identifier);
    setIs_part_of(cleanValues.is_part_of ?? []);
    setCurrentIs_part_ofValue("");
    setLanguage(cleanValues.language ?? []);
    setCurrentLanguageValue("");
    setLocation(cleanValues.location ?? []);
    setCurrentLocationValue("");
    setModified_date(cleanValues.modified_date);
    setOwnerinfo(
      typeof cleanValues.ownerinfo === "string" ||
        cleanValues.ownerinfo === null
        ? cleanValues.ownerinfo
        : JSON.stringify(cleanValues.ownerinfo)
    );
    setParent_collection(cleanValues.parent_collection ?? []);
    setCurrentParent_collectionValue("");
    setProvenance(cleanValues.provenance ?? []);
    setCurrentProvenanceValue("");
    setRelation(cleanValues.relation ?? []);
    setCurrentRelationValue("");
    setRights_holder(cleanValues.rights_holder ?? []);
    setCurrentRights_holderValue("");
    setRights(cleanValues.rights ?? []);
    setCurrentRightsValue("");
    setSource(cleanValues.source ?? []);
    setCurrentSourceValue("");
    setSpatial(cleanValues.spatial ?? []);
    setCurrentSpatialValue("");
    setStart_date(cleanValues.start_date);
    setSubject(cleanValues.subject ?? []);
    setCurrentSubjectValue("");
    setThumbnail_path(cleanValues.thumbnail_path);
    setTitle(cleanValues.title);
    setVisibility(cleanValues.visibility);
    setErrors({});
  };
  const [collectionRecord, setCollectionRecord] =
    React.useState(collectionModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getCollection.replaceAll("__typename", ""),
              variables: { id: idProp }
            })
          )?.data?.getCollection
        : collectionModelProp;
      setCollectionRecord(record);
    };
    queryData();
  }, [idProp, collectionModelProp]);
  React.useEffect(resetStateValues, [collectionRecord]);
  const [
    currentBibliographic_citationValue,
    setCurrentBibliographic_citationValue
  ] = React.useState("");
  const bibliographic_citationRef = React.createRef();
  const [currentCreatorValue, setCurrentCreatorValue] = React.useState("");
  const creatorRef = React.createRef();
  const [currentDescriptionValue, setCurrentDescriptionValue] =
    React.useState("");
  const descriptionRef = React.createRef();
  const [currentDisplay_dateValue, setCurrentDisplay_dateValue] =
    React.useState("");
  const display_dateRef = React.createRef();
  const [currentHeirarchy_pathValue, setCurrentHeirarchy_pathValue] =
    React.useState("");
  const heirarchy_pathRef = React.createRef();
  const [currentIs_part_ofValue, setCurrentIs_part_ofValue] =
    React.useState("");
  const is_part_ofRef = React.createRef();
  const [currentLanguageValue, setCurrentLanguageValue] = React.useState("");
  const languageRef = React.createRef();
  const [currentLocationValue, setCurrentLocationValue] = React.useState("");
  const locationRef = React.createRef();
  const [currentParent_collectionValue, setCurrentParent_collectionValue] =
    React.useState("");
  const parent_collectionRef = React.createRef();
  const [currentProvenanceValue, setCurrentProvenanceValue] =
    React.useState("");
  const provenanceRef = React.createRef();
  const [currentRelationValue, setCurrentRelationValue] = React.useState("");
  const relationRef = React.createRef();
  const [currentRights_holderValue, setCurrentRights_holderValue] =
    React.useState("");
  const rights_holderRef = React.createRef();
  const [currentRightsValue, setCurrentRightsValue] = React.useState("");
  const rightsRef = React.createRef();
  const [currentSourceValue, setCurrentSourceValue] = React.useState("");
  const sourceRef = React.createRef();
  const [currentSpatialValue, setCurrentSpatialValue] = React.useState("");
  const spatialRef = React.createRef();
  const [currentSubjectValue, setCurrentSubjectValue] = React.useState("");
  const subjectRef = React.createRef();
  const validations = {
    bibliographic_citation: [{ type: "Required" }],
    collection_category: [{ type: "Required" }],
    collectionmap_id: [],
    collectionOptions: [{ type: "JSON" }],
    create_date: [],
    creator: [{ type: "Required" }],
    custom_key: [],
    description: [{ type: "Required" }],
    display_date: [{ type: "Required" }],
    end_date: [],
    explicit_content: [],
    heirarchy_path: [{ type: "Required" }],
    identifier: [{ type: "Required" }],
    is_part_of: [{ type: "Required" }],
    language: [{ type: "Required" }],
    location: [{ type: "Required" }],
    modified_date: [],
    ownerinfo: [{ type: "JSON" }],
    parent_collection: [{ type: "Required" }],
    provenance: [{ type: "Required" }],
    relation: [{ type: "Required" }],
    rights_holder: [{ type: "Required" }],
    rights: [{ type: "Required" }],
    source: [{ type: "Required" }],
    spatial: [{ type: "Required" }],
    start_date: [],
    subject: [{ type: "Required" }],
    thumbnail_path: [],
    title: [{ type: "Required" }],
    visibility: [{ type: "Required" }]
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
          bibliographic_citation,
          collection_category,
          collectionmap_id: collectionmap_id ?? null,
          collectionOptions: collectionOptions ?? null,
          create_date: create_date ?? null,
          creator,
          custom_key: custom_key ?? null,
          description,
          display_date,
          end_date: end_date ?? null,
          explicit_content: explicit_content ?? null,
          heirarchy_path,
          identifier,
          is_part_of,
          language,
          location,
          modified_date: modified_date ?? null,
          ownerinfo: ownerinfo ?? null,
          parent_collection,
          provenance,
          relation,
          rights_holder,
          rights,
          source,
          spatial,
          start_date: start_date ?? null,
          subject,
          thumbnail_path: thumbnail_path ?? null,
          title,
          visibility
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
            query: updateCollection.replaceAll("__typename", ""),
            variables: {
              input: {
                id: collectionRecord.id,
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
      {...getOverrideProps(overrides, "CollectionUpdateForm")}
      {...rest}
    >
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              bibliographic_citation: values,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.bibliographic_citation ?? values;
          }
          setBibliographic_citation(values);
          setCurrentBibliographic_citationValue("");
        }}
        currentFieldValue={currentBibliographic_citationValue}
        label={"Bibliographic citation"}
        items={bibliographic_citation}
        hasError={errors?.bibliographic_citation?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "bibliographic_citation",
            currentBibliographic_citationValue
          )
        }
        errorMessage={errors?.bibliographic_citation?.errorMessage}
        setFieldValue={setCurrentBibliographic_citationValue}
        inputFieldRef={bibliographic_citationRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Bibliographic citation"
          isRequired={true}
          isReadOnly={false}
          value={currentBibliographic_citationValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.bibliographic_citation?.hasError) {
              runValidationTasks("bibliographic_citation", value);
            }
            setCurrentBibliographic_citationValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "bibliographic_citation",
              currentBibliographic_citationValue
            )
          }
          errorMessage={errors.bibliographic_citation?.errorMessage}
          hasError={errors.bibliographic_citation?.hasError}
          ref={bibliographic_citationRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "bibliographic_citation")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Collection category"
        isRequired={true}
        isReadOnly={false}
        value={collection_category}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category: value,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            value = result?.collection_category ?? value;
          }
          if (errors.collection_category?.hasError) {
            runValidationTasks("collection_category", value);
          }
          setCollection_category(value);
        }}
        onBlur={() =>
          runValidationTasks("collection_category", collection_category)
        }
        errorMessage={errors.collection_category?.errorMessage}
        hasError={errors.collection_category?.hasError}
        {...getOverrideProps(overrides, "collection_category")}
      ></TextField>
      <TextField
        label="Collectionmap id"
        isRequired={false}
        isReadOnly={false}
        value={collectionmap_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id: value,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            value = result?.collectionmap_id ?? value;
          }
          if (errors.collectionmap_id?.hasError) {
            runValidationTasks("collectionmap_id", value);
          }
          setCollectionmap_id(value);
        }}
        onBlur={() => runValidationTasks("collectionmap_id", collectionmap_id)}
        errorMessage={errors.collectionmap_id?.errorMessage}
        hasError={errors.collectionmap_id?.hasError}
        {...getOverrideProps(overrides, "collectionmap_id")}
      ></TextField>
      <TextAreaField
        label="Collection options"
        isRequired={false}
        isReadOnly={false}
        value={collectionOptions}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions: value,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            value = result?.collectionOptions ?? value;
          }
          if (errors.collectionOptions?.hasError) {
            runValidationTasks("collectionOptions", value);
          }
          setCollectionOptions(value);
        }}
        onBlur={() =>
          runValidationTasks("collectionOptions", collectionOptions)
        }
        errorMessage={errors.collectionOptions?.errorMessage}
        hasError={errors.collectionOptions?.hasError}
        {...getOverrideProps(overrides, "collectionOptions")}
      ></TextAreaField>
      <TextField
        label="Create date"
        isRequired={false}
        isReadOnly={false}
        value={create_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date: value,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator: values,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.creator ?? values;
          }
          setCreator(values);
          setCurrentCreatorValue("");
        }}
        currentFieldValue={currentCreatorValue}
        label={"Creator"}
        items={creator}
        hasError={errors?.creator?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("creator", currentCreatorValue)
        }
        errorMessage={errors?.creator?.errorMessage}
        setFieldValue={setCurrentCreatorValue}
        inputFieldRef={creatorRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Creator"
          isRequired={true}
          isReadOnly={false}
          value={currentCreatorValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.creator?.hasError) {
              runValidationTasks("creator", value);
            }
            setCurrentCreatorValue(value);
          }}
          onBlur={() => runValidationTasks("creator", currentCreatorValue)}
          errorMessage={errors.creator?.errorMessage}
          hasError={errors.creator?.hasError}
          ref={creatorRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "creator")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Custom key"
        isRequired={false}
        isReadOnly={false}
        value={custom_key}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key: value,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            value = result?.custom_key ?? value;
          }
          if (errors.custom_key?.hasError) {
            runValidationTasks("custom_key", value);
          }
          setCustom_key(value);
        }}
        onBlur={() => runValidationTasks("custom_key", custom_key)}
        errorMessage={errors.custom_key?.errorMessage}
        hasError={errors.custom_key?.hasError}
        {...getOverrideProps(overrides, "custom_key")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description: values,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.description ?? values;
          }
          setDescription(values);
          setCurrentDescriptionValue("");
        }}
        currentFieldValue={currentDescriptionValue}
        label={"Description"}
        items={description}
        hasError={errors?.description?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("description", currentDescriptionValue)
        }
        errorMessage={errors?.description?.errorMessage}
        setFieldValue={setCurrentDescriptionValue}
        inputFieldRef={descriptionRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Description"
          isRequired={true}
          isReadOnly={false}
          value={currentDescriptionValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.description?.hasError) {
              runValidationTasks("description", value);
            }
            setCurrentDescriptionValue(value);
          }}
          onBlur={() =>
            runValidationTasks("description", currentDescriptionValue)
          }
          errorMessage={errors.description?.errorMessage}
          hasError={errors.description?.hasError}
          ref={descriptionRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "description")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date: values,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.display_date ?? values;
          }
          setDisplay_date(values);
          setCurrentDisplay_dateValue("");
        }}
        currentFieldValue={currentDisplay_dateValue}
        label={"Display date"}
        items={display_date}
        hasError={errors?.display_date?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("display_date", currentDisplay_dateValue)
        }
        errorMessage={errors?.display_date?.errorMessage}
        setFieldValue={setCurrentDisplay_dateValue}
        inputFieldRef={display_dateRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Display date"
          isRequired={true}
          isReadOnly={false}
          value={currentDisplay_dateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.display_date?.hasError) {
              runValidationTasks("display_date", value);
            }
            setCurrentDisplay_dateValue(value);
          }}
          onBlur={() =>
            runValidationTasks("display_date", currentDisplay_dateValue)
          }
          errorMessage={errors.display_date?.errorMessage}
          hasError={errors.display_date?.hasError}
          ref={display_dateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "display_date")}
        ></TextField>
      </ArrayField>
      <TextField
        label="End date"
        isRequired={false}
        isReadOnly={false}
        value={end_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date: value,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
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
      <SwitchField
        label="Explicit content"
        defaultChecked={false}
        isDisabled={false}
        isChecked={explicit_content}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content: value,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            value = result?.explicit_content ?? value;
          }
          if (errors.explicit_content?.hasError) {
            runValidationTasks("explicit_content", value);
          }
          setExplicit_content(value);
        }}
        onBlur={() => runValidationTasks("explicit_content", explicit_content)}
        errorMessage={errors.explicit_content?.errorMessage}
        hasError={errors.explicit_content?.hasError}
        {...getOverrideProps(overrides, "explicit_content")}
      ></SwitchField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path: values,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.heirarchy_path ?? values;
          }
          setHeirarchy_path(values);
          setCurrentHeirarchy_pathValue("");
        }}
        currentFieldValue={currentHeirarchy_pathValue}
        label={"Heirarchy path"}
        items={heirarchy_path}
        hasError={errors?.heirarchy_path?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("heirarchy_path", currentHeirarchy_pathValue)
        }
        errorMessage={errors?.heirarchy_path?.errorMessage}
        setFieldValue={setCurrentHeirarchy_pathValue}
        inputFieldRef={heirarchy_pathRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Heirarchy path"
          isRequired={true}
          isReadOnly={false}
          value={currentHeirarchy_pathValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.heirarchy_path?.hasError) {
              runValidationTasks("heirarchy_path", value);
            }
            setCurrentHeirarchy_pathValue(value);
          }}
          onBlur={() =>
            runValidationTasks("heirarchy_path", currentHeirarchy_pathValue)
          }
          errorMessage={errors.heirarchy_path?.errorMessage}
          hasError={errors.heirarchy_path?.hasError}
          ref={heirarchy_pathRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "heirarchy_path")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Identifier"
        isRequired={true}
        isReadOnly={false}
        value={identifier}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier: value,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of: values,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.is_part_of ?? values;
          }
          setIs_part_of(values);
          setCurrentIs_part_ofValue("");
        }}
        currentFieldValue={currentIs_part_ofValue}
        label={"Is part of"}
        items={is_part_of}
        hasError={errors?.is_part_of?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("is_part_of", currentIs_part_ofValue)
        }
        errorMessage={errors?.is_part_of?.errorMessage}
        setFieldValue={setCurrentIs_part_ofValue}
        inputFieldRef={is_part_ofRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Is part of"
          isRequired={true}
          isReadOnly={false}
          value={currentIs_part_ofValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.is_part_of?.hasError) {
              runValidationTasks("is_part_of", value);
            }
            setCurrentIs_part_ofValue(value);
          }}
          onBlur={() =>
            runValidationTasks("is_part_of", currentIs_part_ofValue)
          }
          errorMessage={errors.is_part_of?.errorMessage}
          hasError={errors.is_part_of?.hasError}
          ref={is_part_ofRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "is_part_of")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language: values,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.language ?? values;
          }
          setLanguage(values);
          setCurrentLanguageValue("");
        }}
        currentFieldValue={currentLanguageValue}
        label={"Language"}
        items={language}
        hasError={errors?.language?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("language", currentLanguageValue)
        }
        errorMessage={errors?.language?.errorMessage}
        setFieldValue={setCurrentLanguageValue}
        inputFieldRef={languageRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Language"
          isRequired={true}
          isReadOnly={false}
          value={currentLanguageValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.language?.hasError) {
              runValidationTasks("language", value);
            }
            setCurrentLanguageValue(value);
          }}
          onBlur={() => runValidationTasks("language", currentLanguageValue)}
          errorMessage={errors.language?.errorMessage}
          hasError={errors.language?.hasError}
          ref={languageRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "language")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location: values,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.location ?? values;
          }
          setLocation(values);
          setCurrentLocationValue("");
        }}
        currentFieldValue={currentLocationValue}
        label={"Location"}
        items={location}
        hasError={errors?.location?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("location", currentLocationValue)
        }
        errorMessage={errors?.location?.errorMessage}
        setFieldValue={setCurrentLocationValue}
        inputFieldRef={locationRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Location"
          isRequired={true}
          isReadOnly={false}
          value={currentLocationValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.location?.hasError) {
              runValidationTasks("location", value);
            }
            setCurrentLocationValue(value);
          }}
          onBlur={() => runValidationTasks("location", currentLocationValue)}
          errorMessage={errors.location?.errorMessage}
          hasError={errors.location?.hasError}
          ref={locationRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "location")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Modified date"
        isRequired={false}
        isReadOnly={false}
        value={modified_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date: value,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
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
      <TextAreaField
        label="Ownerinfo"
        isRequired={false}
        isReadOnly={false}
        value={ownerinfo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo: value,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            value = result?.ownerinfo ?? value;
          }
          if (errors.ownerinfo?.hasError) {
            runValidationTasks("ownerinfo", value);
          }
          setOwnerinfo(value);
        }}
        onBlur={() => runValidationTasks("ownerinfo", ownerinfo)}
        errorMessage={errors.ownerinfo?.errorMessage}
        hasError={errors.ownerinfo?.hasError}
        {...getOverrideProps(overrides, "ownerinfo")}
      ></TextAreaField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection: values,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.parent_collection ?? values;
          }
          setParent_collection(values);
          setCurrentParent_collectionValue("");
        }}
        currentFieldValue={currentParent_collectionValue}
        label={"Parent collection"}
        items={parent_collection}
        hasError={errors?.parent_collection?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "parent_collection",
            currentParent_collectionValue
          )
        }
        errorMessage={errors?.parent_collection?.errorMessage}
        setFieldValue={setCurrentParent_collectionValue}
        inputFieldRef={parent_collectionRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Parent collection"
          isRequired={true}
          isReadOnly={false}
          value={currentParent_collectionValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.parent_collection?.hasError) {
              runValidationTasks("parent_collection", value);
            }
            setCurrentParent_collectionValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "parent_collection",
              currentParent_collectionValue
            )
          }
          errorMessage={errors.parent_collection?.errorMessage}
          hasError={errors.parent_collection?.hasError}
          ref={parent_collectionRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "parent_collection")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance: values,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.provenance ?? values;
          }
          setProvenance(values);
          setCurrentProvenanceValue("");
        }}
        currentFieldValue={currentProvenanceValue}
        label={"Provenance"}
        items={provenance}
        hasError={errors?.provenance?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("provenance", currentProvenanceValue)
        }
        errorMessage={errors?.provenance?.errorMessage}
        setFieldValue={setCurrentProvenanceValue}
        inputFieldRef={provenanceRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Provenance"
          isRequired={true}
          isReadOnly={false}
          value={currentProvenanceValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.provenance?.hasError) {
              runValidationTasks("provenance", value);
            }
            setCurrentProvenanceValue(value);
          }}
          onBlur={() =>
            runValidationTasks("provenance", currentProvenanceValue)
          }
          errorMessage={errors.provenance?.errorMessage}
          hasError={errors.provenance?.hasError}
          ref={provenanceRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "provenance")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation: values,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.relation ?? values;
          }
          setRelation(values);
          setCurrentRelationValue("");
        }}
        currentFieldValue={currentRelationValue}
        label={"Relation"}
        items={relation}
        hasError={errors?.relation?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("relation", currentRelationValue)
        }
        errorMessage={errors?.relation?.errorMessage}
        setFieldValue={setCurrentRelationValue}
        inputFieldRef={relationRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Relation"
          isRequired={true}
          isReadOnly={false}
          value={currentRelationValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.relation?.hasError) {
              runValidationTasks("relation", value);
            }
            setCurrentRelationValue(value);
          }}
          onBlur={() => runValidationTasks("relation", currentRelationValue)}
          errorMessage={errors.relation?.errorMessage}
          hasError={errors.relation?.hasError}
          ref={relationRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "relation")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder: values,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.rights_holder ?? values;
          }
          setRights_holder(values);
          setCurrentRights_holderValue("");
        }}
        currentFieldValue={currentRights_holderValue}
        label={"Rights holder"}
        items={rights_holder}
        hasError={errors?.rights_holder?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("rights_holder", currentRights_holderValue)
        }
        errorMessage={errors?.rights_holder?.errorMessage}
        setFieldValue={setCurrentRights_holderValue}
        inputFieldRef={rights_holderRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Rights holder"
          isRequired={true}
          isReadOnly={false}
          value={currentRights_holderValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.rights_holder?.hasError) {
              runValidationTasks("rights_holder", value);
            }
            setCurrentRights_holderValue(value);
          }}
          onBlur={() =>
            runValidationTasks("rights_holder", currentRights_holderValue)
          }
          errorMessage={errors.rights_holder?.errorMessage}
          hasError={errors.rights_holder?.hasError}
          ref={rights_holderRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "rights_holder")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights: values,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.rights ?? values;
          }
          setRights(values);
          setCurrentRightsValue("");
        }}
        currentFieldValue={currentRightsValue}
        label={"Rights"}
        items={rights}
        hasError={errors?.rights?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("rights", currentRightsValue)
        }
        errorMessage={errors?.rights?.errorMessage}
        setFieldValue={setCurrentRightsValue}
        inputFieldRef={rightsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Rights"
          isRequired={true}
          isReadOnly={false}
          value={currentRightsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.rights?.hasError) {
              runValidationTasks("rights", value);
            }
            setCurrentRightsValue(value);
          }}
          onBlur={() => runValidationTasks("rights", currentRightsValue)}
          errorMessage={errors.rights?.errorMessage}
          hasError={errors.rights?.hasError}
          ref={rightsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "rights")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source: values,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.source ?? values;
          }
          setSource(values);
          setCurrentSourceValue("");
        }}
        currentFieldValue={currentSourceValue}
        label={"Source"}
        items={source}
        hasError={errors?.source?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("source", currentSourceValue)
        }
        errorMessage={errors?.source?.errorMessage}
        setFieldValue={setCurrentSourceValue}
        inputFieldRef={sourceRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Source"
          isRequired={true}
          isReadOnly={false}
          value={currentSourceValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.source?.hasError) {
              runValidationTasks("source", value);
            }
            setCurrentSourceValue(value);
          }}
          onBlur={() => runValidationTasks("source", currentSourceValue)}
          errorMessage={errors.source?.errorMessage}
          hasError={errors.source?.hasError}
          ref={sourceRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "source")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial: values,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.spatial ?? values;
          }
          setSpatial(values);
          setCurrentSpatialValue("");
        }}
        currentFieldValue={currentSpatialValue}
        label={"Spatial"}
        items={spatial}
        hasError={errors?.spatial?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("spatial", currentSpatialValue)
        }
        errorMessage={errors?.spatial?.errorMessage}
        setFieldValue={setCurrentSpatialValue}
        inputFieldRef={spatialRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Spatial"
          isRequired={true}
          isReadOnly={false}
          value={currentSpatialValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.spatial?.hasError) {
              runValidationTasks("spatial", value);
            }
            setCurrentSpatialValue(value);
          }}
          onBlur={() => runValidationTasks("spatial", currentSpatialValue)}
          errorMessage={errors.spatial?.errorMessage}
          hasError={errors.spatial?.hasError}
          ref={spatialRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "spatial")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Start date"
        isRequired={false}
        isReadOnly={false}
        value={start_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date: value,
              subject,
              thumbnail_path,
              title,
              visibility
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject: values,
              thumbnail_path,
              title,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.subject ?? values;
          }
          setSubject(values);
          setCurrentSubjectValue("");
        }}
        currentFieldValue={currentSubjectValue}
        label={"Subject"}
        items={subject}
        hasError={errors?.subject?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("subject", currentSubjectValue)
        }
        errorMessage={errors?.subject?.errorMessage}
        setFieldValue={setCurrentSubjectValue}
        inputFieldRef={subjectRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Subject"
          isRequired={true}
          isReadOnly={false}
          value={currentSubjectValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.subject?.hasError) {
              runValidationTasks("subject", value);
            }
            setCurrentSubjectValue(value);
          }}
          onBlur={() => runValidationTasks("subject", currentSubjectValue)}
          errorMessage={errors.subject?.errorMessage}
          hasError={errors.subject?.hasError}
          ref={subjectRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "subject")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Thumbnail path"
        isRequired={false}
        isReadOnly={false}
        value={thumbnail_path}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path: value,
              title,
              visibility
            };
            const result = onChange(modelFields);
            value = result?.thumbnail_path ?? value;
          }
          if (errors.thumbnail_path?.hasError) {
            runValidationTasks("thumbnail_path", value);
          }
          setThumbnail_path(value);
        }}
        onBlur={() => runValidationTasks("thumbnail_path", thumbnail_path)}
        errorMessage={errors.thumbnail_path?.errorMessage}
        hasError={errors.thumbnail_path?.hasError}
        {...getOverrideProps(overrides, "thumbnail_path")}
      ></TextField>
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title: value,
              visibility
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <SwitchField
        label="Visibility"
        defaultChecked={false}
        isDisabled={false}
        isChecked={visibility}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              bibliographic_citation,
              collection_category,
              collectionmap_id,
              collectionOptions,
              create_date,
              creator,
              custom_key,
              description,
              display_date,
              end_date,
              explicit_content,
              heirarchy_path,
              identifier,
              is_part_of,
              language,
              location,
              modified_date,
              ownerinfo,
              parent_collection,
              provenance,
              relation,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              thumbnail_path,
              title,
              visibility: value
            };
            const result = onChange(modelFields);
            value = result?.visibility ?? value;
          }
          if (errors.visibility?.hasError) {
            runValidationTasks("visibility", value);
          }
          setVisibility(value);
        }}
        onBlur={() => runValidationTasks("visibility", visibility)}
        errorMessage={errors.visibility?.errorMessage}
        hasError={errors.visibility?.hasError}
        {...getOverrideProps(overrides, "visibility")}
      ></SwitchField>
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
          isDisabled={!(idProp || collectionModelProp)}
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
              !(idProp || collectionModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
