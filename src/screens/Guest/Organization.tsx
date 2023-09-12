import { FlatList, View } from "react-native";
import { RootNavigatorScreenProps } from "../../../@types/navigation";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { useOrganizationsQueries } from "../../queries/guest/organizations";

import { ServiceItem } from "../../components/ServiceItem";
import { useLayoutEffect, useState } from "react";
import { useMessageStore } from "../../store/message";
import { useServicesQueries } from "../../queries/guest/services";
import { useNavigation } from "@react-navigation/native";

type Props = {
  route: RootNavigatorScreenProps<"Organization">["route"];
};

export const Organization = ({ route }: Props) => {
  const navigation =
    useNavigation<RootNavigatorScreenProps<"Organization">["navigation"]>();

  const { id: organizationId } = route.params;

  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);

  const closeModal = () => setVisible(false);

  const [registrationId, setRegistrationId] = useState<string>("");

  const [selectedServiceId, setSelectedServiceId] = useState<string>();

  const { useEnterService } = useServicesQueries();

  const { useGetOrganization, useGetServices } = useOrganizationsQueries();

  const { data: organization } = useGetOrganization(organizationId);

  const { data: services = [] } = useGetServices(organizationId);

  const { mutate: enterService } = useEnterService();

  const showMessage = useMessageStore((state) => state.show);

  const handleEnterQueue = () => {
    if (selectedServiceId) {
      const data = {
        organizationId,
        registrationId,
        serviceId: selectedServiceId,
      };

      enterService(data, {
        onSuccess: () => {
          showMessage("Você entrou na fila");
        },
      });
    }
  };

  const handleSelectService = (id: string) => {
    setSelectedServiceId(id);
    openModal();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: organization?.name,
    });
  }, [navigation, organization]);

  return (
    <>
      <View className="flex-1">
        <FlatList
          data={services}
          renderItem={({ item }) => (
            <ServiceItem
              guest
              item={item}
              enterOnQueue={() => handleSelectService(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="h-3" />}
          contentContainerStyle={{ padding: 16 }}
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
