import { VStack, Button, Text, Input, Toast } from "native-base";
import { useState } from "react";
import { useQueuesQueries } from "../../queries/queues";
import { RootNavigatorScreenProps } from "../../../@types/navigation";

type Props = {
  route: RootNavigatorScreenProps<"Atendimento">["route"];
};

export const Atendimento = ({ route }: Props) => {
  const { queueId } = route.params;

  const [registrationId, setRegistrationId] = useState<string>("");

  const { useGetQueue, useEnterQueue } = useQueuesQueries();

  const { data: queue } = useGetQueue(queueId);

  const { mutate: enterQueue } = useEnterQueue();

  const handleEnterQueue = () => {
    const data = {
      organizationId: queue.organizationId,
      registrationId,
      queueId,
    };
    enterQueue(data, {
      onSuccess: () => {
        Toast.show({
          duration: 3000,
          description: "Você entrou na fila",
        });
        navigation.navigate("Atendimentos", { queueId });
      },
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
