import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import { GroupItem } from "../../components/GroupItem";

import { useGroupsQueries } from "../../queries/groups";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import { useOrganizerStore } from "../../store/organizer";
import { GroupsStackScreenProps } from "../../../@types/navigation";
import { View } from "react-native";
import { CustomNavigationBar } from "../../components/CustomNavigationBar";
import { CustomFlatList } from "../../libs/styled";

export const Groups = () => {
  const navigation =
    useNavigation<GroupsStackScreenProps<"Groups">["navigation"]>();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetGroups } = useGroupsQueries();

  const { data: groups = [], refetch } = useGetGroups(currentOrganizationId);

  useRefreshOnFocus(refetch);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: (props) => (
        <CustomNavigationBar
          {...props}
          headerRight={
            <Appbar.Action
              icon="plus"
              onPress={() => {
                navigation.navigate("CreateGroup");
              }}
            />
          }
        />
      ),
    });
  }, [navigation]);

  const openGroup = (id: string) => {
    navigation.navigate("Group", {
      id,
    });
  };

  return (
    <View className="flex-1">
      <CustomFlatList
        data={groups}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <GroupItem item={item} onPress={() => openGroup(item.id)} />
        )}
        ItemSeparatorComponent={() => <View className="h-3" />}
      />
    </View>
  );
};
