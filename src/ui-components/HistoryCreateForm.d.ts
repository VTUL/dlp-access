/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type HistoryCreateFormInputValues = {
    event?: string;
    groups?: string[];
    siteID?: string;
    userEmail?: string;
};
export declare type HistoryCreateFormValidationValues = {
    event?: ValidationFunction<string>;
    groups?: ValidationFunction<string>;
    siteID?: ValidationFunction<string>;
    userEmail?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HistoryCreateFormOverridesProps = {
    HistoryCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    event?: PrimitiveOverrideProps<TextAreaFieldProps>;
    groups?: PrimitiveOverrideProps<TextFieldProps>;
    siteID?: PrimitiveOverrideProps<TextFieldProps>;
    userEmail?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HistoryCreateFormProps = React.PropsWithChildren<{
    overrides?: HistoryCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HistoryCreateFormInputValues) => HistoryCreateFormInputValues;
    onSuccess?: (fields: HistoryCreateFormInputValues) => void;
    onError?: (fields: HistoryCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HistoryCreateFormInputValues) => HistoryCreateFormInputValues;
    onValidate?: HistoryCreateFormValidationValues;
} & React.CSSProperties>;
export default function HistoryCreateForm(props: HistoryCreateFormProps): React.ReactElement;
