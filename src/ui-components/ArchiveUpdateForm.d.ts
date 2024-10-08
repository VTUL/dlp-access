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
export declare type ArchiveUpdateFormInputValues = {
  alternative?: string[];
  archiveOptions?: string;
  basis_of_record?: string[];
  bibliographic_citation?: string[];
  conforms_to?: string[];
  contributor?: string[];
  coverage?: string[];
  create_date?: string;
  created?: string[];
  creator?: string[];
  custom_key?: string;
  date?: string[];
  description?: string[];
  display_date?: string[];
  download_link?: string[];
  end_date?: string;
  explicit?: boolean;
  extent?: string[];
  format?: string[];
  has_format?: string[];
  has_part?: string[];
  has_version?: string[];
  heirarchy_path?: string[];
  identifier?: string;
  is_format_of?: string[];
  is_part_of?: string[];
  is_version_of?: string[];
  item_category?: string;
  language?: string[];
  license?: string[];
  location?: string[];
  manifest_file_characterization?: string;
  manifest_url?: string;
  medium?: string[];
  modified_date?: string;
  other_identifier?: string[];
  parent_collection?: string[];
  provenance?: string[];
  publisher?: string[];
  references?: string[];
  relation?: string[];
  repository?: string[];
  rights_holder?: string[];
  rights?: string[];
  source?: string[];
  spatial?: string[];
  start_date?: string;
  subject?: string[];
  tags?: string[];
  temporal?: string[];
  thumbnail_path?: string;
  title?: string;
  type?: string[];
  visibility?: boolean;
};
export declare type ArchiveUpdateFormValidationValues = {
  alternative?: ValidationFunction<string>;
  archiveOptions?: ValidationFunction<string>;
  basis_of_record?: ValidationFunction<string>;
  bibliographic_citation?: ValidationFunction<string>;
  conforms_to?: ValidationFunction<string>;
  contributor?: ValidationFunction<string>;
  coverage?: ValidationFunction<string>;
  create_date?: ValidationFunction<string>;
  created?: ValidationFunction<string>;
  creator?: ValidationFunction<string>;
  custom_key?: ValidationFunction<string>;
  date?: ValidationFunction<string>;
  description?: ValidationFunction<string>;
  display_date?: ValidationFunction<string>;
  download_link?: ValidationFunction<string>;
  end_date?: ValidationFunction<string>;
  explicit?: ValidationFunction<boolean>;
  extent?: ValidationFunction<string>;
  format?: ValidationFunction<string>;
  has_format?: ValidationFunction<string>;
  has_part?: ValidationFunction<string>;
  has_version?: ValidationFunction<string>;
  heirarchy_path?: ValidationFunction<string>;
  identifier?: ValidationFunction<string>;
  is_format_of?: ValidationFunction<string>;
  is_part_of?: ValidationFunction<string>;
  is_version_of?: ValidationFunction<string>;
  item_category?: ValidationFunction<string>;
  language?: ValidationFunction<string>;
  license?: ValidationFunction<string>;
  location?: ValidationFunction<string>;
  manifest_file_characterization?: ValidationFunction<string>;
  manifest_url?: ValidationFunction<string>;
  medium?: ValidationFunction<string>;
  modified_date?: ValidationFunction<string>;
  other_identifier?: ValidationFunction<string>;
  parent_collection?: ValidationFunction<string>;
  provenance?: ValidationFunction<string>;
  publisher?: ValidationFunction<string>;
  references?: ValidationFunction<string>;
  relation?: ValidationFunction<string>;
  repository?: ValidationFunction<string>;
  rights_holder?: ValidationFunction<string>;
  rights?: ValidationFunction<string>;
  source?: ValidationFunction<string>;
  spatial?: ValidationFunction<string>;
  start_date?: ValidationFunction<string>;
  subject?: ValidationFunction<string>;
  tags?: ValidationFunction<string>;
  temporal?: ValidationFunction<string>;
  thumbnail_path?: ValidationFunction<string>;
  title?: ValidationFunction<string>;
  type?: ValidationFunction<string>;
  visibility?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type ArchiveUpdateFormOverridesProps = {
  ArchiveUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  alternative?: PrimitiveOverrideProps<TextFieldProps>;
  archiveOptions?: PrimitiveOverrideProps<TextAreaFieldProps>;
  basis_of_record?: PrimitiveOverrideProps<TextFieldProps>;
  bibliographic_citation?: PrimitiveOverrideProps<TextFieldProps>;
  conforms_to?: PrimitiveOverrideProps<TextFieldProps>;
  contributor?: PrimitiveOverrideProps<TextFieldProps>;
  coverage?: PrimitiveOverrideProps<TextFieldProps>;
  create_date?: PrimitiveOverrideProps<TextFieldProps>;
  created?: PrimitiveOverrideProps<TextFieldProps>;
  creator?: PrimitiveOverrideProps<TextFieldProps>;
  custom_key?: PrimitiveOverrideProps<TextFieldProps>;
  date?: PrimitiveOverrideProps<TextFieldProps>;
  description?: PrimitiveOverrideProps<TextFieldProps>;
  display_date?: PrimitiveOverrideProps<TextFieldProps>;
  download_link?: PrimitiveOverrideProps<TextFieldProps>;
  end_date?: PrimitiveOverrideProps<TextFieldProps>;
  explicit?: PrimitiveOverrideProps<SwitchFieldProps>;
  extent?: PrimitiveOverrideProps<TextFieldProps>;
  format?: PrimitiveOverrideProps<TextFieldProps>;
  has_format?: PrimitiveOverrideProps<TextFieldProps>;
  has_part?: PrimitiveOverrideProps<TextFieldProps>;
  has_version?: PrimitiveOverrideProps<TextFieldProps>;
  heirarchy_path?: PrimitiveOverrideProps<TextFieldProps>;
  identifier?: PrimitiveOverrideProps<TextFieldProps>;
  is_format_of?: PrimitiveOverrideProps<TextFieldProps>;
  is_part_of?: PrimitiveOverrideProps<TextFieldProps>;
  is_version_of?: PrimitiveOverrideProps<TextFieldProps>;
  item_category?: PrimitiveOverrideProps<TextFieldProps>;
  language?: PrimitiveOverrideProps<TextFieldProps>;
  license?: PrimitiveOverrideProps<TextFieldProps>;
  location?: PrimitiveOverrideProps<TextFieldProps>;
  manifest_file_characterization?: PrimitiveOverrideProps<TextAreaFieldProps>;
  manifest_url?: PrimitiveOverrideProps<TextFieldProps>;
  medium?: PrimitiveOverrideProps<TextFieldProps>;
  modified_date?: PrimitiveOverrideProps<TextFieldProps>;
  other_identifier?: PrimitiveOverrideProps<TextFieldProps>;
  parent_collection?: PrimitiveOverrideProps<TextFieldProps>;
  provenance?: PrimitiveOverrideProps<TextFieldProps>;
  publisher?: PrimitiveOverrideProps<TextFieldProps>;
  references?: PrimitiveOverrideProps<TextFieldProps>;
  relation?: PrimitiveOverrideProps<TextFieldProps>;
  repository?: PrimitiveOverrideProps<TextFieldProps>;
  rights_holder?: PrimitiveOverrideProps<TextFieldProps>;
  rights?: PrimitiveOverrideProps<TextFieldProps>;
  source?: PrimitiveOverrideProps<TextFieldProps>;
  spatial?: PrimitiveOverrideProps<TextFieldProps>;
  start_date?: PrimitiveOverrideProps<TextFieldProps>;
  subject?: PrimitiveOverrideProps<TextFieldProps>;
  tags?: PrimitiveOverrideProps<TextFieldProps>;
  temporal?: PrimitiveOverrideProps<TextFieldProps>;
  thumbnail_path?: PrimitiveOverrideProps<TextFieldProps>;
  title?: PrimitiveOverrideProps<TextFieldProps>;
  type?: PrimitiveOverrideProps<TextFieldProps>;
  visibility?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type ArchiveUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: ArchiveUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    archive?: any;
    onSubmit?: (
      fields: ArchiveUpdateFormInputValues
    ) => ArchiveUpdateFormInputValues;
    onSuccess?: (fields: ArchiveUpdateFormInputValues) => void;
    onError?: (
      fields: ArchiveUpdateFormInputValues,
      errorMessage: string
    ) => void;
    onChange?: (
      fields: ArchiveUpdateFormInputValues
    ) => ArchiveUpdateFormInputValues;
    onValidate?: ArchiveUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function ArchiveUpdateForm(
  props: ArchiveUpdateFormProps
): React.ReactElement;
