/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import {
  GridProps,
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
export declare type SiteUpdateFormInputValues = {
  analyticsID?: string;
  assetBasePath?: string;
  browseCollections?: string;
  contact?: string[];
  displayedAttributes?: string;
  groups?: string[];
  homePage?: string;
  lang?: string;
  miradorOptions?: string;
  searchPage?: string;
  siteColor?: string;
  siteId?: string;
  siteName?: string;
  siteOptions?: string;
  sitePages?: string;
  siteTitle?: string;
};
export declare type SiteUpdateFormValidationValues = {
  analyticsID?: ValidationFunction<string>;
  assetBasePath?: ValidationFunction<string>;
  browseCollections?: ValidationFunction<string>;
  contact?: ValidationFunction<string>;
  displayedAttributes?: ValidationFunction<string>;
  groups?: ValidationFunction<string>;
  homePage?: ValidationFunction<string>;
  lang?: ValidationFunction<string>;
  miradorOptions?: ValidationFunction<string>;
  searchPage?: ValidationFunction<string>;
  siteColor?: ValidationFunction<string>;
  siteId?: ValidationFunction<string>;
  siteName?: ValidationFunction<string>;
  siteOptions?: ValidationFunction<string>;
  sitePages?: ValidationFunction<string>;
  siteTitle?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type SiteUpdateFormOverridesProps = {
  SiteUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  analyticsID?: PrimitiveOverrideProps<TextFieldProps>;
  assetBasePath?: PrimitiveOverrideProps<TextFieldProps>;
  browseCollections?: PrimitiveOverrideProps<TextAreaFieldProps>;
  contact?: PrimitiveOverrideProps<TextAreaFieldProps>;
  displayedAttributes?: PrimitiveOverrideProps<TextAreaFieldProps>;
  groups?: PrimitiveOverrideProps<TextFieldProps>;
  homePage?: PrimitiveOverrideProps<TextAreaFieldProps>;
  lang?: PrimitiveOverrideProps<TextFieldProps>;
  miradorOptions?: PrimitiveOverrideProps<TextAreaFieldProps>;
  searchPage?: PrimitiveOverrideProps<TextAreaFieldProps>;
  siteColor?: PrimitiveOverrideProps<TextFieldProps>;
  siteId?: PrimitiveOverrideProps<TextFieldProps>;
  siteName?: PrimitiveOverrideProps<TextFieldProps>;
  siteOptions?: PrimitiveOverrideProps<TextAreaFieldProps>;
  sitePages?: PrimitiveOverrideProps<TextAreaFieldProps>;
  siteTitle?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SiteUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: SiteUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    site?: any;
    onSubmit?: (fields: SiteUpdateFormInputValues) => SiteUpdateFormInputValues;
    onSuccess?: (fields: SiteUpdateFormInputValues) => void;
    onError?: (fields: SiteUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SiteUpdateFormInputValues) => SiteUpdateFormInputValues;
    onValidate?: SiteUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function SiteUpdateForm(
  props: SiteUpdateFormProps
): React.ReactElement;