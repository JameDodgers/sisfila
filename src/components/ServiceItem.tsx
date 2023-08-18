import { Pressable, PressableProps } from "react-native";
import { Service } from "../models/Service";
import { Text } from "react-native-paper";

type Props = PressableProps & {
  item: Service;
};

export const ServiceItem = ({ item, ...rest }: Props) => {
  return (
    <Pressable className="shadow-sm bg-stone-50 p-2 rounded-md" {...rest}>
      <Text>{item.name}</Text>
    </Pressable>
  );
};
