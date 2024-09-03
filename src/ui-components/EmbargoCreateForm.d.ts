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
export declare type EmbargoCreateFormInputValues = {
  identifier?: string;
  start_date?: string;
  end_date?: string;
  note?: string;
  record_type?: string;
};
export declare type EmbargoCreateFormValidationValues = {
  identifier?: ValidationFunction<string>;
  start_date?: ValidationFunction<string>;
  end_date?: ValidationFunction<string>;
  note?: ValidationFunction<string>;
  record_type?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type EmbargoCreateFormOverridesProps = {
  EmbargoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  identifier?: PrimitiveOverrideProps<TextFieldProps>;
  start_date?: PrimitiveOverrideProps<TextFieldProps>;
  end_date?: PrimitiveOverrideProps<TextFieldProps>;
  note?: PrimitiveOverrideProps<TextFieldProps>;
  record_type?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmbargoCreateFormProps = React.PropsWithChildren<
  {
    overrides?: EmbargoCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (
      fields: EmbargoCreateFormInputValues
    ) => EmbargoCreateFormInputValues;
    onSuccess?: (fields: EmbargoCreateFormInputValues) => void;
    onError?: (
      fields: EmbargoCreateFormInputValues,
      errorMessage: string
    ) => void;
    onChange?: (
      fields: EmbargoCreateFormInputValues
    ) => EmbargoCreateFormInputValues;
    onValidate?: EmbargoCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function EmbargoCreateForm(
  props: EmbargoCreateFormProps
): React.ReactElement;
