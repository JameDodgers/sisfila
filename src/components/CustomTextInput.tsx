import { forwardRef } from "react";
import { TextInput } from "react-native";
import { Platform } from "react-native";
import {
  TextInput as PaperTextInput,
  TextInputProps,
} from "react-native-paper";

type Props = TextInputProps;

export type Ref = TextInput;

export const CustomTextInput = forwardRef<Ref, Props>((props, ref) => {
  return (
    <PaperTextInput
      ref={ref}
      className="web:bg-transparent"
      mode={Platform.select({
        native: "outlined",
        web: "flat",
      })}
      {...props}
    />
  );
});
