import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, VStack } from "native-base";
import { useEffect, useState } from "react";
import { QueueProps } from "../components/Queue";
import api from "../services/api/api";
import { Atendimento } from "../components/Atendimento";

export const Atendimentos = () => {
  const route = useRoute();

  useEffect(() => {
    const queueId = route.params?.queueId;
    if (queueId) {
      api
        .get(`v1/queues/${queueId}`)
        .then(({ data }) => {
          setAtendimentos([data]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [route.params?.queueId]);

  const navigation = useNavigation();

  const [atendimentos, setAtendimentos] = useState<QueueProps[]>([]);

  return (
    <VStack>
      <FlatList
        _contentContainerStyle={{
          m: "4",
        }}
        data={atendimentos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return <Atendimento item={item} />;
        }}
      />
    </VStack>
  );
};
