import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { OrganizationItem } from "../../components/OrganizationItem";
import { ActivityIndicator, Appbar, Text } from "react-native-paper";

import { useOrganizationsQueries } from "../../queries/organizations";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import { setCurrentOrganizationId } from "../../store/organizer";
import { View } from "react-native";
import { StyledFlatList } from "../../libs/styled";
import { CustomNavigationBar } from "../../components/CustomNavigationBar";
import { RootNavigatorScreenProps } from "../../../@types/navigation";

export const Organizations = () => {
  const navigation =
    useNavigation<RootNavigatorScreenProps<"Organizations">["navigation"]>();

  const { useGetOrganizations } = useOrganizationsQueries();

  const {
    data: organizations,
    refetch,
    isLoading: isLoadingOrganizations,
  } = useGetOrganizations();

  useRefreshOnFocus(refetch);

  useEffect(() => {
    navigation.setOptions({
      header: (props) => (
        <CustomNavigationBar
          {...props}
          headerRight={
            <Appbar.Action
              icon="plus"
              onPress={() => {
                navigation.navigate("CreateOrganization");
              }}
            />
          }
        />
      ),
    });
  }, [navigation]);

  const ListEmptyComponent = useCallback(() => {
    if (isLoadingOrganizations) {
      return (
        <View className="flex-1 items-center">
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View className="items-center">
        <Text>Você ainda não possui organizações</Text>
      </View>
    );
  }, [isLoadingOrganizations]);

  const handleOpenOrganization = (id: string) => {
    setCurrentOrganizationId(id);
    navigation.navigate("Drawer");
  };

  return (
    <View className="flex-1">
      <StyledFlatList
        data={organizations}
        contentContainerStyle="p-4 web:w-full web:self-center web:max-w-screen-sm"
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
