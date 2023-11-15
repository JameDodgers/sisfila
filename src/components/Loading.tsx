import { View } from "react-native";

import { ActivityIndicator } from "react-native-paper";

import { useLoading } from "../contexts/loading";

export const Loading = () => {
  const loading = useLoading();
  if (loading) {
    return (
      <View className="absolute justify-center items-center bottom-0 right-0 left-0 top-0 bg-white opacity-50">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
};
