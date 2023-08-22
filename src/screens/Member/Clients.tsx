import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { DataTable } from "react-native-paper";
import { Button, IconButton } from "react-native-paper";

import { useClientsQueries } from "../../queries/clients";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import { useOrganizerStore } from "../../store/organizer";
import { ClientsStackNavigationProp } from "../../../@types/navigation";
import { ScrollView, View } from "react-native";

export const Clients = () => {
  const navigation = useNavigation<ClientsStackNavigationProp<"Clients">>();

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={handleImport}>Importar</Button>,
    });
  }, [navigation]);

  const handleDeleteClient = (clientId: string) => {
    removeClient({ clientId, organizationId: currentOrganizationId });
  };

  return (
    <View className="flex-1">
      {clients.length > 0 && (
        <DataTable className="flex-1 justify-between">
          <ScrollView>
            <DataTable.Header>
              <DataTable.Title>Nome</DataTable.Title>
              <DataTable.Title>Matrícula</DataTable.Title>
              <View className="flex-1" />
            </DataTable.Header>
            {clients.map((client) => {
              return (
                <DataTable.Row key={client.id}>
                  <DataTable.Cell>{client.name}</DataTable.Cell>
                  <DataTable.Cell>{client.registrationId}</DataTable.Cell>
                  <DataTable.Cell className="justify-end">
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
    </View>
  );
};
