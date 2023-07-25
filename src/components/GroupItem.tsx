import { Text, VStack, IPressableProps, Pressable } from "native-base";
import { Group } from "../models/Group";

type Props = IPressableProps & {
  item: Group;
};

export const GroupItem = ({ item, ...rest }: Props) => {
  return (
    <Pressable {...rest}>
      <VStack bg="light.50" p={2} mb={4} shadow={5} rounded="md">
        <Text>{item.name}</Text>
      </VStack>
    </Pressable>
  );
};
