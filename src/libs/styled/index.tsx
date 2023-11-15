import { FlatList, ScrollView as RNScrollView } from "react-native";

import { styled } from "nativewind";
import { NestableScrollContainer } from "react-native-draggable-flatlist";
import { Dialog as PaperDialog } from "react-native-paper";

export const StyledFlatList = styled(FlatList, {
  props: {
    contentContainerStyle: true,
  },
});

export const ScrollView = styled(RNScrollView, {
  props: { contentContainerStyle: true },
});

export const StyledNestableScrollContainer = styled(NestableScrollContainer, {
  props: {
    contentContainerStyle: true,
  },
});

export const Dialog = styled(
  PaperDialog,
  "web:w-full web:self-center web:max-w-md"
);
