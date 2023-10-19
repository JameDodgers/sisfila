import { useCallback, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Appbar } from "react-native-paper";
import { GroupItem } from "../../components/GroupItem";

import { useGroupsQueries } from "../../queries/groups";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import { useOrganizerStore } from "../../store/organizer";
import { GroupsStackScreenProps } from "../../../@types/navigation";
import { View } from "react-native";
import { CustomNavigationBar } from "../../components/CustomNavigationBar";
import { StyledFlatList } from "../../libs/styled";

export const Groups = () => {
  const navigation =
    useNavigation<GroupsStackScreenProps<"Groups">["navigation"]>();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { useGetGroups, useDeleteGroup } = useGroupsQueries(
    currentOrganizationId
  );

  const { data: groups, refetch, isLoading: isLoadingGroups } = useGetGroups();

  const { mutate: deleteGroup } = useDeleteGroup();

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
                navigation.navigate("CreateOrUpdateGroup");
              }}
            />
          }
        />
      ),
    });
  }, [navigation]);

  const handleDeleteGroup = (groupId: string) => {
    const payload = {
      groupId,
      organizationId: currentOrganizationId,
    };

    deleteGroup(payload);
  };

  const handleOpenGroupSettings = (groupId: string) => {
    navigation.navigate("CreateOrUpdateGroup", {
      groupId,
    });
  };

  const handleOpenGroup = (groupId: string) => {
    navigation.navigate("Group", {
      groupId,
    });
  };

  const ListEmptyComponent = useCallback(() => {
    if (isLoadingGroups) {
      return (
        <View className="flex-1 items-center">
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return null;
  }, [isLoadingGroups]);

  return (
    <View className="flex-1">
      <StyledFlatList
        data={groups}
        keyExtractor={(item: any) => item.id.toString()}
        contentContainerStyle="p-4 web:w-full web:self-center web:max-w-screen-sm"
        renderItem={({ item }: any) => (
          <GroupItem
            item={item}
            deleteGroup={() => handleDeleteGroup(item.id)}
            openGroupSettings={() => handleOpenGroupSettings(item.id)}
            openGroup={() => handleOpenGroup(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};
