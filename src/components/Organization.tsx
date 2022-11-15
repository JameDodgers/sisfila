import { IPressableProps, Pressable, Text } from "native-base";

import { UserRoleOnOrganization } from "../hooks/auth";

type Props = IPressableProps & {
  data: UserRoleOnOrganization;
};

export const Organization = ({ data, ...props }: Props) => {
  return (
    <Pressable bg="white" m={2} p={2} shadow={2} rounded={4} {...props}>
      <Text>{data.organizationName}</Text>
    </Pressable>
  );
};
