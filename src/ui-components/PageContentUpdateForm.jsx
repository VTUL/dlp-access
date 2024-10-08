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
import { getPageContent } from "../graphql/queries";
import { updatePageContent } from "../graphql/mutations";
export default function PageContentUpdateForm(props) {
  const {
    id: idProp,
    pageContent: pageContentModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    page_content_category: "",
    content: "",
  };
  const [page_content_category, setPage_content_category] = React.useState(
    initialValues.page_content_category
  );
  const [content, setContent] = React.useState(initialValues.content);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = pageContentRecord
      ? { ...initialValues, ...pageContentRecord }
      : initialValues;
    setPage_content_category(cleanValues.page_content_category);
    setContent(cleanValues.content);
    setErrors({});
  };
  const [pageContentRecord, setPageContentRecord] =
    React.useState(pageContentModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getPageContent.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPageContent
        : pageContentModelProp;
      setPageContentRecord(record);
    };
    queryData();
  }, [idProp, pageContentModelProp]);
  React.useEffect(resetStateValues, [pageContentRecord]);
  const validations = {
    page_content_category: [{ type: "Required" }],
    content: [{ type: "Required" }],
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
          page_content_category,
          content,
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
            query: updatePageContent.replaceAll("__typename", ""),
            variables: {
              input: {
                id: pageContentRecord.id,
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
      {...getOverrideProps(overrides, "PageContentUpdateForm")}
      {...rest}
    >
      <TextField
        label="Page content category"
        isRequired={true}
        isReadOnly={false}
        value={page_content_category}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              page_content_category: value,
              content,
            };
            const result = onChange(modelFields);
            value = result?.page_content_category ?? value;
          }
          if (errors.page_content_category?.hasError) {
            runValidationTasks("page_content_category", value);
          }
          setPage_content_category(value);
        }}
        onBlur={() =>
          runValidationTasks("page_content_category", page_content_category)
        }
        errorMessage={errors.page_content_category?.errorMessage}
        hasError={errors.page_content_category?.hasError}
        {...getOverrideProps(overrides, "page_content_category")}
      ></TextField>
      <TextField
        label="Content"
        isRequired={true}
        isReadOnly={false}
        value={content}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              page_content_category,
              content: value,
            };
            const result = onChange(modelFields);
            value = result?.content ?? value;
          }
          if (errors.content?.hasError) {
            runValidationTasks("content", value);
          }
          setContent(value);
        }}
        onBlur={() => runValidationTasks("content", content)}
        errorMessage={errors.content?.errorMessage}
        hasError={errors.content?.hasError}
        {...getOverrideProps(overrides, "content")}
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
          isDisabled={!(idProp || pageContentModelProp)}
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
              !(idProp || pageContentModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
