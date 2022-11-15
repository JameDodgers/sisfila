import { VStack } from "native-base";
import { useState } from "react";
import { Button, Input } from "native-base";

import api from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import { useDrawer } from "../../contexts/drawer";

export const CreateOrganization = () => {
  const { setOrganizationId } = useDrawer();
  const navigation = useNavigation();

  const [name, setName] = useState("");

  const handleCreateOrganization = () => {
    api
      .post("v1/organizations", { name, code: "ORG" })
      .then(({ data }) => {
        setOrganizationId(data.id);
        navigation.navigate("DrawerStack");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <VStack flex={1} p={4}>
      <VStack flex={1}>
        <Input
          size="2xl"
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
      </VStack>
      <Button onPress={handleCreateOrganization}>Criar</Button>
    </VStack>
  );
};
