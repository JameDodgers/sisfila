import { useOrganizationsQueries } from "../../queries/organizations";
import { QueueItem } from "../../components/QueueItem";
import { useLayoutEffect } from "react";
import { IconButton } from "react-native-paper";
import { useOrganizerStore } from "../../store/organizer";
import { QueuesStackScreenProps } from "../../../@types/navigation";
import { useNavigation } from "@react-navigation/native";
import { FlatList, View } from "react-native";

export const Queues = () => {
  const navigation =
    useNavigation<QueuesStackScreenProps<"Queues">["navigation"]>();

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

  const handleOpenQueueSettings = (queueId: string) => {
    navigation.navigate("QueueSettings", {
      queueId,
    });
  };

  return (
    <View className="flex-1 p-4">
      <FlatList
        className="overflow-visible"
        data={queues}
        keyExtractor={(item: any) => item.id.toString()}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }: any) => (
          <QueueItem
            item={item}
            openQueue={() => handleOpenQueue(item.id)}
            openSettings={() => handleOpenQueueSettings(item.id)}
          />
        )}
      />
    </View>
  );
};
