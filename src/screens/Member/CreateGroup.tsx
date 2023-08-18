import { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { useOrganizerStore } from "../../store/organizer";

import { useGroupsQueries } from "../../queries/groups";
import { Button, Text, TextInput } from "react-native-paper";
import { View } from "react-native";

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
    <View className="flex-1 p-4 g-3">
      <View className="flex-1">
        <TextInput
          mode="outlined"
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
      </View>
      <Button mode="contained" onPress={handleCreateGroup}>
        Criar grupo
      </Button>
    </View>
  );
};
