import { VStack, FlatList, Center, Text } from "native-base";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useLayoutEffect, useState } from "react";
import { OrganizationItem } from "../../components/OrganizationItem";
import { IconButton } from "react-native-paper";

import api from "../../services/api";
import { useDrawer } from "../../contexts/drawer";
import { Organization } from "../../models/Organization";

export const Organizations = () => {
  const navigation = useNavigation();

  const { setOrganizationId } = useDrawer();

  const [organizations, setOrganizations] = useState<Organization[]>([]);

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

  useFocusEffect(
    useCallback(() => {
      api
        .get(`v1/organizations`)
        .then(({ data }) => {
          setOrganizations(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }, [])
  );

  const ListEmptyComponent = useCallback(
    () => (
      <Center>
        <Text>Você ainda não possui organizações</Text>
      </Center>
    ),
    []
  );

  const handleOpenOrganization = (id: string) => {
    setOrganizationId(id);
    navigation.navigate("Drawer", {
      screen: "OrganizationRoutes",
    });
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
