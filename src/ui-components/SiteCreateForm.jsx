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
  Text,
  TextAreaField,
  TextField,
  useTheme
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { createSite } from "../graphql/mutations";
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
export default function SiteCreateForm(props) {
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
    analyticsID: "",
    assetBasePath: "",
    browseCollections: "",
    contact: [],
    displayedAttributes: "",
    groups: [],
    homePage: "",
    lang: "",
    miradorOptions: "",
    searchPage: "",
    siteColor: "",
    siteId: "",
    siteName: "",
    siteOptions: "",
    sitePages: "",
    siteTitle: ""
  };
  const [analyticsID, setAnalyticsID] = React.useState(
    initialValues.analyticsID
  );
  const [assetBasePath, setAssetBasePath] = React.useState(
    initialValues.assetBasePath
  );
  const [browseCollections, setBrowseCollections] = React.useState(
    initialValues.browseCollections
  );
  const [contact, setContact] = React.useState(initialValues.contact);
  const [displayedAttributes, setDisplayedAttributes] = React.useState(
    initialValues.displayedAttributes
  );
  const [groups, setGroups] = React.useState(initialValues.groups);
  const [homePage, setHomePage] = React.useState(initialValues.homePage);
  const [lang, setLang] = React.useState(initialValues.lang);
  const [miradorOptions, setMiradorOptions] = React.useState(
    initialValues.miradorOptions
  );
  const [searchPage, setSearchPage] = React.useState(initialValues.searchPage);
  const [siteColor, setSiteColor] = React.useState(initialValues.siteColor);
  const [siteId, setSiteId] = React.useState(initialValues.siteId);
  const [siteName, setSiteName] = React.useState(initialValues.siteName);
  const [siteOptions, setSiteOptions] = React.useState(
    initialValues.siteOptions
  );
  const [sitePages, setSitePages] = React.useState(initialValues.sitePages);
  const [siteTitle, setSiteTitle] = React.useState(initialValues.siteTitle);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setAnalyticsID(initialValues.analyticsID);
    setAssetBasePath(initialValues.assetBasePath);
    setBrowseCollections(initialValues.browseCollections);
    setContact(initialValues.contact);
    setCurrentContactValue("");
    setDisplayedAttributes(initialValues.displayedAttributes);
    setGroups(initialValues.groups);
    setCurrentGroupsValue("");
    setHomePage(initialValues.homePage);
    setLang(initialValues.lang);
    setMiradorOptions(initialValues.miradorOptions);
    setSearchPage(initialValues.searchPage);
    setSiteColor(initialValues.siteColor);
    setSiteId(initialValues.siteId);
    setSiteName(initialValues.siteName);
    setSiteOptions(initialValues.siteOptions);
    setSitePages(initialValues.sitePages);
    setSiteTitle(initialValues.siteTitle);
    setErrors({});
  };
  const [currentContactValue, setCurrentContactValue] = React.useState("");
  const contactRef = React.createRef();
  const [currentGroupsValue, setCurrentGroupsValue] = React.useState("");
  const groupsRef = React.createRef();
  const validations = {
    analyticsID: [],
    assetBasePath: [],
    browseCollections: [{ type: "Required" }, { type: "JSON" }],
    contact: [{ type: "Required" }, { type: "JSON" }],
    displayedAttributes: [{ type: "Required" }, { type: "JSON" }],
    groups: [],
    homePage: [{ type: "Required" }, { type: "JSON" }],
    lang: [],
    miradorOptions: [{ type: "JSON" }],
    searchPage: [{ type: "Required" }, { type: "JSON" }],
    siteColor: [],
    siteId: [{ type: "Required" }],
    siteName: [{ type: "Required" }],
    siteOptions: [{ type: "JSON" }],
    sitePages: [{ type: "JSON" }],
    siteTitle: [{ type: "Required" }]
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
          analyticsID,
          assetBasePath,
          browseCollections,
          contact,
          displayedAttributes,
          groups,
          homePage,
          lang,
          miradorOptions,
          searchPage,
          siteColor,
          siteId,
          siteName,
          siteOptions,
          sitePages,
          siteTitle
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
            query: createSite.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "SiteCreateForm")}
      {...rest}
    >
      <TextField
        label="Analytics id"
        isRequired={false}
        isReadOnly={false}
        value={analyticsID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              analyticsID: value,
              assetBasePath,
              browseCollections,
              contact,
              displayedAttributes,
              groups,
              homePage,
              lang,
              miradorOptions,
              searchPage,
              siteColor,
              siteId,
              siteName,
              siteOptions,
              sitePages,
              siteTitle
            };
            const result = onChange(modelFields);
            value = result?.analyticsID ?? value;
          }
          if (errors.analyticsID?.hasError) {
            runValidationTasks("analyticsID", value);
          }
          setAnalyticsID(value);
        }}
        onBlur={() => runValidationTasks("analyticsID", analyticsID)}
        errorMessage={errors.analyticsID?.errorMessage}
        hasError={errors.analyticsID?.hasError}
        {...getOverrideProps(overrides, "analyticsID")}
      ></TextField>
      <TextField
        label="Asset base path"
        isRequired={false}
        isReadOnly={false}
        value={assetBasePath}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              analyticsID,
              assetBasePath: value,
              browseCollections,
              contact,
              displayedAttributes,
              groups,
              homePage,
              lang,
              miradorOptions,
              searchPage,
              siteColor,
              siteId,
              siteName,
              siteOptions,
              sitePages,
              siteTitle
            };
            const result = onChange(modelFields);
            value = result?.assetBasePath ?? value;
          }
          if (errors.assetBasePath?.hasError) {
            runValidationTasks("assetBasePath", value);
          }
          setAssetBasePath(value);
        }}
        onBlur={() => runValidationTasks("assetBasePath", assetBasePath)}
        errorMessage={errors.assetBasePath?.errorMessage}
        hasError={errors.assetBasePath?.hasError}
        {...getOverrideProps(overrides, "assetBasePath")}
      ></TextField>
      <TextAreaField
        label="Browse collections"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              analyticsID,
              assetBasePath,
              browseCollections: value,
              contact,
              displayedAttributes,
              groups,
              homePage,
              lang,
              miradorOptions,
              searchPage,
              siteColor,
              siteId,
              siteName,
              siteOptions,
              sitePages,
              siteTitle
            };
            const result = onChange(modelFields);
            value = result?.browseCollections ?? value;
          }
          if (errors.browseCollections?.hasError) {
            runValidationTasks("browseCollections", value);
          }
          setBrowseCollections(value);
        }}
        onBlur={() =>
          runValidationTasks("browseCollections", browseCollections)
        }
        errorMessage={errors.browseCollections?.errorMessage}
        hasError={errors.browseCollections?.hasError}
        {...getOverrideProps(overrides, "browseCollections")}
      ></TextAreaField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              analyticsID,
              assetBasePath,
              browseCollections,
              contact: values,
              displayedAttributes,
              groups,
              homePage,
              lang,
              miradorOptions,
              searchPage,
              siteColor,
              siteId,
              siteName,
              siteOptions,
              sitePages,
              siteTitle
            };
            const result = onChange(modelFields);
            values = result?.contact ?? values;
          }
          setContact(values);
          setCurrentContactValue("");
        }}
        currentFieldValue={currentContactValue}
        label={"Contact"}
        items={contact}
        hasError={errors?.contact?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("contact", currentContactValue)
        }
        errorMessage={errors?.contact?.errorMessage}
        setFieldValue={setCurrentContactValue}
        inputFieldRef={contactRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Contact"
          isRequired={true}
          isReadOnly={false}
          value={currentContactValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.contact?.hasError) {
              runValidationTasks("contact", value);
            }
            setCurrentContactValue(value);
          }}
          onBlur={() => runValidationTasks("contact", currentContactValue)}
          errorMessage={errors.contact?.errorMessage}
          hasError={errors.contact?.hasError}
          ref={contactRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "contact")}
        ></TextAreaField>
      </ArrayField>
      <TextAreaField
        label="Displayed attributes"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              analyticsID,
              assetBasePath,
              browseCollections,
              contact,
              displayedAttributes: value,
              groups,
              homePage,
              lang,
              miradorOptions,
              searchPage,
              siteColor,
              siteId,
              siteName,
              siteOptions,
              sitePages,
              siteTitle
            };
            const result = onChange(modelFields);
            value = result?.displayedAttributes ?? value;
          }
          if (errors.displayedAttributes?.hasError) {
            runValidationTasks("displayedAttributes", value);
          }
          setDisplayedAttributes(value);
        }}
        onBlur={() =>
          runValidationTasks("displayedAttributes", displayedAttributes)
        }
        errorMessage={errors.displayedAttributes?.errorMessage}
        hasError={errors.displayedAttributes?.hasError}
        {...getOverrideProps(overrides, "displayedAttributes")}
      ></TextAreaField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              analyticsID,
              assetBasePath,
              browseCollections,
              contact,
              displayedAttributes,
              groups: values,
              homePage,
              lang,
              miradorOptions,
              searchPage,
              siteColor,
              siteId,
              siteName,
              siteOptions,
              sitePages,
              siteTitle
            };
            const result = onChange(modelFields);
            values = result?.groups ?? values;
          }
          setGroups(values);
          setCurrentGroupsValue("");
        }}
        currentFieldValue={currentGroupsValue}
        label={"Groups"}
        items={groups}
        hasError={errors?.groups?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("groups", currentGroupsValue)
        }
        errorMessage={errors?.groups?.errorMessage}
        setFieldValue={setCurrentGroupsValue}
        inputFieldRef={groupsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Groups"
          isRequired={false}
          isReadOnly={false}
          value={currentGroupsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.groups?.hasError) {
              runValidationTasks("groups", value);
            }
            setCurrentGroupsValue(value);
          }}
          onBlur={() => runValidationTasks("groups", currentGroupsValue)}
          errorMessage={errors.groups?.errorMessage}
          hasError={errors.groups?.hasError}
          ref={groupsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "groups")}
        ></TextField>
      </ArrayField>
      <TextAreaField
        label="Home page"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              analyticsID,
              assetBasePath,
              browseCollections,
              contact,
              displayedAttributes,
              groups,
              homePage: value,
              lang,
              miradorOptions,
              searchPage,
              siteColor,
              siteId,
              siteName,
              siteOptions,
              sitePages,
              siteTitle
            };
            const result = onChange(modelFields);
            value = result?.homePage ?? value;
          }
          if (errors.homePage?.hasError) {
            runValidationTasks("homePage", value);
          }
          setHomePage(value);
        }}
        onBlur={() => runValidationTasks("homePage", homePage)}
        errorMessage={errors.homePage?.errorMessage}
        hasError={errors.homePage?.hasError}
        {...getOverrideProps(overrides, "homePage")}
      ></TextAreaField>
      <TextField
        label="Lang"
        isRequired={false}
        isReadOnly={false}
        value={lang}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              analyticsID,
              assetBasePath,
              browseCollections,
              contact,
              displayedAttributes,
              groups,
              homePage,
              lang: value,
              miradorOptions,
              searchPage,
              siteColor,
              siteId,
              siteName,
              siteOptions,
              sitePages,
              siteTitle
            };
            const result = onChange(modelFields);
            value = result?.lang ?? value;
          }
          if (errors.lang?.hasError) {
            runValidationTasks("lang", value);
          }
          setLang(value);
        }}
        onBlur={() => runValidationTasks("lang", lang)}
        errorMessage={errors.lang?.errorMessage}
        hasError={errors.lang?.hasError}
        {...getOverrideProps(overrides, "lang")}
      ></TextField>
      <TextAreaField
        label="Mirador options"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              analyticsID,
              assetBasePath,
              browseCollections,
              contact,
              displayedAttributes,
              groups,
              homePage,
              lang,
              miradorOptions: value,
              searchPage,
              siteColor,
              siteId,
              siteName,
              siteOptions,
              sitePages,
              siteTitle
            };
            const result = onChange(modelFields);
            value = result?.miradorOptions ?? value;
          }
          if (errors.miradorOptions?.hasError) {
            runValidationTasks("miradorOptions", value);
          }
          setMiradorOptions(value);
        }}
        onBlur={() => runValidationTasks("miradorOptions", miradorOptions)}
        errorMessage={errors.miradorOptions?.errorMessage}
        hasError={errors.miradorOptions?.hasError}
        {...getOverrideProps(overrides, "miradorOptions")}
      ></TextAreaField>
      <TextAreaField
        label="Search page"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              analyticsID,
              assetBasePath,
              browseCollections,
              contact,
              displayedAttributes,
              groups,
              homePage,
              lang,
              miradorOptions,
              searchPage: value,
              siteColor,
              siteId,
              siteName,
              siteOptions,
              sitePages,
              siteTitle
            };
            const result = onChange(modelFields);
            value = result?.searchPage ?? value;
          }
          if (errors.searchPage?.hasError) {
            runValidationTasks("searchPage", value);
          }
          setSearchPage(value);
        }}
        onBlur={() => runValidationTasks("searchPage", searchPage)}
        errorMessage={errors.searchPage?.errorMessage}
        hasError={errors.searchPage?.hasError}
        {...getOverrideProps(overrides, "searchPage")}
      ></TextAreaField>
      <TextField
        label="Site color"
        isRequired={false}
        isReadOnly={false}
        value={siteColor}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              analyticsID,
              assetBasePath,
              browseCollections,
              contact,
              displayedAttributes,
              groups,
              homePage,
              lang,
              miradorOptions,
              searchPage,
              siteColor: value,
              siteId,
              siteName,
              siteOptions,
              sitePages,
              siteTitle
            };
            const result = onChange(modelFields);
            value = result?.siteColor ?? value;
          }
          if (errors.siteColor?.hasError) {
            runValidationTasks("siteColor", value);
          }
          setSiteColor(value);
        }}
        onBlur={() => runValidationTasks("siteColor", siteColor)}
        errorMessage={errors.siteColor?.errorMessage}
        hasError={errors.siteColor?.hasError}
        {...getOverrideProps(overrides, "siteColor")}
      ></TextField>
      <TextField
        label="Site id"
        isRequired={true}
        isReadOnly={false}
        value={siteId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              analyticsID,
              assetBasePath,
              browseCollections,
              contact,
              displayedAttributes,
              groups,
              homePage,
              lang,
              miradorOptions,
              searchPage,
              siteColor,
              siteId: value,
              siteName,
              siteOptions,
              sitePages,
              siteTitle
            };
            const result = onChange(modelFields);
            value = result?.siteId ?? value;
          }
          if (errors.siteId?.hasError) {
            runValidationTasks("siteId", value);
          }
          setSiteId(value);
        }}
        onBlur={() => runValidationTasks("siteId", siteId)}
        errorMessage={errors.siteId?.errorMessage}
        hasError={errors.siteId?.hasError}
        {...getOverrideProps(overrides, "siteId")}
      ></TextField>
      <TextField
        label="Site name"
        isRequired={true}
        isReadOnly={false}
        value={siteName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              analyticsID,
              assetBasePath,
              browseCollections,
              contact,
              displayedAttributes,
              groups,
              homePage,
              lang,
              miradorOptions,
              searchPage,
              siteColor,
              siteId,
              siteName: value,
              siteOptions,
              sitePages,
              siteTitle
            };
            const result = onChange(modelFields);
            value = result?.siteName ?? value;
          }
          if (errors.siteName?.hasError) {
            runValidationTasks("siteName", value);
          }
          setSiteName(value);
        }}
        onBlur={() => runValidationTasks("siteName", siteName)}
        errorMessage={errors.siteName?.errorMessage}
        hasError={errors.siteName?.hasError}
        {...getOverrideProps(overrides, "siteName")}
      ></TextField>
      <TextAreaField
        label="Site options"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              analyticsID,
              assetBasePath,
              browseCollections,
              contact,
              displayedAttributes,
              groups,
              homePage,
              lang,
              miradorOptions,
              searchPage,
              siteColor,
              siteId,
              siteName,
              siteOptions: value,
              sitePages,
              siteTitle
            };
            const result = onChange(modelFields);
            value = result?.siteOptions ?? value;
          }
          if (errors.siteOptions?.hasError) {
            runValidationTasks("siteOptions", value);
          }
          setSiteOptions(value);
        }}
        onBlur={() => runValidationTasks("siteOptions", siteOptions)}
        errorMessage={errors.siteOptions?.errorMessage}
        hasError={errors.siteOptions?.hasError}
        {...getOverrideProps(overrides, "siteOptions")}
      ></TextAreaField>
      <TextAreaField
        label="Site pages"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              analyticsID,
              assetBasePath,
              browseCollections,
              contact,
              displayedAttributes,
              groups,
              homePage,
              lang,
              miradorOptions,
              searchPage,
              siteColor,
              siteId,
              siteName,
              siteOptions,
              sitePages: value,
              siteTitle
            };
            const result = onChange(modelFields);
            value = result?.sitePages ?? value;
          }
          if (errors.sitePages?.hasError) {
            runValidationTasks("sitePages", value);
          }
          setSitePages(value);
        }}
        onBlur={() => runValidationTasks("sitePages", sitePages)}
        errorMessage={errors.sitePages?.errorMessage}
        hasError={errors.sitePages?.hasError}
        {...getOverrideProps(overrides, "sitePages")}
      ></TextAreaField>
      <TextField
        label="Site title"
        isRequired={true}
        isReadOnly={false}
        value={siteTitle}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              analyticsID,
              assetBasePath,
              browseCollections,
              contact,
              displayedAttributes,
              groups,
              homePage,
              lang,
              miradorOptions,
              searchPage,
              siteColor,
              siteId,
              siteName,
              siteOptions,
              sitePages,
              siteTitle: value
            };
            const result = onChange(modelFields);
            value = result?.siteTitle ?? value;
          }
          if (errors.siteTitle?.hasError) {
            runValidationTasks("siteTitle", value);
          }
          setSiteTitle(value);
        }}
        onBlur={() => runValidationTasks("siteTitle", siteTitle)}
        errorMessage={errors.siteTitle?.errorMessage}
        hasError={errors.siteTitle?.hasError}
        {...getOverrideProps(overrides, "siteTitle")}
      ></TextField>
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
