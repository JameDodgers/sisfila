import { VStack, Box, FlatList, Center, Text } from "native-base";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Organization, OrganizationProps } from "../../components/Organization";
import { IconButton } from "react-native-paper";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";
import { useDrawer } from "../../contexts/drawer";

export const Organizations = () => {
  const navigation = useNavigation();

  const { setOrganizationId } = useDrawer();

  const [organizations, setOrganizations] = useState<OrganizationProps[]>([]);

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
      api.get(`v1/organizations`).then(({ data }) => {
        setOrganizations(data);
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
    navigation.navigate("Organization");
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
          <Organization
            item={item}
            onPress={() => handleOpenOrganization(item.id)}
          />
        )}
      />
    </VStack>
  );
};
