import { HStack, IPressableProps, Pressable, Text } from "native-base";
import { Organization } from "../models/Organization";

type Props = IPressableProps & {
  item: Organization;
};

export const OrganizationItem = ({ item, ...props }: Props) => {
  return (
    <Pressable bg="white" m={2} p={2} shadow={2} rounded={4} {...props}>
      <HStack justifyContent="space-between">
        <Text>{item.name}</Text>
        <Text>{item.code}</Text>
      </HStack>
    </Pressable>
  );
};
