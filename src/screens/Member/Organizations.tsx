import { VStack, FlatList, Center, Text } from "native-base";

import { useNavigation } from "@react-navigation/native";
import { useCallback, useLayoutEffect } from "react";
import { OrganizationItem } from "../../components/OrganizationItem";
import { IconButton } from "react-native-paper";

import { useOrganizationsQueries } from "../../queries/organizations";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import { setCurrentOrganizationId } from "../../store/organizer";

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
      <Center>
        <Text>Você ainda não possui organizações</Text>
      </Center>
    ),
    []
  );

  const handleOpenOrganization = (id: string) => {
    setCurrentOrganizationId(id);
    navigation.navigate("Drawer");
  };

  return (
    <VStack flex={1}>
      <FlatList
        _contentContainerStyle={{
          px: 2,
          pt: 2,
        }}
        data={organizations}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <OrganizationItem
            item={item}
            onPress={() => handleOpenOrganization(item.id)}
          />
        )}
      />
    </VStack>
  );
};
