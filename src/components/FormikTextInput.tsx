import { useField } from "formik";
import { View } from "react-native";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";

interface Props extends TextInputProps {
  fieldName: string;
}

export const FormikTextInput = ({ fieldName, ...props }: Props) => {
  const [field, meta, helpers] = useField(fieldName);

  return (
    <View>
      <TextInput
        {...props}
        label={`${props.label}*`}
        value={field.value}
        error={!!(meta.touched && meta.error)}
        onChangeText={helpers.setValue}
        onBlur={() => helpers.setTouched(true)}
      />
      <HelperText type={!!(meta.touched && meta.error) ? "error" : "info"}>
        {!!(meta.touched && meta.error) ? meta.error : " "}
      </HelperText>
    </View>
  );
};
