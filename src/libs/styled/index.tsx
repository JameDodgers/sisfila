import {
  FlatList as RNFlatList,
  ScrollView as RNScrollView,
} from "react-native";

import { styled } from "nativewind";

export const FlatList = styled(RNFlatList, {
  props: { contentContainerStyle: true },
});

export const ScrollView = styled(RNScrollView, {
  props: { contentContainerStyle: true },
});
