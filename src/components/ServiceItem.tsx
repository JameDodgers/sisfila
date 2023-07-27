import { Text, VStack, IPressableProps, Pressable } from "native-base";
import { Service } from "../models/Service";

type Props = IPressableProps & {
  item: Service;
};

export const ServiceItem = ({ item, ...rest }: Props) => {
  return (
    <Pressable {...rest}>
      <VStack bg="light.50" p={2} mb={4} shadow={5} rounded="md">
        <Text>{item.name}</Text>
      </VStack>
    </Pressable>
  );
};
