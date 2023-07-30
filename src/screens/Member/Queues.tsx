import { useNavigation } from "@react-navigation/native";
import { FlatList, VStack } from "native-base";

import { useDrawer } from "../../contexts/drawer";

import { useOrganizationsQueries } from "../../queries/organizations";
import { QueueItem } from "../../components/QueueItem";
import { useEffect, useLayoutEffect } from "react";
import { IconButton } from "react-native-paper";

export const Queues = () => {
  const navigation = useNavigation();
  const { organizationId } = useDrawer();

  const { useGetOrganizationQueues } = useOrganizationsQueries();

  const { data: queues = [] } = useGetOrganizationQueues(organizationId);

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
