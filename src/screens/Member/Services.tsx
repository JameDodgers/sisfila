import { ServiceItem } from "../../components/ServiceItem";

import { useServicesQueries } from "../../queries/services";

import { useLayoutEffect } from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useOrganizerStore } from "../../store/organizer";

import { View } from "react-native";
import { CustomFlatList } from "../../libs/styled";
import { CustomNavigationBar } from "../../components/CustomNavigationBar";
import { ServicesStackScreenProps } from "../../../@types/navigation";

export const Services = () => {
  const navigation =
    useNavigation<ServicesStackScreenProps<"Services">["navigation"]>();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetServices, useDeleteService } = useServicesQueries(
    currentOrganizationId
  );

  const { data: services = [] } = useGetServices();

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

  return (
    <View className="flex-1">
      <CustomFlatList
        data={services}
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
  );
};
