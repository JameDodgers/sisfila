import { Text, VStack } from "native-base";
import { Client } from "../models/Client";

type Props = {
  item: Client;
  index: number;
};

export const ClientItem = ({ item, index }: Props) => {
  return (
    <VStack bg="light.50">
      <Text>
        {index + 1} - {item.name}
      </Text>
    </VStack>
  );
};
