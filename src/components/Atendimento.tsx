import {
  Text,
  VStack,
  IPressableProps,
  Pressable,
  FlatList,
} from "native-base";

import { Client } from "./Client";

import { QueueProps } from "./Queue";

type Props = IPressableProps & {
  item: QueueProps;
};

export const Atendimento = ({ item, ...rest }: Props) => {
  const { name, clients } = item;
  return (
    <Pressable {...rest}>
      <VStack bg="light.50" p={2} mb={4} shadow={5} rounded="md">
        <Text>{name}</Text>
        <FlatList
          data={clients}
          renderItem={(props) => <Client {...props} />}
        />
      </VStack>
    </Pressable>
  );
};
