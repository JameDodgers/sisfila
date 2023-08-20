import DropDownPicker, {
  DropDownPickerProps,
  ValueType,
} from "react-native-dropdown-picker";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

type Props = DropDownPickerProps<ValueType>;

export const Picker = (props: Props) => {
  const { fonts, colors } = useTheme();

  const style = [
    styles.base,
    {
      borderColor: colors.outline,
    },
  ];

  const textStyle = [
    fonts.bodyLarge,
    {
      color: colors.onSurfaceVariant,
    },
  ];

  const dropDownContainerStyle = [
    styles.dropDownContainerStyle,
    {
      borderColor: colors.outline,
    },
  ];

  return (
    <DropDownPicker
      style={style}
      dropDownContainerStyle={dropDownContainerStyle}
      arrowIconStyle={{ tintColor: colors.outline }}
      textStyle={textStyle}
      listMode="SCROLLVIEW"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: "transparent",
    borderRadius: 4,
  },
  dropDownContainerStyle: {
    borderRadius: 4,
  },
});
