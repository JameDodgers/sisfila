import { ClientItem } from "../../components/ClientItem";
import { useOrganizerStore } from "../../store/organizer";
import { QueuesStackScreenProps } from "../../../@types/navigation";

import { Button } from "react-native-paper";
import { View, FlatList } from "react-native";
import { useOrganizationQueuesQueries } from "../../queries/organizationQueues";

type Props = {
  route: QueuesStackScreenProps<"Queue">["route"];
};

export const Queue = ({ route }: Props) => {
  const queueId = route.params?.queueId;

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetQueue, useCallNext } = useOrganizationQueuesQueries();

  const { data: queue } = useGetQueue(queueId, currentOrganizationId);

  const { mutate: callNext } = useCallNext();

  const handleCallNext = () => {
    callNext({ organizationId: currentOrganizationId, queueId });
  };

  return (
    <View className="flex-1 p-4 gap-4 justify-between">
      <FlatList
        data={queue?.clients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          return <ClientItem item={item} index={index} />;
        }}
      />
      <Button mode="contained" onPress={handleCallNext}>
        Chamar próximo
      </Button>
    </View>
  );
};
