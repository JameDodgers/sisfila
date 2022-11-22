import { Text, VStack, IPressableProps, Pressable } from "native-base";

export type QueueProps = {
  id: string;
  name: string;
  description: string;
  code: string;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
  serviceId: string;
};

type Props = IPressableProps & {
  item: QueueProps;
};

export const Queue = ({ item, ...rest }: Props) => {
  return (
    <Pressable {...rest}>
      <VStack bg="light.50" p={2} mb={4} shadow={5} rounded="md">
        <Text>{item.name}</Text>
      </VStack>
    </Pressable>
  );
};
