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
export declare type EmbargoUpdateFormInputValues = {
    identifier?: string;
    start_date?: string;
    end_date?: string;
    note?: string;
    record_type?: string;
};
export declare type EmbargoUpdateFormValidationValues = {
    identifier?: ValidationFunction<string>;
    start_date?: ValidationFunction<string>;
    end_date?: ValidationFunction<string>;
    note?: ValidationFunction<string>;
    record_type?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmbargoUpdateFormOverridesProps = {
    EmbargoUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    identifier?: PrimitiveOverrideProps<TextFieldProps>;
    start_date?: PrimitiveOverrideProps<TextFieldProps>;
    end_date?: PrimitiveOverrideProps<TextFieldProps>;
    note?: PrimitiveOverrideProps<TextFieldProps>;
    record_type?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmbargoUpdateFormProps = React.PropsWithChildren<{
    overrides?: EmbargoUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    embargo?: any;
    onSubmit?: (fields: EmbargoUpdateFormInputValues) => EmbargoUpdateFormInputValues;
    onSuccess?: (fields: EmbargoUpdateFormInputValues) => void;
    onError?: (fields: EmbargoUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmbargoUpdateFormInputValues) => EmbargoUpdateFormInputValues;
    onValidate?: EmbargoUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EmbargoUpdateForm(props: EmbargoUpdateFormProps): React.ReactElement;
