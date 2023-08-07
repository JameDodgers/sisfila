import { Button, Checkbox, Text, VStack } from "native-base";
import { useState } from "react";

import { useGroupsQueries } from "../../queries/groups";
import { useOrganizationsQueries } from "../../queries/organizations";
import { useOrganizerStore } from "../../store/organizer";
import { QueuesStackScreenProps } from "../../../@types/navigation";
import { useNavigation } from "@react-navigation/native";

type Props = {
  route: QueuesStackScreenProps<"QueueSettings">["route"];
};

export const QueueSettings = ({ route }: Props) => {
  const navigation =
    useNavigation<QueuesStackScreenProps<"QueueSettings">["navigation"]>();

  const queueId = route.params?.queueId;

  const { currentOrganizationId = "" } = useOrganizerStore();

  const [selectedGroupIds, setSelectedGroupIds] = useState([]);

  const { useGetGroups } = useGroupsQueries();

  const { data: groups = [] } = useGetGroups(currentOrganizationId);

  const { useAttachGroupsToQueue } = useOrganizationsQueries();

  const { mutate: attachGroupsToQueue } = useAttachGroupsToQueue();

  const handleUpdateQueue = () => {
    const data = {
      queueId,
      organizationId: currentOrganizationId,
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
