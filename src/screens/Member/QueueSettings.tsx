import { useEffect, useLayoutEffect, useState } from "react";

import { useGroupsQueries } from "../../queries/groups";

import { useOrganizerStore } from "../../store/organizer";
import { QueuesStackScreenProps } from "../../../@types/navigation";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import { Button } from "react-native-paper";
import { useQueuesQueries } from "../../queries/queues";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { CheckboxList } from "../../components/CheckboxList";
import { useServicesQueries } from "../../queries/services";

type Props = {
  route: QueuesStackScreenProps<"QueueSettings">["route"];
};

export const QueueSettings = ({ route }: Props) => {
  const navigation =
    useNavigation<QueuesStackScreenProps<"QueueSettings">["navigation"]>();

  const queueId = route.params?.queueId;

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetQueue } = useQueuesQueries();

  const { data: queue } = useGetQueue(queueId, currentOrganizationId);

  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);

  useEffect(() => {
    if (queue) {
      setSelectedGroupIds(queue.groups.map((group) => group.id));
    }
  }, [queue?.groups]);

  const { useGetServices } = useServicesQueries(currentOrganizationId);

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: queue?.name,
    });
  }, [navigation, queue]);

  return (
    <SafeAreaInsetsContainer>
      <View className="flex-1 p-4">
        <ScrollView className="flex-1">
          <CheckboxList
            title="Grupos"
            items={groups}
            value={selectedGroupIds}
            setValue={setSelectedGroupIds}
          />
        </ScrollView>
        <Button className="" mode="contained" onPress={handleUpdateQueue}>
          Salvar
        </Button>
      </View>
    </SafeAreaInsetsContainer>
  );
};
