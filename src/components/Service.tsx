import { Text, VStack, IPressableProps, Pressable } from "native-base";

export type ServiceProps = {
  id: string;
  name: string;
  organizationId: string;
  subscriptionToken: string;
  guestEnroll: boolean;
  opensAt: Date;
  closesAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

type Props = IPressableProps & {
  item: ServiceProps;
};

export const Service = ({ item, ...rest }: Props) => {
  return (
    <Pressable {...rest}>
      <VStack bg="light.50" p={2} mb={4} shadow={5} rounded="md">
        <Text>{item.name}</Text>
      </VStack>
    </Pressable>
  );
};
