import { Platform } from "react-native";
import {
  TextInput as PaperTextInput,
  TextInputProps,
} from "react-native-paper";

export const CustomTextInput = (props: TextInputProps) => {
  return (
    <PaperTextInput
      className="web:bg-transparent"
      mode={Platform.select({
        native: "outlined",
        web: "flat",
      })}
      {...props}
    />
  );
};
