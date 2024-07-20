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
import { getHistory } from "../graphql/queries";
import { updateHistory } from "../graphql/mutations";
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
export default function HistoryUpdateForm(props) {
  const {
    id: idProp,
    history: historyModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    event: "",
    groups: [],
    siteID: "",
    userEmail: ""
  };
  const [event, setEvent] = React.useState(initialValues.event);
  const [groups, setGroups] = React.useState(initialValues.groups);
  const [siteID, setSiteID] = React.useState(initialValues.siteID);
  const [userEmail, setUserEmail] = React.useState(initialValues.userEmail);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = historyRecord
      ? { ...initialValues, ...historyRecord }
      : initialValues;
    setEvent(
      typeof cleanValues.event === "string" || cleanValues.event === null
        ? cleanValues.event
        : JSON.stringify(cleanValues.event)
    );
    setGroups(cleanValues.groups ?? []);
    setCurrentGroupsValue("");
    setSiteID(cleanValues.siteID);
    setUserEmail(cleanValues.userEmail);
    setErrors({});
  };
  const [historyRecord, setHistoryRecord] = React.useState(historyModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getHistory.replaceAll("__typename", ""),
              variables: { id: idProp }
            })
          )?.data?.getHistory
        : historyModelProp;
      setHistoryRecord(record);
    };
    queryData();
  }, [idProp, historyModelProp]);
  React.useEffect(resetStateValues, [historyRecord]);
  const [currentGroupsValue, setCurrentGroupsValue] = React.useState("");
  const groupsRef = React.createRef();
  const validations = {
    event: [{ type: "Required" }, { type: "JSON" }],
    groups: [],
    siteID: [{ type: "Required" }],
    userEmail: [{ type: "Required" }, { type: "Email" }]
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
          event,
          groups: groups ?? null,
          siteID,
          userEmail
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
            query: updateHistory.replaceAll("__typename", ""),
            variables: {
              input: {
                id: historyRecord.id,
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
      {...getOverrideProps(overrides, "HistoryUpdateForm")}
      {...rest}
    >
      <TextAreaField
        label="Event"
        isRequired={true}
        isReadOnly={false}
        value={event}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event: value,
              groups,
              siteID,
              userEmail
            };
            const result = onChange(modelFields);
            value = result?.event ?? value;
          }
          if (errors.event?.hasError) {
            runValidationTasks("event", value);
          }
          setEvent(value);
        }}
        onBlur={() => runValidationTasks("event", event)}
        errorMessage={errors.event?.errorMessage}
        hasError={errors.event?.hasError}
        {...getOverrideProps(overrides, "event")}
      ></TextAreaField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              event,
              groups: values,
              siteID,
              userEmail
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
      <TextField
        label="Site id"
        isRequired={true}
        isReadOnly={false}
        value={siteID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event,
              groups,
              siteID: value,
              userEmail
            };
            const result = onChange(modelFields);
            value = result?.siteID ?? value;
          }
          if (errors.siteID?.hasError) {
            runValidationTasks("siteID", value);
          }
          setSiteID(value);
        }}
        onBlur={() => runValidationTasks("siteID", siteID)}
        errorMessage={errors.siteID?.errorMessage}
        hasError={errors.siteID?.hasError}
        {...getOverrideProps(overrides, "siteID")}
      ></TextField>
      <TextField
        label="User email"
        isRequired={true}
        isReadOnly={false}
        value={userEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event,
              groups,
              siteID,
              userEmail: value
            };
            const result = onChange(modelFields);
            value = result?.userEmail ?? value;
          }
          if (errors.userEmail?.hasError) {
            runValidationTasks("userEmail", value);
          }
          setUserEmail(value);
        }}
        onBlur={() => runValidationTasks("userEmail", userEmail)}
        errorMessage={errors.userEmail?.errorMessage}
        hasError={errors.userEmail?.hasError}
        {...getOverrideProps(overrides, "userEmail")}
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
          isDisabled={!(idProp || historyModelProp)}
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
              !(idProp || historyModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
