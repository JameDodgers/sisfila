import { VStack, Text, Button, Input, Select, CheckIcon } from "native-base";
import { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { useGroupsQueries } from "../../queries/groups";
import { useOrganizerStore } from "../../store/organizer";

export const ImportClients = () => {
  const navigation = useNavigation();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const [data, setData] = useState("");

  const { useGetGroups, useImportClients } = useGroupsQueries();

  const { data: groups = [] } = useGetGroups(currentOrganizationId);

  const { mutate: importClients } = useImportClients();

  const [selectedGroupId, setSelectedGroupId] = useState<string>();

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
    <VStack flex={1} p={3} alignItems="center">
      <VStack
        _web={{
          w: "50%",
        }}
        w="100%"
        space={4}
      >
        <Select
          selectedValue={selectedGroupId}
          accessibilityLabel="Escolha um grupo"
          placeholder="Escolha um grupo"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(id) => setSelectedGroupId(id)}
        >
          {groups.map((group) => (
            <Select.Item key={group.id} label={group.name} value={group.id} />
          ))}
        </Select>

        <Input
          multiline
          numberOfLines={5}
          value={data}
          onChangeText={setData}
        />
        <Button onPress={handleImportClients}>
          <Text>Importar</Text>
        </Button>
      </VStack>
    </VStack>
  );
};
