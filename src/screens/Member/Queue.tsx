import { Button, FlatList, Text, VStack } from "native-base";

import { ClientItem } from "../../components/ClientItem";
import { useOrganizationsQueries } from "../../queries/organizations";
import { useOrganizerStore } from "../../store/organizer";
import { QueuesStackScreenProps } from "../../../@types/navigation";

type Props = {
  route: QueuesStackScreenProps<"Queue">["route"];
};

export const Queue = ({ route }: Props) => {
  const queueId = route.params?.queueId;

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetQueue, useCallNext } = useOrganizationsQueries();

  const { data: queue } = useGetQueue(queueId, currentOrganizationId);

  console.log(queue?.clients.length);
  const { mutate: callNext } = useCallNext();

  const handleCallNext = () => {
    callNext({ organizationId: currentOrganizationId, queueId });
  };

  return (
    <VStack p={4} space={4}>
      <FlatList
        data={queue?.clients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          return <ClientItem item={item} index={index} />;
        }}
      />
      <Button onPress={handleCallNext}>
        <Text>Chamar próximo</Text>
      </Button>
    </VStack>
  );
};
