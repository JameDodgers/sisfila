import { VStack, Text, Button, Input, Select, CheckIcon } from "native-base";
import { useEffect, useState } from "react";

import { useDrawer } from "../../contexts/drawer";

import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import { GroupProps } from "../../components/Group";

export const ImportClients = () => {
  const navigation = useNavigation();

  const { organizationId } = useDrawer();

  const [data, setData] = useState("");

  const [groups, setGroups] = useState<GroupProps[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>();

  useEffect(() => {
    api
      .get(`v1/groups/organizations/${organizationId}`)
      .then(({ data }) => {
        console.log(data);
        setGroups(data);
        setSelectedGroupId(data[0].id);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleImportClients = () => {
    const line = data.split("\n");
    let clients = [];

    for (let i = 0; i < line.length; i++) {
      const client = line[i].split("\t");

      clients.push({
        name: client[1],
        registrationId: client[0],
        organizationId,
      });
    }

    api
      .post("v1/groups/import", {
        clients,
        organizationId,
        groupId: selectedGroupId,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
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
            <Select.Item label={group.name} value={group.id} />
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
