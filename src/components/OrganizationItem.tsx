import { Pressable, PressableProps, View } from "react-native";
import { Organization } from "../models/Organization";
import { Text } from "react-native-paper";

type Props = PressableProps & {
  item: Organization;
};

export const OrganizationItem = ({ item, ...props }: Props) => {
  return (
    <Pressable className="m-1 p-2 shadow-sm rounded-md" {...props}>
      <View className="justify-between">
        <Text>{item.name}</Text>
        <Text>{item.code}</Text>
      </View>
    </Pressable>
  );
};
