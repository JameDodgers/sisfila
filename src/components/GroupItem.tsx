import { Pressable, PressableProps } from "react-native";
import { Group } from "../models/Group";
import { Text } from "react-native-paper";

type Props = PressableProps & {
  item: Group;
};

export const GroupItem = ({ item, ...rest }: Props) => {
  return (
    <Pressable className="shadow-sm bg-stone-50 p-2 rounded-md" {...rest}>
      <Text>{item.name}</Text>
    </Pressable>
  );
};
