/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import {
  GridProps,
  SwitchFieldProps,
  TextAreaFieldProps,
  TextFieldProps
} from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
  [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
  [key: string]: string;
};
export declare type Variant = {
  variantValues: VariantValues;
  overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type CollectionUpdateFormInputValues = {
  bibliographic_citation?: string[];
  collection_category?: string;
  collectionmap_id?: string;
  collectionOptions?: string;
  create_date?: string;
  creator?: string[];
  custom_key?: string;
  description?: string[];
  display_date?: string[];
  end_date?: string;
  explicit_content?: boolean;
  heirarchy_path?: string[];
  identifier?: string;
  is_part_of?: string[];
  language?: string[];
  location?: string[];
  modified_date?: string;
  ownerinfo?: string;
  parent_collection?: string[];
  parent_collection_identifer?: string[];
  provenance?: string[];
  relation?: string[];
  rights_holder?: string[];
  rights?: string[];
  source?: string[];
  spatial?: string[];
  start_date?: string;
  subject?: string[];
  thumbnail_path?: string;
  title?: string;
  visibility?: boolean;
};
export declare type CollectionUpdateFormValidationValues = {
  bibliographic_citation?: ValidationFunction<string>;
  collection_category?: ValidationFunction<string>;
  collectionmap_id?: ValidationFunction<string>;
  collectionOptions?: ValidationFunction<string>;
  create_date?: ValidationFunction<string>;
  creator?: ValidationFunction<string>;
  custom_key?: ValidationFunction<string>;
  description?: ValidationFunction<string>;
  display_date?: ValidationFunction<string>;
  end_date?: ValidationFunction<string>;
  explicit_content?: ValidationFunction<boolean>;
  heirarchy_path?: ValidationFunction<string>;
  identifier?: ValidationFunction<string>;
  is_part_of?: ValidationFunction<string>;
  language?: ValidationFunction<string>;
  location?: ValidationFunction<string>;
  modified_date?: ValidationFunction<string>;
  ownerinfo?: ValidationFunction<string>;
  parent_collection?: ValidationFunction<string>;
  parent_collection_identifer?: ValidationFunction<string>;
  provenance?: ValidationFunction<string>;
  relation?: ValidationFunction<string>;
  rights_holder?: ValidationFunction<string>;
  rights?: ValidationFunction<string>;
  source?: ValidationFunction<string>;
  spatial?: ValidationFunction<string>;
  start_date?: ValidationFunction<string>;
  subject?: ValidationFunction<string>;
  thumbnail_path?: ValidationFunction<string>;
  title?: ValidationFunction<string>;
  visibility?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type CollectionUpdateFormOverridesProps = {
  CollectionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  bibliographic_citation?: PrimitiveOverrideProps<TextFieldProps>;
  collection_category?: PrimitiveOverrideProps<TextFieldProps>;
  collectionmap_id?: PrimitiveOverrideProps<TextFieldProps>;
  collectionOptions?: PrimitiveOverrideProps<TextAreaFieldProps>;
  create_date?: PrimitiveOverrideProps<TextFieldProps>;
  creator?: PrimitiveOverrideProps<TextFieldProps>;
  custom_key?: PrimitiveOverrideProps<TextFieldProps>;
  description?: PrimitiveOverrideProps<TextFieldProps>;
  display_date?: PrimitiveOverrideProps<TextFieldProps>;
  end_date?: PrimitiveOverrideProps<TextFieldProps>;
  explicit_content?: PrimitiveOverrideProps<SwitchFieldProps>;
  heirarchy_path?: PrimitiveOverrideProps<TextFieldProps>;
  identifier?: PrimitiveOverrideProps<TextFieldProps>;
  is_part_of?: PrimitiveOverrideProps<TextFieldProps>;
  language?: PrimitiveOverrideProps<TextFieldProps>;
  location?: PrimitiveOverrideProps<TextFieldProps>;
  modified_date?: PrimitiveOverrideProps<TextFieldProps>;
  ownerinfo?: PrimitiveOverrideProps<TextAreaFieldProps>;
  parent_collection?: PrimitiveOverrideProps<TextFieldProps>;
  parent_collection_identifer?: PrimitiveOverrideProps<TextFieldProps>;
  provenance?: PrimitiveOverrideProps<TextFieldProps>;
  relation?: PrimitiveOverrideProps<TextFieldProps>;
  rights_holder?: PrimitiveOverrideProps<TextFieldProps>;
  rights?: PrimitiveOverrideProps<TextFieldProps>;
  source?: PrimitiveOverrideProps<TextFieldProps>;
  spatial?: PrimitiveOverrideProps<TextFieldProps>;
  start_date?: PrimitiveOverrideProps<TextFieldProps>;
  subject?: PrimitiveOverrideProps<TextFieldProps>;
  thumbnail_path?: PrimitiveOverrideProps<TextFieldProps>;
  title?: PrimitiveOverrideProps<TextFieldProps>;
  visibility?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type CollectionUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: CollectionUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    collection?: any;
    onSubmit?: (
      fields: CollectionUpdateFormInputValues
    ) => CollectionUpdateFormInputValues;
    onSuccess?: (fields: CollectionUpdateFormInputValues) => void;
    onError?: (
      fields: CollectionUpdateFormInputValues,
      errorMessage: string
    ) => void;
    onChange?: (
      fields: CollectionUpdateFormInputValues
    ) => CollectionUpdateFormInputValues;
    onValidate?: CollectionUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function CollectionUpdateForm(
  props: CollectionUpdateFormProps
): React.ReactElement;
