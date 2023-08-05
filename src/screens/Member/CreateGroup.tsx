import { Text, VStack } from "native-base";
import { useState } from "react";
import { Button, Input } from "native-base";

import { useNavigation } from "@react-navigation/native";
import { useOrganizerStore } from "../../store/organizer";

import { useGroupsQueries } from "../../queries/groups";

export const CreateGroup = () => {
  const { currentOrganizationId = "" } = useOrganizerStore();

  const navigation = useNavigation();

  const { useCreateGroup } = useGroupsQueries();

  const { mutate: createGroup } = useCreateGroup();

  const [name, setName] = useState("");

  const handleCreateGroup = () => {
    const payload = {
      name,
      organizationId: currentOrganizationId,
    };
    createGroup(payload, {
      onSuccess: () => {
        navigation.goBack();
      },
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
