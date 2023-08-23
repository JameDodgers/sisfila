import DropDownPicker, {
  DropDownPickerProps,
  ValueType,
} from "react-native-dropdown-picker";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

type Props = DropDownPickerProps<ValueType> & {
  error?: boolean;
};

export const Picker = ({ error, ...props }: Props) => {
  const { fonts, colors } = useTheme();

  const style = [
    styles.base,
    {
      borderColor: error ? colors.error : colors.outline,
    },
    props.style,
  ];

  const textStyle = [
    fonts.bodyLarge,
    {
      color: colors.onSurfaceVariant,
    },
  ];

  const placeholderStyle = [error && { color: colors.error }];

  const dropDownContainerStyle = [
    styles.dropDownContainerStyle,
    {
      borderColor: colors.outline,
    },
  ];

  const arrowIconStyle = { tintColor: error ? colors.error : colors.outline };

  return (
    <DropDownPicker
      style={style}
      className={error && "border-2"}
      placeholderStyle={placeholderStyle}
      dropDownContainerStyle={dropDownContainerStyle}
      arrowIconStyle={arrowIconStyle}
      textStyle={textStyle}
      listMode="SCROLLVIEW"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: "transparent",
    marginTop: 6,
    borderRadius: 4,
  },
  dropDownContainerStyle: {
    borderRadius: 4,
  },
});
