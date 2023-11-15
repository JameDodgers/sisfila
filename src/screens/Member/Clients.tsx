import { useCallback } from "react";
import { FlatList, View } from "react-native";

import {
  ActivityIndicator,
  DataTable,
  Text,
  IconButton,
} from "react-native-paper";

import { SafeAreaInsetsContainer } from "../../components/SafeInsetsContainer";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import { useClientsQueries } from "../../queries/clients";
import { useOrganizerStore } from "../../store/organizer";

export const Clients = () => {
  const { useGetOrganizationClients, useRemoveClient } = useClientsQueries();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const {
    data: clients,
    refetch,
    isLoading: isLoadingClients,
  } = useGetOrganizationClients(currentOrganizationId);

  const { mutate: removeClient } = useRemoveClient();

  useRefreshOnFocus(refetch);

  const handleDeleteClient = (clientId: string) => {
    removeClient({ clientId, organizationId: currentOrganizationId });
  };

  const ListEmptyComponent = useCallback(() => {
    if (isLoadingClients) {
      return (
        <View className="items-center">
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View className="items-center mt-4">
        <Text variant="labelMedium">
          Os clientes adicionados em algum grupo aparecerão aqui
        </Text>
      </View>
    );
  }, [isLoadingClients]);

  return (
    <SafeAreaInsetsContainer>
      <DataTable className="flex-1 justify-between">
        <FlatList
          data={clients}
          ListEmptyComponent={ListEmptyComponent}
          ListHeaderComponent={
            <DataTable.Header>
              <DataTable.Title>Nome</DataTable.Title>
              <DataTable.Title>Matrícula</DataTable.Title>
              <View className="flex-1" />
            </DataTable.Header>
          }
          renderItem={({ item }) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell>{item.registrationId}</DataTable.Cell>
              <View className="justify-end">
                <IconButton
                  icon="delete"
                  onPress={() => handleDeleteClient(item.id)}
                />
              </View>
            </DataTable.Row>
          )}
        />
      </DataTable>
    </SafeAreaInsetsContainer>
  );
};
