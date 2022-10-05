import { useRoute } from "@react-navigation/native";
import { Text, VStack } from "native-base";

type RouteParams = {
  id?: number;
};

export const Organization = () => {
  const route = useRoute();

  const id = route.params as RouteParams;

  return (
    <VStack flex={1}>
      <Text>Teste</Text>
    </VStack>
  );
};
