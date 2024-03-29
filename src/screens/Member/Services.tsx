import { useCallback, useLayoutEffect } from "react";
import { View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Appbar, ActivityIndicator } from "react-native-paper";

import { ServicesStackScreenProps } from "../../../@types/navigation";
import { CustomNavigationBar } from "../../components/CustomNavigationBar";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { ServiceItem } from "../../components/ServiceItem";
import { StyledFlatList } from "../../libs/styled";
import { useServicesQueries } from "../../queries/services";
import { useOrganizerStore } from "../../store/organizer";

export const Services = () => {
  const navigation =
    useNavigation<ServicesStackScreenProps<"Services">["navigation"]>();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetServices, useDeleteService } = useServicesQueries(
    currentOrganizationId
  );

  const { data: services = [], isLoading: isLoadingServices } =
    useGetServices();

  const { mutate: deleteService } = useDeleteService();

  const handleOpenServiceSettings = (serviceId: string) => {
    navigation.navigate("CreateOrUpdateService", {
      serviceId,
    });
  };

  const handleDeleteService = (serviceId: string) => {
    deleteService(serviceId);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: (props) => (
        <CustomNavigationBar
          headerRight={
            <Appbar.Action
              accessibilityLabel="Adicionar"
              accessibilityHint="Adicionar serviço"
              icon="plus"
              onPress={() => {
                navigation.navigate("CreateOrUpdateService");
              }}
            />
          }
          {...props}
        />
      ),
    });
  }, [navigation]);

  const ListEmptyComponent = useCallback(() => {
    if (isLoadingServices) {
      return (
        <View className="items-center">
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return null;
  }, [isLoadingServices]);

  return (
    <SafeAreaInsetsContainer>
      <View className="flex-1">
        <StyledFlatList
          data={services}
          ListEmptyComponent={ListEmptyComponent}
          contentContainerStyle="p-4 web:w-full web:self-center web:max-w-screen-sm"
          renderItem={({ item }: any) => (
            <ServiceItem
              item={item}
              openServiceSettings={() => handleOpenServiceSettings(item.id)}
              deleteService={() => handleDeleteService(item.id)}
            />
          )}
          keyExtractor={(item: any) => item.id.toString()}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </View>
    </SafeAreaInsetsContainer>
  );
};
