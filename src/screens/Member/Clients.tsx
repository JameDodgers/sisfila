import { ScrollView, VStack } from "native-base";

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { DataTable } from "react-native-paper";
import { Button, IconButton } from "react-native-paper";

import api from "../../services/api/config";
import { useDrawer } from "../../contexts/drawer";
import { ClientProps } from "../../components/Client";

export const Clients = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { organizationId } = useDrawer();

  const [clients, setClients] = useState<ClientProps[]>([]);

  useEffect(() => {
    const clients = route.params?.clients;
    if (clients) {
      setClients(clients);
    }
  }, [route.params?.clients]);

  useFocusEffect(
    useCallback(() => {
      const fetchClients = () => {
        api
          .get(`v1/clients/organizations/${organizationId}`)
          .then(({ data }) => {
            setClients(data);
          })
          .catch((e) => {
            console.log(e);
          });
      };
      fetchClients();
    }, [organizationId])
  );

  const handleImport = () => {
    navigation.navigate("ImportClients");
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={handleImport}>Importar</Button>,
    });
  }, [navigation]);

  const handleDeleteClient = (clientId: string) => {
    api
      .delete(`v1/clients/${clientId}/organizations/${organizationId}`)
      .then(() => {
        setClients((clients) =>
          clients.filter((client) => client.id !== clientId)
        );
      });
  };

  return (
    <VStack flex={1}>
      {clients.length > 0 && (
        <DataTable
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <ScrollView>
            <DataTable.Header>
              <DataTable.Title>Nome</DataTable.Title>
              <DataTable.Title>Matrícula</DataTable.Title>
            </DataTable.Header>
            {clients.map((client: any) => {
              return (
                <DataTable.Row>
                  <DataTable.Cell>{client.name}</DataTable.Cell>
                  <DataTable.Cell>{client.registrationId}</DataTable.Cell>
                  <DataTable.Cell>
                    <IconButton
                      icon="delete"
                      onPress={() => handleDeleteClient(client.id)}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </ScrollView>
        </DataTable>
      )}
    </VStack>
  );
};
