import { useNavigation } from "@react-navigation/native";
import { FlatList, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Queue, QueueProps } from "../../components/Queue";
import { useDrawer } from "../../contexts/drawer";
import api from "../../services/api/config";

export const Queues = () => {
  const navigation = useNavigation();
  const { organizationId } = useDrawer();
  const [queues, setQueues] = useState<QueueProps[]>();

  useEffect(() => {
    const fetchQueues = () => {
      api
        .get(`v1/queues/organizations/${organizationId}`)
        .then(({ data }) => {
          setQueues(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (organizationId) {
      fetchQueues();
    }
  }, [organizationId]);

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
          return <Queue item={item} onPress={() => handleOpenQueue(item.id)} />;
        }}
      />
    </VStack>
  );
};
