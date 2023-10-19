import { useCallback, useLayoutEffect } from "react";
import { DataTable, Text } from "react-native-paper";
import { Button } from "react-native-paper";

import { useOrganizerStore } from "../../store/organizer";
import { GroupsStackScreenProps } from "../../../@types/navigation";
import { FlatList, View } from "react-native";
import { useGroupsQueries } from "../../queries/groups";
import { CustomNavigationBar } from "../../components/CustomNavigationBar";

type Props = GroupsStackScreenProps<"Group">;

export const Group = ({ route, navigation }: Props) => {
  const { groupId } = route.params;

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetGroup } = useGroupsQueries(currentOrganizationId);

  const { data: group } = useGetGroup(groupId);

  const handleImport = () => {
    navigation.navigate("ImportClients", {
      groupId,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: (props) => (
        <CustomNavigationBar
          {...props}
          title={group?.name}
          headerRight={
            <Button className="mr-2" onPress={handleImport}>
              Importar
            </Button>
          }
        />
      ),
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
