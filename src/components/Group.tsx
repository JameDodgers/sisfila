import { Text, VStack, IPressableProps, Pressable } from "native-base";

export type GroupProps = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
};

type Props = IPressableProps & {
  item: GroupProps;
};

export const Group = ({ item, ...rest }: Props) => {
  return (
    <Pressable {...rest}>
      <VStack bg="light.50" p={2} mb={4} shadow={5} rounded="md">
        <Text>{item.name}</Text>
      </VStack>
    </Pressable>
  );
};
