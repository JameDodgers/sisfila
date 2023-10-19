import { ServiceItem } from "../../components/ServiceItem";

import { useServicesQueries } from "../../queries/services";

import { useCallback, useLayoutEffect } from "react";
import { Appbar, ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useOrganizerStore } from "../../store/organizer";

import { View } from "react-native";
import { StyledFlatList } from "../../libs/styled";
import { CustomNavigationBar } from "../../components/CustomNavigationBar";
import { ServicesStackScreenProps } from "../../../@types/navigation";
import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";

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
