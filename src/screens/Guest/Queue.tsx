import { useQueuesQueries } from "../../queries/guest/queues";
import { RootNavigatorScreenProps } from "../../../@types/navigation";
import { Text } from "react-native-paper";
import { View } from "react-native";
import { FlatList } from "react-native";
import { ClientItem } from "../../components/ClientItem";

type Props = {
  route: RootNavigatorScreenProps<"Queue">["route"];
};

export const Queue = ({ route }: Props) => {
  const { queueId } = route.params;

  const { useGetQueue } = useQueuesQueries();

  const { data: queue } = useGetQueue(queueId);

  return (
    <View className="flex-1 p-4">
      <Text variant="headlineLarge">{queue?.name}</Text>
      <Text variant="labelLarge">{queue?.description}</Text>
      <View className="mt-8 mb-4">
        <Text variant="labelLarge">Em atendimento</Text>
        {queue?.lastClientCalled && (
          <View>
            <ClientItem item={queue?.lastClientCalled} index={0} />
          </View>
        )}
      </View>
      <View>
        <Text variant="labelLarge">Aguardando</Text>
        <FlatList
          data={queue?.clients}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ClientItem key={index} item={item} index={index} />
          )}
        />
      </View>
    </View>
  );
};
