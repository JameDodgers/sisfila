import { useRoute, useNavigation } from "@react-navigation/native";
import { Button, VStack } from "native-base";
import { useEffect, useLayoutEffect, useState } from "react";
import api from "../../services/axios";

type RouteParams = {
  id: number;
};

import { OrganizationProps } from "../../types/Organization";

export const Organization = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { id } = route.params as RouteParams;

  const [organization, setOrganization] = useState<OrganizationProps>(
    {} as OrganizationProps
  );

  useLayoutEffect(() => {
    if (organization) {
      navigation.setOptions({
        title: organization.name,
      });
    }
  }, [navigation, organization]);

  useEffect(() => {
    const fetchAtendimentos = async () => {
      try {
        const { data } = await api.get(`organizations/${id}`);
        setOrganization(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAtendimentos();
  }, []);

  return (
    <VStack flex={1} p={4}>
      <VStack flex={1}></VStack>
      <Button>Entrar na fila</Button>
    </VStack>
  );
};
