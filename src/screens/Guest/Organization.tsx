import { View } from "react-native";
import { RootNavigatorScreenProps } from "../../../@types/navigation";
import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  Text,
} from "react-native-paper";

import { ServiceItem } from "../../components/ServiceItem";
import { useEffect, useState } from "react";
import { useMessageStore } from "../../store/message";
import { useServicesQueries } from "../../queries/guest/services";
import { useNavigation } from "@react-navigation/native";

import { Dialog as StyledDialog, StyledFlatList } from "../../libs/styled";
import { CustomTextInput } from "../../components/CustomTextInput";
import { useRefreshByUser } from "../../hooks/useRefreshByUser";
import { useOrganizationsQueries } from "../../queries/guest/organizations";
import { useLoadingAPI } from "../../contexts/loading";
import { isAxiosError } from "axios";

type Props = {
  route: RootNavigatorScreenProps<"Organization">["route"];
};

export const Organization = ({ route }: Props) => {
  const { id: organizationId } = route.params;

  const navigation =
    useNavigation<RootNavigatorScreenProps<"Organization">["navigation"]>();

  const { showLoading, hideLoading } = useLoadingAPI();

  const [registrationId, setRegistrationId] = useState<string>("");

  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);

  const closeModal = () => {
    setRegistrationId("");
    setVisible(false);
  };

  const [selectedServiceId, setSelectedServiceId] = useState<string>();

  const { useGetOrganization } = useOrganizationsQueries();

  const {
    error,
    data: organization,
    isSuccess,
    isLoading: isLoadingGetOrganization,
  } = useGetOrganization(organizationId);

  const { useGetServices, useEnterService } = useServicesQueries();

  const {
    data: services = [],
    refetch,
    isLoading: isLoadingGetServices,
  } = useGetServices({ organizationId, enabled: isSuccess });

  const { mutate: enterService } = useEnterService();

  const showMessage = useMessageStore((state) => state.show);

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const isLoading = isLoadingGetOrganization || isLoadingGetServices;

  const handleEnterQueue = () => {
    closeModal();
    showLoading();

    if (selectedServiceId) {
      const data = {
        organizationId,
        registrationId,
        serviceId: selectedServiceId,
      };

      enterService(data, {
        onSuccess: (data) => {
          navigation.navigate("Queue", {
            ...data,
            registrationId,
            serviceId: selectedServiceId,
          });

          if (data.position !== 0) {
            showMessage("Você entrou na fila");
          }
        },
        onSettled: hideLoading,
      });
    }
  };

  const handleSelectService = (id: string) => {
    setSelectedServiceId(id);
    openModal();
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: organization?.name,
    });
  }, [navigation, organization?.name]);

  if (isAxiosError(error) && error.response?.status === 400) {
    return (
      <View className="flex-1 p-4">
        <Text variant="displayMedium">Erro 404 😵</Text>
        <Text variant="bodyLarge">
          Não encontramos uma organização com esse ID
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <View className="flex-1">
        <StyledFlatList
          data={services}
          renderItem={({ item }: any) => (
            <ServiceItem
              guest
              item={item}
              enterOnQueue={() => handleSelectService(item.id)}
            />
          )}
          contentContainerStyle="p-4 web:w-full web:self-center web:max-w-screen-sm"
          onRefresh={refetchByUser}
          refreshing={isRefetchingByUser}
          keyExtractor={(item: any) => item.id}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </View>
      <Portal>
        <StyledDialog visible={visible} onDismiss={closeModal}>
          <Dialog.Title>Entrar na fila</Dialog.Title>
          <Dialog.Content>
            <CustomTextInput
              autoFocus
              label="Número de matrícula"
              value={registrationId}
              onChangeText={setRegistrationId}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeModal}>Cancelar</Button>
            <Button onPress={handleEnterQueue}>Entrar</Button>
          </Dialog.Actions>
        </StyledDialog>
      </Portal>
    </>
  );
};
