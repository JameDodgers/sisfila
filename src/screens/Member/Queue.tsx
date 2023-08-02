import { useRoute } from "@react-navigation/native";
import { Button, FlatList, Text, VStack } from "native-base";

import { useDrawer } from "../../contexts/drawer";

import { ClientItem } from "../../components/ClientItem";
import { useOrganizationsQueries } from "../../queries/organizations";

export const Queue = () => {
  const route = useRoute();
  const queueId = route.params?.queueId;

  const { organizationId } = useDrawer();

  const { useGetQueue, useCallNext } = useOrganizationsQueries();

  const { data: queue } = useGetQueue(queueId, organizationId);

  const { mutate: callNext } = useCallNext();

  const handleCallNext = () => {
    callNext({ organizationId, queueId });
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
