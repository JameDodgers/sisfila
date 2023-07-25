import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, HStack, Checkbox, Text, VStack } from "native-base";
import { useState } from "react";

import { useDrawer } from "../../contexts/drawer";

import { useGroupsQueries } from "../../queries/groups";
import { useQueuesQueries } from "../../queries/queues";

export const Queue = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const queueId = route.params?.queueId;

  const { organizationId } = useDrawer();

  const [selectedGroupIds, setSelectedGroupIds] = useState([]);

  const { useGetGroups } = useGroupsQueries();

  const { data: groups = [] } = useGetGroups(organizationId);

  const { useAttachGroupsToQueue } = useQueuesQueries();

  const { mutate: attachGroupsToQueue } = useAttachGroupsToQueue();

  const handleUpdateQueue = () => {
    const data = {
      queueId,
      organizationId,
      groups: selectedGroupIds,
    };

    attachGroupsToQueue(data, {
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
