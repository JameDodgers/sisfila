import { useState } from "react";

import { useGroupsQueries } from "../../queries/groups";
import { useOrganizationsQueries } from "../../queries/organizations";
import { useOrganizerStore } from "../../store/organizer";
import { QueuesStackScreenProps } from "../../../@types/navigation";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import { Button, Checkbox, Text } from "react-native-paper";

type Props = {
  route: QueuesStackScreenProps<"QueueSettings">["route"];
};

export const QueueSettings = ({ route }: Props) => {
  const navigation =
    useNavigation<QueuesStackScreenProps<"QueueSettings">["navigation"]>();

  const queueId = route.params?.queueId;

  const { currentOrganizationId = "" } = useOrganizerStore();

  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);

  const toggleGroupId = (id: string) =>
    setSelectedGroupIds((selectedGroupIds) =>
      selectedGroupIds.includes(id)
        ? selectedGroupIds.filter((i) => i !== id)
        : [...selectedGroupIds, id]
    );

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
    <View className="flex-1 p-4">
      <ScrollView className="flex-1 gap-y-4">
        <Text>Grupos</Text>
        <View>
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
        </View>
      </ScrollView>
      <Button className="" mode="contained" onPress={handleUpdateQueue}>
        Salvar
      </Button>
    </View>
  );
};
