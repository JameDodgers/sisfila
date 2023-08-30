import { useCallback, useLayoutEffect } from "react";
import { DataTable, Text } from "react-native-paper";
import { Button } from "react-native-paper";

import { useOrganizerStore } from "../../store/organizer";
import { GroupsStackScreenProps } from "../../../@types/navigation";
import { FlatList, View } from "react-native";
import { useGroupsQueries } from "../../queries/groups";

type Props = GroupsStackScreenProps<"Group">;

export const Group = ({ route, navigation }: Props) => {
  const { id } = route.params;

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetGroups } = useGroupsQueries();

  const { data: group } = useGetGroups(currentOrganizationId, {
    select: (data) => data.find((item) => item.id === id),
  });

  const handleImport = () => {
    navigation.navigate("ImportClients", {
      groupId: id,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={handleImport}>Importar</Button>,
    });
  }, [navigation]);

  const ListEmptyComponent = useCallback(
    () => (
      <View className="p-2 items-center">
        <Text variant="labelMedium">Nenhum cliente adicionado ao grupo</Text>
      </View>
    ),
    []
  );

  return (
    <View className="flex-1">
      <DataTable className="flex-1 justify-between">
        <DataTable.Header>
          <DataTable.Title>Nome</DataTable.Title>
          <DataTable.Title>Matrícula</DataTable.Title>
        </DataTable.Header>
        <FlatList
          data={group?.clients}
          renderItem={({ item }) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell>{item.registrationId}</DataTable.Cell>
            </DataTable.Row>
          )}
          ListEmptyComponent={ListEmptyComponent}
        />
      </DataTable>
    </View>
  );
};
