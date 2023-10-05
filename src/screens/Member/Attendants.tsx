import { View } from "react-native";
import { AttendantItem } from "../../components/AttendantItem";
import { useAttendantsQueries } from "../../queries/attendants";
import { useOrganizerStore } from "../../store/organizer";

import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Dialog, Portal } from "react-native-paper";
import { OrganizationDrawerScreenProps } from "../../../@types/navigation";
import { CustomNavigationBar } from "../../components/CustomNavigationBar";
import { Dialog as StyledDialog, StyledFlatList } from "../../libs/styled";
import { CustomTextInput } from "../../components/CustomTextInput";

import { useMessageStore } from "../../store/message";
import { Role } from "../../models/User";

export const Attendants = () => {
  const navigation =
    useNavigation<OrganizationDrawerScreenProps<"Attendants">["navigation"]>();

  const showMessage = useMessageStore((state) => state.show);

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
      userEmail: email,
      organizationId: currentOrganizationId,
      role: "TYPE_ATTENDENT" as Role,
    };

    addAttendant(payload, {
      onSuccess: () => {
        showMessage(`Um convite foi enviado para ${email}`);
      },
    });
  };

  useEffect(() => {
    navigation.setOptions({
      header: (props) => (
        <CustomNavigationBar
          headerRight={
            <Button className="mx-2" onPress={openModal}>
              Adicionar
            </Button>
          }
          {...props}
        />
      ),
    });
  }, [navigation]);

  return (
    <>
      <View className="flex-1">
        <StyledFlatList
          data={attendants}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle="p-4 web:w-full web:self-center web:max-w-screen-sm"
          ItemSeparatorComponent={() => <View className="h-3" />}
          renderItem={({ item }: any) => (
            <AttendantItem
              item={item}
              onPressRemove={() => handleRemoveAttendant(item.id)}
            />
          )}
        />
      </View>
      <Portal>
        <StyledDialog visible={visible} onDismiss={closeModal}>
          <Dialog.Title>Adicionar atendente</Dialog.Title>
          <Dialog.Content>
            <CustomTextInput
              label="E-mail"
              value={email}
              onChangeText={setEmail}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeModal}>Cancelar</Button>
            <Button onPress={handleAddAttendant}>Adicionar</Button>
          </Dialog.Actions>
        </StyledDialog>
      </Portal>
    </>
  );
};
