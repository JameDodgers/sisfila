import { Text, VStack, IPressableProps, Pressable } from "native-base";

export type ClientProps = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
  registrationId: string;
};

type Props = IPressableProps & {
  item: ClientProps;
};

export const Client = ({ item, ...rest }: Props) => {
  return (
    <Pressable {...rest}>
      <VStack bg="light.50" p={2} mb={4} shadow={5} rounded="md">
        <Text>{item.name}</Text>
      </VStack>
    </Pressable>
  );
};
