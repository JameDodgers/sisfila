import { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { useOrganizationsQueries } from "../../queries/organizations";
import { Button, TextInput } from "react-native-paper";
import { View } from "react-native";

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
    <View className="flex-1 p-4">
      <View className="flex-1 g-3">
        <TextInput
          mode="outlined"
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          mode="outlined"
          placeholder="TAG"
          value={code}
          onChangeText={setCode}
        />
      </View>
      <Button onPress={handleCreateOrganization}>Criar</Button>
    </View>
  );
};
