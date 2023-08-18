import { useOrganizationsQueries } from "../../queries/organizations";
import { QueueItem } from "../../components/QueueItem";
import { useLayoutEffect } from "react";
import { IconButton } from "react-native-paper";
import { useOrganizerStore } from "../../store/organizer";
import { QueuesStackScreenProps } from "../../../@types/navigation";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "../../libs/styled";
import { View } from "react-native";

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

  return (
    <View className="flex-1 p-4">
      <FlatList
        contentContainerStyle="g-3"
        data={queues}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <QueueItem item={item} onPress={() => handleOpenQueue(item.id)} />
        )}
      />
    </View>
  );
};
