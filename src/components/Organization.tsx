import { HStack, IPressableProps, Pressable, Text } from "native-base";

export type OrganizationProps = {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
};

type Props = IPressableProps & {
  item: OrganizationProps;
};

export const Organization = ({ item, ...props }: Props) => {
  return (
    <Pressable bg="white" m={2} p={2} shadow={2} rounded={4} {...props}>
      <HStack justifyContent="space-between">
        <Text>{item.name}</Text>
        <Text>{item.code}</Text>
      </HStack>
    </Pressable>
  );
};
