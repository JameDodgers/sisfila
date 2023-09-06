import { useEffect, useState } from "react";

import { useGroupsQueries } from "../../queries/groups";

import { useOrganizerStore } from "../../store/organizer";
import { QueuesStackScreenProps } from "../../../@types/navigation";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import { Button, Checkbox, List } from "react-native-paper";
import { useOrganizationQueuesQueries } from "../../queries/organizationQueues";

type Props = {
  route: QueuesStackScreenProps<"QueueSettings">["route"];
};

export const QueueSettings = ({ route }: Props) => {
  const navigation =
    useNavigation<QueuesStackScreenProps<"QueueSettings">["navigation"]>();

  const queueId = route.params?.queueId;

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetQueue } = useOrganizationQueuesQueries();

  const { data: queue } = useGetQueue(queueId, currentOrganizationId);

  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);

  useEffect(() => {
    if (queue) {
      setSelectedGroupIds(queue.groups.map((group) => group.id));
    }
  }, [queue?.groups]);

  const toggleGroupId = (id: string) =>
    setSelectedGroupIds((selectedGroupIds) =>
      selectedGroupIds.includes(id)
        ? selectedGroupIds.filter((i) => i !== id)
        : [...selectedGroupIds, id]
    );

  const { useGetGroups } = useGroupsQueries();

  const { data: groups = [] } = useGetGroups(currentOrganizationId);

  const { useAttachGroupsToQueue } = useOrganizationQueuesQueries();

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
    <View className="flex-1 p-4">
      <ScrollView className="flex-1">
        <List.AccordionGroup>
          <List.Accordion title="Grupos" id="groups">
            {groups.map((group) => (
              <Checkbox.Item
                mode="android"
                key={group.id}
                label={group.name}
                status={
                  selectedGroupIds.includes(group.id) ? "checked" : "unchecked"
                }
                onPress={() => toggleGroupId(group.id)}
              />
            ))}
          </List.Accordion>
        </List.AccordionGroup>
      </ScrollView>
      <Button className="" mode="contained" onPress={handleUpdateQueue}>
        Salvar
      </Button>
    </View>
  );
};
