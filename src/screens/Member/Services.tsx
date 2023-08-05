import { FlatList, VStack } from "native-base";

import { ServiceItem } from "../../components/ServiceItem";

import { useServicesQueries } from "../../queries/services";

import { useEffect, useLayoutEffect } from "react";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useOrganizerStore } from "../../store/organizer";

export const Services = () => {
  const navigation = useNavigation();

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
    <Center>
      <FlatList
        _contentContainerStyle={{
          m: "4",
        }}
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return <ServiceItem item={item} />;
        }}
      />
    </Center>
  );
};
