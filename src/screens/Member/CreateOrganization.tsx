import { VStack } from "native-base";
import { useState } from "react";
import { Button, Input } from "native-base";

import api from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import { useDrawer } from "../../contexts/drawer";
import { useAuth } from "../../hooks/auth";

export const CreateOrganization = () => {
  const { setOrganizationId } = useDrawer();
  const navigation = useNavigation();

  const { user } = useAuth();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const handleCreateOrganization = () => {
    api
      .post("v1/organizations", { name, code })
      .then(({ data }) => {
        api
          .patch(`v1/users/${user.id}/organizations/${data.id}`, {
            role: "TYPE_COORDINATOR",
          })
          .then(() => {
            setOrganizationId(data.id);
            navigation.navigate("Organizations");
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <VStack flex={1} p={4}>
      <VStack flex={1} space={3}>
        <Input
          size="2xl"
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <Input
          size="2xl"
          placeholder="TAG"
          value={code}
          onChangeText={setCode}
        />
      </VStack>
      <Button onPress={handleCreateOrganization}>Criar</Button>
    </VStack>
  );
};
