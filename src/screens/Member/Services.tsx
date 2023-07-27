import { FlatList, VStack } from "native-base";

import { ServiceItem } from "../../components/ServiceItem";
import { useDrawer } from "../../contexts/drawer";
import { useServicesQueries } from "../../queries/services";

export const Services = () => {
  const { organizationId } = useDrawer();

  const { useGetServices } = useServicesQueries();

  const { data: services = [] } = useGetServices(organizationId);

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
