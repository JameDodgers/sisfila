import { useState } from "react";

import { useGroupsQueries } from "../../queries/groups";
import { useOrganizerStore } from "../../store/organizer";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { GroupsStackScreenProps } from "../../../@types/navigation";

export const ImportClients = ({
  route,
  navigation,
}: GroupsStackScreenProps<"ImportClients">) => {
  const { groupId } = route.params;

  const { currentOrganizationId = "" } = useOrganizerStore();

  const [data, setData] = useState("");

  const { useImportClients } = useGroupsQueries();

  const { mutate: importClients } = useImportClients();

  const handleImportClients = () => {
    const line = data.split("\n");
    let clients = [];

    for (let i = 0; i < line.length; i++) {
      const client = line[i].split("\t");

      clients.push({
        name: client[1],
        registrationId: client[0],
        organizationId: currentOrganizationId,
      });
    }

    const payload = {
      clients,
      organizationId: currentOrganizationId,
      groupId,
    };

    importClients(payload, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  return (
    <View className="flex-1 p-4 web:items-center">
      <View className="flex-1 ios:justify-between android:justify-between web:sm:w-96">
        <View>
          <TextInput
            className="mt-7"
            label="Dados (TSV)"
            mode="outlined"
            multiline
            numberOfLines={5}
            value={data}
            onChangeText={setData}
          />
        </View>
        <Button
          className="mt-7 web:self-end"
          mode="contained"
          onPress={handleImportClients}
        >
          Importar
        </Button>
      </View>
    </View>
  );
};
