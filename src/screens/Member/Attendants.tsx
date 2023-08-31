import { FlatList, View } from "react-native";
import { AttendantItem } from "../../components/AttendantItem";
import { useAttendantsQueries } from "../../queries/attendants";
import { useOrganizerStore } from "../../store/organizer";

import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { OrganizationDrawerScreenProps } from "../../../@types/navigation";

export const Attendants = () => {
  const navigation =
    useNavigation<OrganizationDrawerScreenProps<"Attendants">["navigation"]>();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetAttendants, useRemoveAttendant, useAddAttendant } =
    useAttendantsQueries();

  const { data: attendants = [] } = useGetAttendants(currentOrganizationId);

  const { mutate: removeAttendant } = useRemoveAttendant();

  const { mutate: addAttendant } = useAddAttendant();

  const [email, setEmail] = useState<string>("");

  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);

  const closeModal = () => setVisible(false);

  const handleRemoveAttendant = (id: string) => {
    const payload = {
      attendantId: id,
      organizationId: currentOrganizationId,
    };
    removeAttendant(payload);
  };

  const handleAddAttendant = () => {
    const payload = {
      email,
      organizationId: currentOrganizationId,
    };

    addAttendant(payload);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button className="mx-2" onPress={openModal}>
          Adicionar
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <>
      <View className="flex-1">
        <FlatList
          data={attendants}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          ItemSeparatorComponent={() => <View className="h-3" />}
          renderItem={({ item }) => (
            <AttendantItem
              item={item}
              onPressRemove={() => handleRemoveAttendant(item.id)}
            />
          )}
        />
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={closeModal}>
          <Dialog.Title>Adicionar atendente</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label="E-mail"
              value={email}
              onChangeText={setEmail}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeModal}>Cancelar</Button>
            <Button onPress={handleAddAttendant}>Adicionar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
