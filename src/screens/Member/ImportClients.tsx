import { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { useGroupsQueries } from "../../queries/groups";
import { useOrganizerStore } from "../../store/organizer";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Picker } from "../../components/Picker";

export const ImportClients = () => {
  const navigation = useNavigation();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const [data, setData] = useState("");

  const { useGetGroups, useImportClients } = useGroupsQueries();

  const { data: groups = [] } = useGetGroups(currentOrganizationId);

  const { mutate: importClients } = useImportClients();

  const [selectedGroupId, setSelectedGroupId] = useState<string>("");

  const [openGroupPicker, setOpenGroupPicker] = useState(false);
  const [groupPickerItems, setGroupPickerItems] = useState(
    groups.map((group) => ({ value: group.id, label: group.name }))
  );

  useEffect(() => {
    if (groups[0]) {
      setSelectedGroupId(groups[0].id);
    }
  }, [groups]);

  const handleImportClients = () => {
    if (!selectedGroupId) {
      return;
    }

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
      groupId: selectedGroupId,
    };

    importClients(payload, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  return (
    <View className="flex-1 p-4">
      <View className="flex-1 g-4">
        <Picker
          placeholder="Selecione um grupo"
          open={openGroupPicker}
          value={selectedGroupId}
          items={groupPickerItems}
          setOpen={setOpenGroupPicker}
          setValue={setSelectedGroupId}
          setItems={setGroupPickerItems}
        />
        <TextInput
          label="Dados (TSV)"
          mode="outlined"
          multiline
          numberOfLines={5}
          value={data}
          onChangeText={setData}
        />
      </View>
      <Button mode="contained" onPress={handleImportClients}>
        Importar
      </Button>
    </View>
  );
};
