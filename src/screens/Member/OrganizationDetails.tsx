import { useNavigation } from "@react-navigation/native";
import { Button, VStack, Text } from "native-base";
import { useLayoutEffect } from "react";

import { useDrawer } from "../../contexts/drawer";

import { useOrganizationsQueries } from "../../queries/organizations";

export const OrganizationDetails = () => {
  const navigation = useNavigation();

  const { organizationId } = useDrawer();

  const { useGetOrganization } = useOrganizationsQueries();

  const { data: organization } = useGetOrganization(organizationId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: organization?.name,
    });
  }, [navigation, organization]);

  const handleDeleteOrganization = () => {};

  return (
    <VStack flex={1} p={4}>
      <Button
        bg="transparent"
        _pressed={{
          bg: "coolGray.200",
        }}
        onPress={handleDeleteOrganization}
      >
        <Text color="danger.600">Excluir organização</Text>
      </Button>
    </VStack>
  );
};
