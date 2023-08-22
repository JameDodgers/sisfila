import { ServiceItem } from "../../components/ServiceItem";

import { useServicesQueries } from "../../queries/services";

import { useLayoutEffect } from "react";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useOrganizerStore } from "../../store/organizer";
import { ServicesStackNavigationProp } from "../../../@types/navigation";
import { View } from "react-native";
import { FlatList } from "../../libs/styled";

export const Services = () => {
  const navigation = useNavigation<ServicesStackNavigationProp<"Services">>();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetServices } = useServicesQueries();

  const { data: services = [] } = useGetServices(currentOrganizationId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="plus"
          onPress={() => {
            navigation.navigate("CreateService");
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View className="flex-1 p-4">
      <FlatList
        data={services}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => <ServiceItem item={item} />}
      />
    </View>
  );
};
