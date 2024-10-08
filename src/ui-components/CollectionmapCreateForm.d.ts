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
export declare type CollectionmapCreateFormInputValues = {
    collectionmap_category?: string;
    collection_id?: string;
    create_date?: string;
    map_object?: string;
    modified_date?: string;
};
export declare type CollectionmapCreateFormValidationValues = {
    collectionmap_category?: ValidationFunction<string>;
    collection_id?: ValidationFunction<string>;
    create_date?: ValidationFunction<string>;
    map_object?: ValidationFunction<string>;
    modified_date?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CollectionmapCreateFormOverridesProps = {
    CollectionmapCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    collectionmap_category?: PrimitiveOverrideProps<TextFieldProps>;
    collection_id?: PrimitiveOverrideProps<TextFieldProps>;
    create_date?: PrimitiveOverrideProps<TextFieldProps>;
    map_object?: PrimitiveOverrideProps<TextFieldProps>;
    modified_date?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CollectionmapCreateFormProps = React.PropsWithChildren<{
    overrides?: CollectionmapCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CollectionmapCreateFormInputValues) => CollectionmapCreateFormInputValues;
    onSuccess?: (fields: CollectionmapCreateFormInputValues) => void;
    onError?: (fields: CollectionmapCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CollectionmapCreateFormInputValues) => CollectionmapCreateFormInputValues;
    onValidate?: CollectionmapCreateFormValidationValues;
} & React.CSSProperties>;
export default function CollectionmapCreateForm(props: CollectionmapCreateFormProps): React.ReactElement;
