import { useCallback, useEffect } from "react";
import { View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Appbar, Text } from "react-native-paper";

import { RootNavigatorScreenProps } from "../../../@types/navigation";
import { CustomNavigationBar } from "../../components/CustomNavigationBar";
import { OrganizationItem } from "../../components/OrganizationItem";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import { StyledFlatList } from "../../libs/styled";
import { useOrganizationsQueries } from "../../queries/organizations";

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
              accessibilityLabel="Adicionar"
              accessibilityHint="Adicionar organização"
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
        <View className="items-center">
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

  const handleOpenOrganization = (organizationId: string) => {
    navigation.navigate("Drawer", { organizationId });
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
