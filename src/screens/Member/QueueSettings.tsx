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
import { RadioButtonList } from "../../components/RadioButtonList";

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

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    queue?.serviceId || ""
  );

  const { useGetServices } = useServicesQueries(currentOrganizationId);

  const { data: services = [] } = useGetServices();

  const radioButtonsListItems = services.map(({ id, name }) => ({
    key: id,
    label: name,
  }));

  useEffect(() => {
    if (queue) {
      setSelectedServiceId(queue.serviceId);
    }
  }, [queue?.serviceId]);

  const { useGetGroups } = useGroupsQueries(currentOrganizationId);

  const { data: groups = [] } = useGetGroups();

  useEffect(() => {
    if (queue) {
      setSelectedGroupIds(queue.groups.map((group) => group.id));
    }
  }, [queue?.groups]);

  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);

  const { useAttachGroupsToQueue } = useQueuesQueries();

  const { mutate: attachGroupsToQueue } = useAttachGroupsToQueue();

  const handleUpdateQueue = () => {
    const data = {
      queueId,
      organizationId: currentOrganizationId,
      groups: selectedGroupIds,
      serviceId: selectedServiceId,
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
          <RadioButtonList
            title="Serviços"
            items={radioButtonsListItems}
            value={selectedServiceId}
            setValue={setSelectedServiceId}
          />
          <CheckboxList
            title="Grupos"
            items={groups}
            value={selectedGroupIds}
            setValue={setSelectedGroupIds}
          />
        </ScrollView>
        <Button mode="contained" onPress={handleUpdateQueue}>
          Salvar
        </Button>
      </View>
    </SafeAreaInsetsContainer>
  );
};
