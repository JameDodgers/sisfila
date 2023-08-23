import { useNavigation } from "@react-navigation/native";
import { useCallback, useLayoutEffect } from "react";
import { OrganizationItem } from "../../components/OrganizationItem";
import { IconButton, Text } from "react-native-paper";

import { useOrganizationsQueries } from "../../queries/organizations";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import { setCurrentOrganizationId } from "../../store/organizer";
import { View } from "react-native";
import { FlatList } from "../../libs/styled";

export const Organizations = () => {
  const navigation = useNavigation();

  const { useGetOrganizations } = useOrganizationsQueries();

  const { data: organizations = [], refetch } = useGetOrganizations();

  useRefreshOnFocus(refetch);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="plus"
          onPress={() => {
            navigation.navigate("CreateOrganization");
          }}
        />
      ),
    });
  }, [navigation]);

  const ListEmptyComponent = useCallback(
    () => (
      <View className="items-center">
        <Text>Você ainda não possui organizações</Text>
      </View>
    ),
    []
  );

  const handleOpenOrganization = (id: string) => {
    setCurrentOrganizationId(id);
    navigation.navigate("Drawer");
  };

  return (
    <View className="flex-1 web:items-center">
      <FlatList
        className="web:sm:w-[640]"
        contentContainerStyle="p-4"
        data={organizations}
        ItemSeparatorComponent={() => <View className="h-3" />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }: any) => (
          <OrganizationItem
            item={item}
            onPress={() => handleOpenOrganization(item.id)}
          />
        )}
      />
    </View>
  );
};
