import { useNavigation } from "@react-navigation/native";

import { useLayoutEffect } from "react";

import { useOrganizationsQueries } from "../../queries/organizations";

import { useOrganizerStore } from "../../store/organizer";
import { Button } from "react-native-paper";
import { View } from "react-native";

export const OrganizationDetails = () => {
  const navigation = useNavigation();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetOrganization, useDeleteOrganization } =
    useOrganizationsQueries();

  const { data: organization } = useGetOrganization(currentOrganizationId);

  const { mutate: deleteOrganization } = useDeleteOrganization();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: organization?.name,
    });
  }, [navigation, organization]);

  const handleDeleteOrganization = () => {
    deleteOrganization(currentOrganizationId);
    navigation.navigate("Organizations");
  };

  return (
    <View className="flex-1 p-4">
      <Button onPress={handleDeleteOrganization}>Excluir organização</Button>
    </View>
  );
};
