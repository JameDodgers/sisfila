import { useRoute, useNavigation } from "@react-navigation/native";
import { Text, VStack } from "native-base";
import { useDrawer } from "../../contexts/drawer";

type RouteParams = {
  id?: number;
};

export const OrganizationDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { organizationId } = useDrawer();

  const id = route.params as RouteParams;

  return (
    <VStack flex={1}>
      <Text>Member</Text>
    </VStack>
  );
};
