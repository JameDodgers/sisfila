import { FlatList, VStack } from "native-base";

import { ServiceItem } from "../../components/ServiceItem";
import { useDrawer } from "../../contexts/drawer";
import { useServicesQueries } from "../../queries/services";

import { useEffect, useLayoutEffect } from "react";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export const Services = () => {
  const navigation = useNavigation();
  const { organizationId } = useDrawer();

  const { useGetServices } = useServicesQueries();

  const { data: services = [] } = useGetServices(organizationId);

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
    <VStack>
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
    </VStack>
  );
};
