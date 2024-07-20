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
import { createArchive } from "../graphql/mutations";
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
export default function ArchiveCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    alternative: [],
    archiveOptions: "",
    basis_of_record: [],
    bibliographic_citation: [],
    conforms_to: [],
    contributor: [],
    coverage: [],
    create_date: "",
    created: [],
    creator: [],
    custom_key: "",
    date: [],
    description: [],
    display_date: [],
    end_date: "",
    explicit: false,
    extent: [],
    format: [],
    has_format: [],
    has_part: [],
    has_version: [],
    heirarchy_path: [],
    identifier: "",
    is_format_of: [],
    is_part_of: [],
    is_version_of: [],
    item_category: "",
    language: [],
    license: [],
    location: [],
    manifest_file_characterization: "",
    manifest_url: "",
    medium: [],
    modified_date: "",
    other_identifier: [],
    parent_collection: [],
    provenance: [],
    publisher: [],
    references: [],
    relation: [],
    repository: [],
    rights_holder: [],
    rights: [],
    source: [],
    spatial: [],
    start_date: "",
    subject: [],
    tags: [],
    temporal: [],
    thumbnail_path: "",
    title: "",
    type: [],
    visibility: false
  };
  const [alternative, setAlternative] = React.useState(
    initialValues.alternative
  );
  const [archiveOptions, setArchiveOptions] = React.useState(
    initialValues.archiveOptions
  );
  const [basis_of_record, setBasis_of_record] = React.useState(
    initialValues.basis_of_record
  );
  const [bibliographic_citation, setBibliographic_citation] = React.useState(
    initialValues.bibliographic_citation
  );
  const [conforms_to, setConforms_to] = React.useState(
    initialValues.conforms_to
  );
  const [contributor, setContributor] = React.useState(
    initialValues.contributor
  );
  const [coverage, setCoverage] = React.useState(initialValues.coverage);
  const [create_date, setCreate_date] = React.useState(
    initialValues.create_date
  );
  const [created, setCreated] = React.useState(initialValues.created);
  const [creator, setCreator] = React.useState(initialValues.creator);
  const [custom_key, setCustom_key] = React.useState(initialValues.custom_key);
  const [date, setDate] = React.useState(initialValues.date);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [display_date, setDisplay_date] = React.useState(
    initialValues.display_date
  );
  const [end_date, setEnd_date] = React.useState(initialValues.end_date);
  const [explicit, setExplicit] = React.useState(initialValues.explicit);
  const [extent, setExtent] = React.useState(initialValues.extent);
  const [format, setFormat] = React.useState(initialValues.format);
  const [has_format, setHas_format] = React.useState(initialValues.has_format);
  const [has_part, setHas_part] = React.useState(initialValues.has_part);
  const [has_version, setHas_version] = React.useState(
    initialValues.has_version
  );
  const [heirarchy_path, setHeirarchy_path] = React.useState(
    initialValues.heirarchy_path
  );
  const [identifier, setIdentifier] = React.useState(initialValues.identifier);
  const [is_format_of, setIs_format_of] = React.useState(
    initialValues.is_format_of
  );
  const [is_part_of, setIs_part_of] = React.useState(initialValues.is_part_of);
  const [is_version_of, setIs_version_of] = React.useState(
    initialValues.is_version_of
  );
  const [item_category, setItem_category] = React.useState(
    initialValues.item_category
  );
  const [language, setLanguage] = React.useState(initialValues.language);
  const [license, setLicense] = React.useState(initialValues.license);
  const [location, setLocation] = React.useState(initialValues.location);
  const [manifest_file_characterization, setManifest_file_characterization] =
    React.useState(initialValues.manifest_file_characterization);
  const [manifest_url, setManifest_url] = React.useState(
    initialValues.manifest_url
  );
  const [medium, setMedium] = React.useState(initialValues.medium);
  const [modified_date, setModified_date] = React.useState(
    initialValues.modified_date
  );
  const [other_identifier, setOther_identifier] = React.useState(
    initialValues.other_identifier
  );
  const [parent_collection, setParent_collection] = React.useState(
    initialValues.parent_collection
  );
  const [provenance, setProvenance] = React.useState(initialValues.provenance);
  const [publisher, setPublisher] = React.useState(initialValues.publisher);
  const [references, setReferences] = React.useState(initialValues.references);
  const [relation, setRelation] = React.useState(initialValues.relation);
  const [repository, setRepository] = React.useState(initialValues.repository);
  const [rights_holder, setRights_holder] = React.useState(
    initialValues.rights_holder
  );
  const [rights, setRights] = React.useState(initialValues.rights);
  const [source, setSource] = React.useState(initialValues.source);
  const [spatial, setSpatial] = React.useState(initialValues.spatial);
  const [start_date, setStart_date] = React.useState(initialValues.start_date);
  const [subject, setSubject] = React.useState(initialValues.subject);
  const [tags, setTags] = React.useState(initialValues.tags);
  const [temporal, setTemporal] = React.useState(initialValues.temporal);
  const [thumbnail_path, setThumbnail_path] = React.useState(
    initialValues.thumbnail_path
  );
  const [title, setTitle] = React.useState(initialValues.title);
  const [type, setType] = React.useState(initialValues.type);
  const [visibility, setVisibility] = React.useState(initialValues.visibility);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setAlternative(initialValues.alternative);
    setCurrentAlternativeValue("");
    setArchiveOptions(initialValues.archiveOptions);
    setBasis_of_record(initialValues.basis_of_record);
    setCurrentBasis_of_recordValue("");
    setBibliographic_citation(initialValues.bibliographic_citation);
    setCurrentBibliographic_citationValue("");
    setConforms_to(initialValues.conforms_to);
    setCurrentConforms_toValue("");
    setContributor(initialValues.contributor);
    setCurrentContributorValue("");
    setCoverage(initialValues.coverage);
    setCurrentCoverageValue("");
    setCreate_date(initialValues.create_date);
    setCreated(initialValues.created);
    setCurrentCreatedValue("");
    setCreator(initialValues.creator);
    setCurrentCreatorValue("");
    setCustom_key(initialValues.custom_key);
    setDate(initialValues.date);
    setCurrentDateValue("");
    setDescription(initialValues.description);
    setCurrentDescriptionValue("");
    setDisplay_date(initialValues.display_date);
    setCurrentDisplay_dateValue("");
    setEnd_date(initialValues.end_date);
    setExplicit(initialValues.explicit);
    setExtent(initialValues.extent);
    setCurrentExtentValue("");
    setFormat(initialValues.format);
    setCurrentFormatValue("");
    setHas_format(initialValues.has_format);
    setCurrentHas_formatValue("");
    setHas_part(initialValues.has_part);
    setCurrentHas_partValue("");
    setHas_version(initialValues.has_version);
    setCurrentHas_versionValue("");
    setHeirarchy_path(initialValues.heirarchy_path);
    setCurrentHeirarchy_pathValue("");
    setIdentifier(initialValues.identifier);
    setIs_format_of(initialValues.is_format_of);
    setCurrentIs_format_ofValue("");
    setIs_part_of(initialValues.is_part_of);
    setCurrentIs_part_ofValue("");
    setIs_version_of(initialValues.is_version_of);
    setCurrentIs_version_ofValue("");
    setItem_category(initialValues.item_category);
    setLanguage(initialValues.language);
    setCurrentLanguageValue("");
    setLicense(initialValues.license);
    setCurrentLicenseValue("");
    setLocation(initialValues.location);
    setCurrentLocationValue("");
    setManifest_file_characterization(
      initialValues.manifest_file_characterization
    );
    setManifest_url(initialValues.manifest_url);
    setMedium(initialValues.medium);
    setCurrentMediumValue("");
    setModified_date(initialValues.modified_date);
    setOther_identifier(initialValues.other_identifier);
    setCurrentOther_identifierValue("");
    setParent_collection(initialValues.parent_collection);
    setCurrentParent_collectionValue("");
    setProvenance(initialValues.provenance);
    setCurrentProvenanceValue("");
    setPublisher(initialValues.publisher);
    setCurrentPublisherValue("");
    setReferences(initialValues.references);
    setCurrentReferencesValue("");
    setRelation(initialValues.relation);
    setCurrentRelationValue("");
    setRepository(initialValues.repository);
    setCurrentRepositoryValue("");
    setRights_holder(initialValues.rights_holder);
    setCurrentRights_holderValue("");
    setRights(initialValues.rights);
    setCurrentRightsValue("");
    setSource(initialValues.source);
    setCurrentSourceValue("");
    setSpatial(initialValues.spatial);
    setCurrentSpatialValue("");
    setStart_date(initialValues.start_date);
    setSubject(initialValues.subject);
    setCurrentSubjectValue("");
    setTags(initialValues.tags);
    setCurrentTagsValue("");
    setTemporal(initialValues.temporal);
    setCurrentTemporalValue("");
    setThumbnail_path(initialValues.thumbnail_path);
    setTitle(initialValues.title);
    setType(initialValues.type);
    setCurrentTypeValue("");
    setVisibility(initialValues.visibility);
    setErrors({});
  };
  const [currentAlternativeValue, setCurrentAlternativeValue] =
    React.useState("");
  const alternativeRef = React.createRef();
  const [currentBasis_of_recordValue, setCurrentBasis_of_recordValue] =
    React.useState("");
  const basis_of_recordRef = React.createRef();
  const [
    currentBibliographic_citationValue,
    setCurrentBibliographic_citationValue
  ] = React.useState("");
  const bibliographic_citationRef = React.createRef();
  const [currentConforms_toValue, setCurrentConforms_toValue] =
    React.useState("");
  const conforms_toRef = React.createRef();
  const [currentContributorValue, setCurrentContributorValue] =
    React.useState("");
  const contributorRef = React.createRef();
  const [currentCoverageValue, setCurrentCoverageValue] = React.useState("");
  const coverageRef = React.createRef();
  const [currentCreatedValue, setCurrentCreatedValue] = React.useState("");
  const createdRef = React.createRef();
  const [currentCreatorValue, setCurrentCreatorValue] = React.useState("");
  const creatorRef = React.createRef();
  const [currentDateValue, setCurrentDateValue] = React.useState("");
  const dateRef = React.createRef();
  const [currentDescriptionValue, setCurrentDescriptionValue] =
    React.useState("");
  const descriptionRef = React.createRef();
  const [currentDisplay_dateValue, setCurrentDisplay_dateValue] =
    React.useState("");
  const display_dateRef = React.createRef();
  const [currentExtentValue, setCurrentExtentValue] = React.useState("");
  const extentRef = React.createRef();
  const [currentFormatValue, setCurrentFormatValue] = React.useState("");
  const formatRef = React.createRef();
  const [currentHas_formatValue, setCurrentHas_formatValue] =
    React.useState("");
  const has_formatRef = React.createRef();
  const [currentHas_partValue, setCurrentHas_partValue] = React.useState("");
  const has_partRef = React.createRef();
  const [currentHas_versionValue, setCurrentHas_versionValue] =
    React.useState("");
  const has_versionRef = React.createRef();
  const [currentHeirarchy_pathValue, setCurrentHeirarchy_pathValue] =
    React.useState("");
  const heirarchy_pathRef = React.createRef();
  const [currentIs_format_ofValue, setCurrentIs_format_ofValue] =
    React.useState("");
  const is_format_ofRef = React.createRef();
  const [currentIs_part_ofValue, setCurrentIs_part_ofValue] =
    React.useState("");
  const is_part_ofRef = React.createRef();
  const [currentIs_version_ofValue, setCurrentIs_version_ofValue] =
    React.useState("");
  const is_version_ofRef = React.createRef();
  const [currentLanguageValue, setCurrentLanguageValue] = React.useState("");
  const languageRef = React.createRef();
  const [currentLicenseValue, setCurrentLicenseValue] = React.useState("");
  const licenseRef = React.createRef();
  const [currentLocationValue, setCurrentLocationValue] = React.useState("");
  const locationRef = React.createRef();
  const [currentMediumValue, setCurrentMediumValue] = React.useState("");
  const mediumRef = React.createRef();
  const [currentOther_identifierValue, setCurrentOther_identifierValue] =
    React.useState("");
  const other_identifierRef = React.createRef();
  const [currentParent_collectionValue, setCurrentParent_collectionValue] =
    React.useState("");
  const parent_collectionRef = React.createRef();
  const [currentProvenanceValue, setCurrentProvenanceValue] =
    React.useState("");
  const provenanceRef = React.createRef();
  const [currentPublisherValue, setCurrentPublisherValue] = React.useState("");
  const publisherRef = React.createRef();
  const [currentReferencesValue, setCurrentReferencesValue] =
    React.useState("");
  const referencesRef = React.createRef();
  const [currentRelationValue, setCurrentRelationValue] = React.useState("");
  const relationRef = React.createRef();
  const [currentRepositoryValue, setCurrentRepositoryValue] =
    React.useState("");
  const repositoryRef = React.createRef();
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
  const [currentTagsValue, setCurrentTagsValue] = React.useState("");
  const tagsRef = React.createRef();
  const [currentTemporalValue, setCurrentTemporalValue] = React.useState("");
  const temporalRef = React.createRef();
  const [currentTypeValue, setCurrentTypeValue] = React.useState("");
  const typeRef = React.createRef();
  const validations = {
    alternative: [{ type: "Required" }],
    archiveOptions: [{ type: "JSON" }],
    basis_of_record: [{ type: "Required" }],
    bibliographic_citation: [{ type: "Required" }],
    conforms_to: [{ type: "Required" }],
    contributor: [{ type: "Required" }],
    coverage: [{ type: "Required" }],
    create_date: [],
    created: [{ type: "Required" }],
    creator: [{ type: "Required" }],
    custom_key: [],
    date: [{ type: "Required" }],
    description: [{ type: "Required" }],
    display_date: [{ type: "Required" }],
    end_date: [],
    explicit: [],
    extent: [{ type: "Required" }],
    format: [{ type: "Required" }],
    has_format: [{ type: "Required" }],
    has_part: [{ type: "Required" }],
    has_version: [{ type: "Required" }],
    heirarchy_path: [{ type: "Required" }],
    identifier: [{ type: "Required" }],
    is_format_of: [{ type: "Required" }],
    is_part_of: [{ type: "Required" }],
    is_version_of: [{ type: "Required" }],
    item_category: [{ type: "Required" }],
    language: [{ type: "Required" }],
    license: [{ type: "Required" }],
    location: [{ type: "Required" }],
    manifest_file_characterization: [{ type: "JSON" }],
    manifest_url: [{ type: "Required" }],
    medium: [{ type: "Required" }],
    modified_date: [],
    other_identifier: [{ type: "Required" }],
    parent_collection: [{ type: "Required" }],
    provenance: [{ type: "Required" }],
    publisher: [{ type: "Required" }],
    references: [{ type: "Required" }],
    relation: [{ type: "Required" }],
    repository: [{ type: "Required" }],
    rights_holder: [{ type: "Required" }],
    rights: [{ type: "Required" }],
    source: [{ type: "Required" }],
    spatial: [{ type: "Required" }],
    start_date: [],
    subject: [{ type: "Required" }],
    tags: [{ type: "Required" }],
    temporal: [{ type: "Required" }],
    thumbnail_path: [],
    title: [{ type: "Required" }],
    type: [{ type: "Required" }],
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
          alternative,
          archiveOptions,
          basis_of_record,
          bibliographic_citation,
          conforms_to,
          contributor,
          coverage,
          create_date,
          created,
          creator,
          custom_key,
          date,
          description,
          display_date,
          end_date,
          explicit,
          extent,
          format,
          has_format,
          has_part,
          has_version,
          heirarchy_path,
          identifier,
          is_format_of,
          is_part_of,
          is_version_of,
          item_category,
          language,
          license,
          location,
          manifest_file_characterization,
          manifest_url,
          medium,
          modified_date,
          other_identifier,
          parent_collection,
          provenance,
          publisher,
          references,
          relation,
          repository,
          rights_holder,
          rights,
          source,
          spatial,
          start_date,
          subject,
          tags,
          temporal,
          thumbnail_path,
          title,
          type,
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
            query: createArchive.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields
              }
            }
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ArchiveCreateForm")}
      {...rest}
    >
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative: values,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.alternative ?? values;
          }
          setAlternative(values);
          setCurrentAlternativeValue("");
        }}
        currentFieldValue={currentAlternativeValue}
        label={"Alternative"}
        items={alternative}
        hasError={errors?.alternative?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("alternative", currentAlternativeValue)
        }
        errorMessage={errors?.alternative?.errorMessage}
        setFieldValue={setCurrentAlternativeValue}
        inputFieldRef={alternativeRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Alternative"
          isRequired={true}
          isReadOnly={false}
          value={currentAlternativeValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.alternative?.hasError) {
              runValidationTasks("alternative", value);
            }
            setCurrentAlternativeValue(value);
          }}
          onBlur={() =>
            runValidationTasks("alternative", currentAlternativeValue)
          }
          errorMessage={errors.alternative?.errorMessage}
          hasError={errors.alternative?.hasError}
          ref={alternativeRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "alternative")}
        ></TextField>
      </ArrayField>
      <TextAreaField
        label="Archive options"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions: value,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            value = result?.archiveOptions ?? value;
          }
          if (errors.archiveOptions?.hasError) {
            runValidationTasks("archiveOptions", value);
          }
          setArchiveOptions(value);
        }}
        onBlur={() => runValidationTasks("archiveOptions", archiveOptions)}
        errorMessage={errors.archiveOptions?.errorMessage}
        hasError={errors.archiveOptions?.hasError}
        {...getOverrideProps(overrides, "archiveOptions")}
      ></TextAreaField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record: values,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.basis_of_record ?? values;
          }
          setBasis_of_record(values);
          setCurrentBasis_of_recordValue("");
        }}
        currentFieldValue={currentBasis_of_recordValue}
        label={"Basis of record"}
        items={basis_of_record}
        hasError={errors?.basis_of_record?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "basis_of_record",
            currentBasis_of_recordValue
          )
        }
        errorMessage={errors?.basis_of_record?.errorMessage}
        setFieldValue={setCurrentBasis_of_recordValue}
        inputFieldRef={basis_of_recordRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Basis of record"
          isRequired={true}
          isReadOnly={false}
          value={currentBasis_of_recordValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.basis_of_record?.hasError) {
              runValidationTasks("basis_of_record", value);
            }
            setCurrentBasis_of_recordValue(value);
          }}
          onBlur={() =>
            runValidationTasks("basis_of_record", currentBasis_of_recordValue)
          }
          errorMessage={errors.basis_of_record?.errorMessage}
          hasError={errors.basis_of_record?.hasError}
          ref={basis_of_recordRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "basis_of_record")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation: values,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to: values,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.conforms_to ?? values;
          }
          setConforms_to(values);
          setCurrentConforms_toValue("");
        }}
        currentFieldValue={currentConforms_toValue}
        label={"Conforms to"}
        items={conforms_to}
        hasError={errors?.conforms_to?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("conforms_to", currentConforms_toValue)
        }
        errorMessage={errors?.conforms_to?.errorMessage}
        setFieldValue={setCurrentConforms_toValue}
        inputFieldRef={conforms_toRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Conforms to"
          isRequired={true}
          isReadOnly={false}
          value={currentConforms_toValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.conforms_to?.hasError) {
              runValidationTasks("conforms_to", value);
            }
            setCurrentConforms_toValue(value);
          }}
          onBlur={() =>
            runValidationTasks("conforms_to", currentConforms_toValue)
          }
          errorMessage={errors.conforms_to?.errorMessage}
          hasError={errors.conforms_to?.hasError}
          ref={conforms_toRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "conforms_to")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor: values,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.contributor ?? values;
          }
          setContributor(values);
          setCurrentContributorValue("");
        }}
        currentFieldValue={currentContributorValue}
        label={"Contributor"}
        items={contributor}
        hasError={errors?.contributor?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("contributor", currentContributorValue)
        }
        errorMessage={errors?.contributor?.errorMessage}
        setFieldValue={setCurrentContributorValue}
        inputFieldRef={contributorRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Contributor"
          isRequired={true}
          isReadOnly={false}
          value={currentContributorValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.contributor?.hasError) {
              runValidationTasks("contributor", value);
            }
            setCurrentContributorValue(value);
          }}
          onBlur={() =>
            runValidationTasks("contributor", currentContributorValue)
          }
          errorMessage={errors.contributor?.errorMessage}
          hasError={errors.contributor?.hasError}
          ref={contributorRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "contributor")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage: values,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.coverage ?? values;
          }
          setCoverage(values);
          setCurrentCoverageValue("");
        }}
        currentFieldValue={currentCoverageValue}
        label={"Coverage"}
        items={coverage}
        hasError={errors?.coverage?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("coverage", currentCoverageValue)
        }
        errorMessage={errors?.coverage?.errorMessage}
        setFieldValue={setCurrentCoverageValue}
        inputFieldRef={coverageRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Coverage"
          isRequired={true}
          isReadOnly={false}
          value={currentCoverageValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.coverage?.hasError) {
              runValidationTasks("coverage", value);
            }
            setCurrentCoverageValue(value);
          }}
          onBlur={() => runValidationTasks("coverage", currentCoverageValue)}
          errorMessage={errors.coverage?.errorMessage}
          hasError={errors.coverage?.hasError}
          ref={coverageRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "coverage")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Create date"
        isRequired={false}
        isReadOnly={false}
        value={create_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date: value,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created: values,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.created ?? values;
          }
          setCreated(values);
          setCurrentCreatedValue("");
        }}
        currentFieldValue={currentCreatedValue}
        label={"Created"}
        items={created}
        hasError={errors?.created?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("created", currentCreatedValue)
        }
        errorMessage={errors?.created?.errorMessage}
        setFieldValue={setCurrentCreatedValue}
        inputFieldRef={createdRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Created"
          isRequired={true}
          isReadOnly={false}
          value={currentCreatedValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.created?.hasError) {
              runValidationTasks("created", value);
            }
            setCurrentCreatedValue(value);
          }}
          onBlur={() => runValidationTasks("created", currentCreatedValue)}
          errorMessage={errors.created?.errorMessage}
          hasError={errors.created?.hasError}
          ref={createdRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "created")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator: values,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key: value,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date: values,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.date ?? values;
          }
          setDate(values);
          setCurrentDateValue("");
        }}
        currentFieldValue={currentDateValue}
        label={"Date"}
        items={date}
        hasError={errors?.date?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("date", currentDateValue)
        }
        errorMessage={errors?.date?.errorMessage}
        setFieldValue={setCurrentDateValue}
        inputFieldRef={dateRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Date"
          isRequired={true}
          isReadOnly={false}
          value={currentDateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.date?.hasError) {
              runValidationTasks("date", value);
            }
            setCurrentDateValue(value);
          }}
          onBlur={() => runValidationTasks("date", currentDateValue)}
          errorMessage={errors.date?.errorMessage}
          hasError={errors.date?.hasError}
          ref={dateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "date")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description: values,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date: values,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date: value,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
        label="Explicit"
        defaultChecked={false}
        isDisabled={false}
        isChecked={explicit}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit: value,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            value = result?.explicit ?? value;
          }
          if (errors.explicit?.hasError) {
            runValidationTasks("explicit", value);
          }
          setExplicit(value);
        }}
        onBlur={() => runValidationTasks("explicit", explicit)}
        errorMessage={errors.explicit?.errorMessage}
        hasError={errors.explicit?.hasError}
        {...getOverrideProps(overrides, "explicit")}
      ></SwitchField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent: values,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.extent ?? values;
          }
          setExtent(values);
          setCurrentExtentValue("");
        }}
        currentFieldValue={currentExtentValue}
        label={"Extent"}
        items={extent}
        hasError={errors?.extent?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("extent", currentExtentValue)
        }
        errorMessage={errors?.extent?.errorMessage}
        setFieldValue={setCurrentExtentValue}
        inputFieldRef={extentRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Extent"
          isRequired={true}
          isReadOnly={false}
          value={currentExtentValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.extent?.hasError) {
              runValidationTasks("extent", value);
            }
            setCurrentExtentValue(value);
          }}
          onBlur={() => runValidationTasks("extent", currentExtentValue)}
          errorMessage={errors.extent?.errorMessage}
          hasError={errors.extent?.hasError}
          ref={extentRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "extent")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format: values,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.format ?? values;
          }
          setFormat(values);
          setCurrentFormatValue("");
        }}
        currentFieldValue={currentFormatValue}
        label={"Format"}
        items={format}
        hasError={errors?.format?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("format", currentFormatValue)
        }
        errorMessage={errors?.format?.errorMessage}
        setFieldValue={setCurrentFormatValue}
        inputFieldRef={formatRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Format"
          isRequired={true}
          isReadOnly={false}
          value={currentFormatValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.format?.hasError) {
              runValidationTasks("format", value);
            }
            setCurrentFormatValue(value);
          }}
          onBlur={() => runValidationTasks("format", currentFormatValue)}
          errorMessage={errors.format?.errorMessage}
          hasError={errors.format?.hasError}
          ref={formatRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "format")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format: values,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.has_format ?? values;
          }
          setHas_format(values);
          setCurrentHas_formatValue("");
        }}
        currentFieldValue={currentHas_formatValue}
        label={"Has format"}
        items={has_format}
        hasError={errors?.has_format?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("has_format", currentHas_formatValue)
        }
        errorMessage={errors?.has_format?.errorMessage}
        setFieldValue={setCurrentHas_formatValue}
        inputFieldRef={has_formatRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Has format"
          isRequired={true}
          isReadOnly={false}
          value={currentHas_formatValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.has_format?.hasError) {
              runValidationTasks("has_format", value);
            }
            setCurrentHas_formatValue(value);
          }}
          onBlur={() =>
            runValidationTasks("has_format", currentHas_formatValue)
          }
          errorMessage={errors.has_format?.errorMessage}
          hasError={errors.has_format?.hasError}
          ref={has_formatRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "has_format")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part: values,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.has_part ?? values;
          }
          setHas_part(values);
          setCurrentHas_partValue("");
        }}
        currentFieldValue={currentHas_partValue}
        label={"Has part"}
        items={has_part}
        hasError={errors?.has_part?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("has_part", currentHas_partValue)
        }
        errorMessage={errors?.has_part?.errorMessage}
        setFieldValue={setCurrentHas_partValue}
        inputFieldRef={has_partRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Has part"
          isRequired={true}
          isReadOnly={false}
          value={currentHas_partValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.has_part?.hasError) {
              runValidationTasks("has_part", value);
            }
            setCurrentHas_partValue(value);
          }}
          onBlur={() => runValidationTasks("has_part", currentHas_partValue)}
          errorMessage={errors.has_part?.errorMessage}
          hasError={errors.has_part?.hasError}
          ref={has_partRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "has_part")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version: values,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.has_version ?? values;
          }
          setHas_version(values);
          setCurrentHas_versionValue("");
        }}
        currentFieldValue={currentHas_versionValue}
        label={"Has version"}
        items={has_version}
        hasError={errors?.has_version?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("has_version", currentHas_versionValue)
        }
        errorMessage={errors?.has_version?.errorMessage}
        setFieldValue={setCurrentHas_versionValue}
        inputFieldRef={has_versionRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Has version"
          isRequired={true}
          isReadOnly={false}
          value={currentHas_versionValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.has_version?.hasError) {
              runValidationTasks("has_version", value);
            }
            setCurrentHas_versionValue(value);
          }}
          onBlur={() =>
            runValidationTasks("has_version", currentHas_versionValue)
          }
          errorMessage={errors.has_version?.errorMessage}
          hasError={errors.has_version?.hasError}
          ref={has_versionRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "has_version")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path: values,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier: value,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of: values,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.is_format_of ?? values;
          }
          setIs_format_of(values);
          setCurrentIs_format_ofValue("");
        }}
        currentFieldValue={currentIs_format_ofValue}
        label={"Is format of"}
        items={is_format_of}
        hasError={errors?.is_format_of?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("is_format_of", currentIs_format_ofValue)
        }
        errorMessage={errors?.is_format_of?.errorMessage}
        setFieldValue={setCurrentIs_format_ofValue}
        inputFieldRef={is_format_ofRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Is format of"
          isRequired={true}
          isReadOnly={false}
          value={currentIs_format_ofValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.is_format_of?.hasError) {
              runValidationTasks("is_format_of", value);
            }
            setCurrentIs_format_ofValue(value);
          }}
          onBlur={() =>
            runValidationTasks("is_format_of", currentIs_format_ofValue)
          }
          errorMessage={errors.is_format_of?.errorMessage}
          hasError={errors.is_format_of?.hasError}
          ref={is_format_ofRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "is_format_of")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of: values,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of: values,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.is_version_of ?? values;
          }
          setIs_version_of(values);
          setCurrentIs_version_ofValue("");
        }}
        currentFieldValue={currentIs_version_ofValue}
        label={"Is version of"}
        items={is_version_of}
        hasError={errors?.is_version_of?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("is_version_of", currentIs_version_ofValue)
        }
        errorMessage={errors?.is_version_of?.errorMessage}
        setFieldValue={setCurrentIs_version_ofValue}
        inputFieldRef={is_version_ofRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Is version of"
          isRequired={true}
          isReadOnly={false}
          value={currentIs_version_ofValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.is_version_of?.hasError) {
              runValidationTasks("is_version_of", value);
            }
            setCurrentIs_version_ofValue(value);
          }}
          onBlur={() =>
            runValidationTasks("is_version_of", currentIs_version_ofValue)
          }
          errorMessage={errors.is_version_of?.errorMessage}
          hasError={errors.is_version_of?.hasError}
          ref={is_version_ofRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "is_version_of")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Item category"
        isRequired={true}
        isReadOnly={false}
        value={item_category}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category: value,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            value = result?.item_category ?? value;
          }
          if (errors.item_category?.hasError) {
            runValidationTasks("item_category", value);
          }
          setItem_category(value);
        }}
        onBlur={() => runValidationTasks("item_category", item_category)}
        errorMessage={errors.item_category?.errorMessage}
        hasError={errors.item_category?.hasError}
        {...getOverrideProps(overrides, "item_category")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language: values,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license: values,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.license ?? values;
          }
          setLicense(values);
          setCurrentLicenseValue("");
        }}
        currentFieldValue={currentLicenseValue}
        label={"License"}
        items={license}
        hasError={errors?.license?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("license", currentLicenseValue)
        }
        errorMessage={errors?.license?.errorMessage}
        setFieldValue={setCurrentLicenseValue}
        inputFieldRef={licenseRef}
        defaultFieldValue={""}
      >
        <TextField
          label="License"
          isRequired={true}
          isReadOnly={false}
          value={currentLicenseValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.license?.hasError) {
              runValidationTasks("license", value);
            }
            setCurrentLicenseValue(value);
          }}
          onBlur={() => runValidationTasks("license", currentLicenseValue)}
          errorMessage={errors.license?.errorMessage}
          hasError={errors.license?.hasError}
          ref={licenseRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "license")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location: values,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
      <TextAreaField
        label="Manifest file characterization"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization: value,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            value = result?.manifest_file_characterization ?? value;
          }
          if (errors.manifest_file_characterization?.hasError) {
            runValidationTasks("manifest_file_characterization", value);
          }
          setManifest_file_characterization(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "manifest_file_characterization",
            manifest_file_characterization
          )
        }
        errorMessage={errors.manifest_file_characterization?.errorMessage}
        hasError={errors.manifest_file_characterization?.hasError}
        {...getOverrideProps(overrides, "manifest_file_characterization")}
      ></TextAreaField>
      <TextField
        label="Manifest url"
        isRequired={true}
        isReadOnly={false}
        value={manifest_url}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url: value,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            value = result?.manifest_url ?? value;
          }
          if (errors.manifest_url?.hasError) {
            runValidationTasks("manifest_url", value);
          }
          setManifest_url(value);
        }}
        onBlur={() => runValidationTasks("manifest_url", manifest_url)}
        errorMessage={errors.manifest_url?.errorMessage}
        hasError={errors.manifest_url?.hasError}
        {...getOverrideProps(overrides, "manifest_url")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium: values,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.medium ?? values;
          }
          setMedium(values);
          setCurrentMediumValue("");
        }}
        currentFieldValue={currentMediumValue}
        label={"Medium"}
        items={medium}
        hasError={errors?.medium?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("medium", currentMediumValue)
        }
        errorMessage={errors?.medium?.errorMessage}
        setFieldValue={setCurrentMediumValue}
        inputFieldRef={mediumRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Medium"
          isRequired={true}
          isReadOnly={false}
          value={currentMediumValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.medium?.hasError) {
              runValidationTasks("medium", value);
            }
            setCurrentMediumValue(value);
          }}
          onBlur={() => runValidationTasks("medium", currentMediumValue)}
          errorMessage={errors.medium?.errorMessage}
          hasError={errors.medium?.hasError}
          ref={mediumRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "medium")}
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
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date: value,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier: values,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.other_identifier ?? values;
          }
          setOther_identifier(values);
          setCurrentOther_identifierValue("");
        }}
        currentFieldValue={currentOther_identifierValue}
        label={"Other identifier"}
        items={other_identifier}
        hasError={errors?.other_identifier?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "other_identifier",
            currentOther_identifierValue
          )
        }
        errorMessage={errors?.other_identifier?.errorMessage}
        setFieldValue={setCurrentOther_identifierValue}
        inputFieldRef={other_identifierRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Other identifier"
          isRequired={true}
          isReadOnly={false}
          value={currentOther_identifierValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.other_identifier?.hasError) {
              runValidationTasks("other_identifier", value);
            }
            setCurrentOther_identifierValue(value);
          }}
          onBlur={() =>
            runValidationTasks("other_identifier", currentOther_identifierValue)
          }
          errorMessage={errors.other_identifier?.errorMessage}
          hasError={errors.other_identifier?.hasError}
          ref={other_identifierRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "other_identifier")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection: values,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance: values,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher: values,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.publisher ?? values;
          }
          setPublisher(values);
          setCurrentPublisherValue("");
        }}
        currentFieldValue={currentPublisherValue}
        label={"Publisher"}
        items={publisher}
        hasError={errors?.publisher?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("publisher", currentPublisherValue)
        }
        errorMessage={errors?.publisher?.errorMessage}
        setFieldValue={setCurrentPublisherValue}
        inputFieldRef={publisherRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Publisher"
          isRequired={true}
          isReadOnly={false}
          value={currentPublisherValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.publisher?.hasError) {
              runValidationTasks("publisher", value);
            }
            setCurrentPublisherValue(value);
          }}
          onBlur={() => runValidationTasks("publisher", currentPublisherValue)}
          errorMessage={errors.publisher?.errorMessage}
          hasError={errors.publisher?.hasError}
          ref={publisherRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "publisher")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references: values,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.references ?? values;
          }
          setReferences(values);
          setCurrentReferencesValue("");
        }}
        currentFieldValue={currentReferencesValue}
        label={"References"}
        items={references}
        hasError={errors?.references?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("references", currentReferencesValue)
        }
        errorMessage={errors?.references?.errorMessage}
        setFieldValue={setCurrentReferencesValue}
        inputFieldRef={referencesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="References"
          isRequired={true}
          isReadOnly={false}
          value={currentReferencesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.references?.hasError) {
              runValidationTasks("references", value);
            }
            setCurrentReferencesValue(value);
          }}
          onBlur={() =>
            runValidationTasks("references", currentReferencesValue)
          }
          errorMessage={errors.references?.errorMessage}
          hasError={errors.references?.hasError}
          ref={referencesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "references")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation: values,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository: values,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.repository ?? values;
          }
          setRepository(values);
          setCurrentRepositoryValue("");
        }}
        currentFieldValue={currentRepositoryValue}
        label={"Repository"}
        items={repository}
        hasError={errors?.repository?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("repository", currentRepositoryValue)
        }
        errorMessage={errors?.repository?.errorMessage}
        setFieldValue={setCurrentRepositoryValue}
        inputFieldRef={repositoryRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Repository"
          isRequired={true}
          isReadOnly={false}
          value={currentRepositoryValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.repository?.hasError) {
              runValidationTasks("repository", value);
            }
            setCurrentRepositoryValue(value);
          }}
          onBlur={() =>
            runValidationTasks("repository", currentRepositoryValue)
          }
          errorMessage={errors.repository?.errorMessage}
          hasError={errors.repository?.hasError}
          ref={repositoryRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "repository")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder: values,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights: values,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source: values,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial: values,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date: value,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject: values,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags: values,
              temporal,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.tags ?? values;
          }
          setTags(values);
          setCurrentTagsValue("");
        }}
        currentFieldValue={currentTagsValue}
        label={"Tags"}
        items={tags}
        hasError={errors?.tags?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("tags", currentTagsValue)
        }
        errorMessage={errors?.tags?.errorMessage}
        setFieldValue={setCurrentTagsValue}
        inputFieldRef={tagsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Tags"
          isRequired={true}
          isReadOnly={false}
          value={currentTagsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.tags?.hasError) {
              runValidationTasks("tags", value);
            }
            setCurrentTagsValue(value);
          }}
          onBlur={() => runValidationTasks("tags", currentTagsValue)}
          errorMessage={errors.tags?.errorMessage}
          hasError={errors.tags?.hasError}
          ref={tagsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "tags")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal: values,
              thumbnail_path,
              title,
              type,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.temporal ?? values;
          }
          setTemporal(values);
          setCurrentTemporalValue("");
        }}
        currentFieldValue={currentTemporalValue}
        label={"Temporal"}
        items={temporal}
        hasError={errors?.temporal?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("temporal", currentTemporalValue)
        }
        errorMessage={errors?.temporal?.errorMessage}
        setFieldValue={setCurrentTemporalValue}
        inputFieldRef={temporalRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Temporal"
          isRequired={true}
          isReadOnly={false}
          value={currentTemporalValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.temporal?.hasError) {
              runValidationTasks("temporal", value);
            }
            setCurrentTemporalValue(value);
          }}
          onBlur={() => runValidationTasks("temporal", currentTemporalValue)}
          errorMessage={errors.temporal?.errorMessage}
          hasError={errors.temporal?.hasError}
          ref={temporalRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "temporal")}
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
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path: value,
              title,
              type,
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
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title: value,
              type,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type: values,
              visibility
            };
            const result = onChange(modelFields);
            values = result?.type ?? values;
          }
          setType(values);
          setCurrentTypeValue("");
        }}
        currentFieldValue={currentTypeValue}
        label={"Type"}
        items={type}
        hasError={errors?.type?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("type", currentTypeValue)
        }
        errorMessage={errors?.type?.errorMessage}
        setFieldValue={setCurrentTypeValue}
        inputFieldRef={typeRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Type"
          isRequired={true}
          isReadOnly={false}
          value={currentTypeValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.type?.hasError) {
              runValidationTasks("type", value);
            }
            setCurrentTypeValue(value);
          }}
          onBlur={() => runValidationTasks("type", currentTypeValue)}
          errorMessage={errors.type?.errorMessage}
          hasError={errors.type?.hasError}
          ref={typeRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "type")}
        ></TextField>
      </ArrayField>
      <SwitchField
        label="Visibility"
        defaultChecked={false}
        isDisabled={false}
        isChecked={visibility}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              alternative,
              archiveOptions,
              basis_of_record,
              bibliographic_citation,
              conforms_to,
              contributor,
              coverage,
              create_date,
              created,
              creator,
              custom_key,
              date,
              description,
              display_date,
              end_date,
              explicit,
              extent,
              format,
              has_format,
              has_part,
              has_version,
              heirarchy_path,
              identifier,
              is_format_of,
              is_part_of,
              is_version_of,
              item_category,
              language,
              license,
              location,
              manifest_file_characterization,
              manifest_url,
              medium,
              modified_date,
              other_identifier,
              parent_collection,
              provenance,
              publisher,
              references,
              relation,
              repository,
              rights_holder,
              rights,
              source,
              spatial,
              start_date,
              subject,
              tags,
              temporal,
              thumbnail_path,
              title,
              type,
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
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
