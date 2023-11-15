import { forwardRef } from "react";
import { TextInput , Platform } from "react-native";

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
      style={{
        textAlign: "auto",
      }}
      mode={Platform.select({
        native: "outlined",
        web: "flat",
      })}
      {...props}
    />
  );
});
