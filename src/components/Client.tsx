import { Text, VStack } from "native-base";

export type ClientProps = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
  registrationId: string;
};

type Props = {
  item: ClientProps;
  index: number;
};

export const Client = ({ item, index }: Props) => {
  return (
    <VStack bg="light.50">
      <Text>
        {index + 1} - {item.name}
      </Text>
    </VStack>
  );
};
