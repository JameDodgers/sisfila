import { useField } from "formik";
import { TextInput, View } from "react-native";
import { HelperText, TextInputProps } from "react-native-paper";
import { CustomTextInput } from "./CustomTextInput";
import { forwardRef } from "react";
interface Props extends TextInputProps {
  fieldName: string;
}

export const FormikTextInput = forwardRef<TextInput, Props>(
  ({ fieldName, ...props }, ref) => {
    const [field, meta, helpers] = useField(fieldName);

    return (
      <View>
        <CustomTextInput
          ref={ref}
          value={field.value}
          error={!!(meta.touched && meta.error)}
          onChangeText={helpers.setValue}
          onBlur={() => helpers.setTouched(true)}
          {...props}
        />
        <HelperText type={!!(meta.touched && meta.error) ? "error" : "info"}>
          {!!(meta.touched && meta.error) ? meta.error : " "}
        </HelperText>
      </View>
    );
  }
);
