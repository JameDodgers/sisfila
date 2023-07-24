import { Text, VStack } from "native-base";
import { useState } from "react";
import { Button, Input } from "native-base";

import api from "../../services/api/config";
import { useNavigation } from "@react-navigation/native";
import { useDrawer } from "../../contexts/drawer";

export const CreateGroup = () => {
  const { organizationId } = useDrawer();
  const navigation = useNavigation();

  const [name, setName] = useState("");

  const handleCreateGroup = () => {
    api
      .post("v1/groups", {
        name,
        organizationId,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <VStack flex={1} p={4} space={3}>
      <Input placeholder="Nome" value={name} onChangeText={setName} />
      <Button onPress={handleCreateGroup}>
        <Text>Criar grupo</Text>
      </Button>
    </VStack>
  );
};
