import { useRoute, useNavigation } from "@react-navigation/native";
import { Button, VStack } from "native-base";
import { useLayoutEffect } from "react";

type RouteParams = {
  id: number;
};

export const Organization = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
    });
  }, [navigation]);

  const { id } = route.params as RouteParams;

  return (
    <VStack flex={1} p={4}>
      <VStack flex={1}></VStack>
      <Button>Entrar na fila</Button>
    </VStack>
  );
};
