import { FlatList, VStack } from "native-base";

import { useOrganizationsQueries } from "../../queries/organizations";
import { QueueItem } from "../../components/QueueItem";
import { useEffect, useLayoutEffect } from "react";
import { useLayoutEffect } from "react";
import { IconButton } from "react-native-paper";
import { useOrganizerStore } from "../../store/organizer";
import { QueuesStackScreenProps } from "../../../@types/navigation";

export const Queues = ({ navigation }: QueuesStackScreenProps<"Queues">) => {
  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetOrganizationQueues } = useOrganizationsQueries();

  const { data: queues = [] } = useGetOrganizationQueues(currentOrganizationId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="plus"
          onPress={() => {
            navigation.navigate("CreateQueue");
          }}
        />
      ),
    });
  }, [navigation]);

  const handleOpenQueue = (queueId: string) => {
    navigation.navigate("Queue", {
      queueId,
    });
  };

  return (
    <VStack>
      <FlatList
        _contentContainerStyle={{
          m: "4",
        }}
        data={queues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <QueueItem item={item} onPress={() => handleOpenQueue(item.id)} />
          );
        }}
      />
    </VStack>
  );
};
