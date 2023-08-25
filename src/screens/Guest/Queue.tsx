import { useState } from "react";
import { useQueuesQueries } from "../../queries/guestQueues";
import { RootNavigatorScreenProps } from "../../../@types/navigation";
import {
  FAB,
  Button,
  Text,
  TextInput,
  Portal,
  Dialog,
} from "react-native-paper";
import { View } from "react-native";
import { FlatList } from "react-native";
import { ClientItem } from "../../components/ClientItem";

type Props = {
  route: RootNavigatorScreenProps<"Queue">["route"];
};

export const Queue = ({ route }: Props) => {
  const { queueId } = route.params;

  const [visible, setVisible] = useState(false);

  const [registrationId, setRegistrationId] = useState<string>("");

  const { useGetQueue, useEnterQueue } = useQueuesQueries();

  const { data: queue } = useGetQueue(queueId);

  const { mutate: enterQueue } = useEnterQueue();

  const openModal = () => setVisible(true);

  const closeModal = () => setVisible(false);

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
      },
    });
  };

  return (
    <>
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
        <FAB
          className="absolute bottom-4 right-4"
          icon="arrow-left-bottom"
          size="medium"
          onPress={openModal}
        />
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={closeModal}>
          <Dialog.Title>Entrar na fila</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label="Número de matrícula"
              value={registrationId}
              onChangeText={setRegistrationId}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeModal}>Cancelar</Button>
            <Button onPress={handleEnterQueue}>Entrar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
