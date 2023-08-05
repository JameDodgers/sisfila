import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, VStack } from "native-base";
import { IconButton } from "react-native-paper";
import { GroupItem } from "../../components/GroupItem";
import { useDrawer } from "../../contexts/drawer";

import { useGroupsQueries } from "../../queries/groups";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import { useOrganizerStore } from "../../store/organizer";

export const Groups = () => {
  const navigation = useNavigation();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetGroups } = useGroupsQueries();

  const { data: groups = [], refetch } = useGetGroups(currentOrganizationId);

  useRefreshOnFocus(refetch);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="plus"
          onPress={() => {
            navigation.navigate("CreateGroup");
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
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return <GroupItem item={item} />;
        }}
      />
    </VStack>
  );
};
