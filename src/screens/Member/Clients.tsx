import { ScrollView, VStack } from "native-base";

import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { DataTable } from "react-native-paper";
import { Button, IconButton } from "react-native-paper";

import { useClientsQueries } from "../../queries/clients";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import { useOrganizerStore } from "../../store/organizer";

export const Clients = () => {
  const navigation = useNavigation();

  const { useGetOrganizationClients, useRemoveClient } = useClientsQueries();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { data: clients = [], refetch } = useGetOrganizationClients(
    currentOrganizationId
  );

  const { mutate: removeClient } = useRemoveClient();

  useRefreshOnFocus(refetch);

  const handleImport = () => {
    navigation.navigate("ImportClients");
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={handleImport}>Importar</Button>,
    });
  }, [navigation]);

  const handleDeleteClient = (clientId: string) => {
    removeClient({ clientId, organizationId: currentOrganizationId });
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
                <DataTable.Row key={client.id}>
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
