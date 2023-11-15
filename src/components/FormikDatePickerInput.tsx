import { useField } from "formik";
import { DatePickerInputProps } from "react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared";

import { CustomDatePickerInput } from "./CustomDatePickerInput";

interface Props extends Omit<DatePickerInputProps, "value"> {
  fieldName: string;
}

export const FormikDatePickerInput = ({ fieldName, ...props }: Props) => {
  const [field, meta, helpers] = useField(fieldName);

  return (
    <CustomDatePickerInput
      value={field.value}
      hasError={Boolean(meta.error)}
      onBlur={() => helpers.setTouched(true)}
      hideValidationErrors
      onValidationError={(error) => helpers.setError(error || undefined)}
      {...props}
    />
  );
};
