/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type CollectionmapUpdateFormInputValues = {
  collectionmap_category?: string;
  collection_id?: string;
  create_date?: string;
  map_object?: string;
  modified_date?: string;
};
export declare type CollectionmapUpdateFormValidationValues = {
  collectionmap_category?: ValidationFunction<string>;
  collection_id?: ValidationFunction<string>;
  create_date?: ValidationFunction<string>;
  map_object?: ValidationFunction<string>;
  modified_date?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type CollectionmapUpdateFormOverridesProps = {
  CollectionmapUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  collectionmap_category?: PrimitiveOverrideProps<TextFieldProps>;
  collection_id?: PrimitiveOverrideProps<TextFieldProps>;
  create_date?: PrimitiveOverrideProps<TextFieldProps>;
  map_object?: PrimitiveOverrideProps<TextFieldProps>;
  modified_date?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CollectionmapUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: CollectionmapUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    collectionmap?: any;
    onSubmit?: (
      fields: CollectionmapUpdateFormInputValues
    ) => CollectionmapUpdateFormInputValues;
    onSuccess?: (fields: CollectionmapUpdateFormInputValues) => void;
    onError?: (
      fields: CollectionmapUpdateFormInputValues,
      errorMessage: string
    ) => void;
    onChange?: (
      fields: CollectionmapUpdateFormInputValues
    ) => CollectionmapUpdateFormInputValues;
    onValidate?: CollectionmapUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function CollectionmapUpdateForm(
  props: CollectionmapUpdateFormProps
): React.ReactElement;
