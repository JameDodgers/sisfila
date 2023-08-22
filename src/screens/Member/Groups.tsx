import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Divider, IconButton } from "react-native-paper";
import { GroupItem } from "../../components/GroupItem";

import { useGroupsQueries } from "../../queries/groups";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import { useOrganizerStore } from "../../store/organizer";
import { GroupsStackNavigationProp } from "../../../@types/navigation";
import { View } from "react-native";
import { FlatList } from "../../libs/styled";

export const Groups = () => {
  const navigation = useNavigation<GroupsStackNavigationProp<"Groups">>();

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
    <View className="flex-1">
      <FlatList
        data={groups}
        contentContainerStyle="p-4"
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => <GroupItem item={item} />}
      />
    </View>
  );
};
