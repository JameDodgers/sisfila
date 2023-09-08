import { QueueItem } from "../../components/QueueItem";
import { useLayoutEffect } from "react";
import { Appbar } from "react-native-paper";
import { useOrganizerStore } from "../../store/organizer";
import { QueuesStackScreenProps } from "../../../@types/navigation";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { FlatList } from "../../libs/styled";
import { useOrganizationQueuesQueries } from "../../queries/organizationQueues";
import { CustomNavigationBar } from "../../components/CustomNavigationBar";

export const Queues = () => {
  const navigation =
    useNavigation<QueuesStackScreenProps<"Queues">["navigation"]>();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetQueues } = useOrganizationQueuesQueries();

  const { data: queues = [] } = useGetQueues(currentOrganizationId);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: (props) => (
        <CustomNavigationBar
          headerRight={
            <Appbar.Action
              icon="plus"
              onPress={() => {
                navigation.navigate("CreateQueue");
              }}
            />
          }
          {...props}
        />
      ),
    });
  }, [navigation]);

  const handleOpenQueueSettings = (queueId: string) => {
    navigation.navigate("QueueSettings", {
      queueId,
    });
  };

  return (
    <View className="flex-1 web:items-center">
      <FlatList
        className="web:sm:w-[640]"
        contentContainerStyle="p-4"
        data={queues}
        keyExtractor={(item: any) => item.id.toString()}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }: any) => (
          <QueueItem
            item={item}
            openSettings={() => handleOpenQueueSettings(item.id)}
          />
        )}
      />
    </View>
  );
};
