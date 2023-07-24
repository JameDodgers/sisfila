import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, HStack, Checkbox, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { GroupProps } from "../../components/Group";

import { useDrawer } from "../../contexts/drawer";
import api from "../../services/api/config";

export const Queue = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const queueId = route.params?.queueId;

  const { organizationId } = useDrawer();

  const [selectedGroupIds, setSelectedGroupIds] = useState([]);

  const [groups, setGroups] = useState<GroupProps[]>([]);

  useEffect(() => {
    api
      .get(`v1/groups/organizations/${organizationId}`)
      .then(({ data }) => {
        setGroups(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleUpdateQueue = () => {
    const data = {
      groups: selectedGroupIds,
    };

    api
      .patch(`v1/queues/${queueId}/organizations/${organizationId}`, data)
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
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
        <Text>Grupos</Text>
        <Checkbox.Group value={selectedGroupIds} onChange={setSelectedGroupIds}>
          {groups.map((group) => (
            <Checkbox key={group.id} value={group.id}>
              <Text>{group.name}</Text>
            </Checkbox>
          ))}
        </Checkbox.Group>
        <Button onPress={handleUpdateQueue}>
          <Text>Salvar</Text>
        </Button>
      </VStack>
    </VStack>
  );
};
