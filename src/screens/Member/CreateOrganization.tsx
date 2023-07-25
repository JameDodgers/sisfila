import { VStack } from "native-base";
import { useState } from "react";
import { Button, Input } from "native-base";

import { useNavigation } from "@react-navigation/native";

import { useOrganizationsQueries } from "../../queries/organizations";

export const CreateOrganization = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const { useCreateOrganization } = useOrganizationsQueries();

  const { mutate: createOrganization } = useCreateOrganization();

  const handleCreateOrganization = () => {
    const payload = { name, code };

    createOrganization(payload, {
      onSuccess: () => {
        navigation.navigate("Organizations");
      },
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
