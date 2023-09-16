import { FlatList, ScrollView as RNScrollView } from "react-native";
import { Dialog as PaperDialog } from "react-native-paper";
import { styled } from "nativewind";
import { ComponentProps } from "react";

export const StyledFlatList = styled(FlatList, {
  props: {
    contentContainerStyle: true,
  },
});

interface CustomFlatListProps extends ComponentProps<typeof StyledFlatList> {}

export const CustomFlatList = (props: CustomFlatListProps) => (
  <StyledFlatList
    contentContainerStyle="p-4 web:w-full web:self-center web:max-w-screen-sm"
    {...props}
  />
);

export const ScrollView = styled(RNScrollView, {
  props: { contentContainerStyle: true },
});
