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
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PageContentUpdateFormInputValues = {
    page_content_category?: string;
    content?: string;
};
export declare type PageContentUpdateFormValidationValues = {
    page_content_category?: ValidationFunction<string>;
    content?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PageContentUpdateFormOverridesProps = {
    PageContentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    page_content_category?: PrimitiveOverrideProps<TextFieldProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PageContentUpdateFormProps = React.PropsWithChildren<{
    overrides?: PageContentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    pageContent?: any;
    onSubmit?: (fields: PageContentUpdateFormInputValues) => PageContentUpdateFormInputValues;
    onSuccess?: (fields: PageContentUpdateFormInputValues) => void;
    onError?: (fields: PageContentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PageContentUpdateFormInputValues) => PageContentUpdateFormInputValues;
    onValidate?: PageContentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PageContentUpdateForm(props: PageContentUpdateFormProps): React.ReactElement;
