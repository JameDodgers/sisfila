import { useNavigation, useRoute } from "@react-navigation/native";
import { VStack, Button, Text, Input, Toast, FlatList } from "native-base";
import { useEffect, useState } from "react";
import { QueueProps } from "../components/Queue";
import api from "../services/api/api";

export const Atendimento = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { queueId } = route.params;

  const [registrationId, setRegistrationId] = useState<string>("");
  const [queue, setQueue] = useState<QueueProps>({} as QueueProps);

  useEffect(() => {
    api
      .get(`v1/queues/${queueId}`)
      .then(({ data }) => {
        setQueue(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleEnterQueue = () => {
    const data = {
      organizationId: queue.organizationId,
      registrationId,
      queueId,
    };

    api
      .patch("v1/queues/enter", data)
      .then(() => {
        Toast.show({
          duration: 3000,
          description: "Você entrou na fila",
        });
        navigation.navigate("Atendimentos", { queueId });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <VStack flex={1} p={3} alignItems="center">
      <VStack
        _web={{
          w: "50%",
        }}
        w="100%"
        space={4}
      >
        <Input
          placeholder="Número de matrícula"
          value={registrationId}
          onChangeText={setRegistrationId}
        />
        <Button disabled={!registrationId} onPress={handleEnterQueue}>
          <Text color="white">Entrar na fila</Text>
        </Button>
      </VStack>
    </VStack>
  );
};
