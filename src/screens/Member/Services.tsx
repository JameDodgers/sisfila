import { FlatList, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Service, ServiceProps } from "../../components/Service";
import { useDrawer } from "../../contexts/drawer";
import api from "../../services/api";

export const Services = () => {
  const { organizationId } = useDrawer();
  const [services, setServices] = useState<ServiceProps[]>();

  useEffect(() => {
    const fetchServices = () => {
      api
        .get(`v1/services/organizations/${organizationId}`)
        .then(({ data }) => {
          console.log(data);
          setServices(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (organizationId) {
      fetchServices();
    }
  }, [organizationId]);

  return (
    <VStack>
      <FlatList
        _contentContainerStyle={{
          m: "4",
        }}
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return <Service item={item} />;
        }}
      />
    </VStack>
  );
};
