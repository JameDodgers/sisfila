import { Platform } from "react-native";

import { DatePickerInput } from "react-native-paper-dates";
import { DatePickerInputProps } from "react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared";

export const CustomDatePickerInput = (props: DatePickerInputProps) => {
  return (
    <DatePickerInput
      className="web:bg-transparent"
      mode={Platform.select({
        native: "outlined",
        web: "flat",
      })}
      {...props}
    />
  );
};
