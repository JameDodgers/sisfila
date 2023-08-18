import { PickerProps, Picker } from "@react-native-picker/picker";
import { ReactNode } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

interface Props<T> extends PickerProps<T> {
  label: string;
  children: ReactNode;
}

const CustomPicker = ({ label, children }: Props<string>) => {
  return (
    <View>
      <Text variant="bodyLarge">{label}</Text>
      <View className="border rounded ios:border-0 ios:rounded-none">
        <Picker mode="dropdown">{children}</Picker>
      </View>
    </View>
  );
};

CustomPicker.Item = Picker.Item;

export { CustomPicker as Picker };
