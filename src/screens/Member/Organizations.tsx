import { VStack, Box, FlatList, Center, Text } from "native-base";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Organization } from "../../components/Organization";
import { IconButton } from "react-native-paper";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";
import { UserRoleOnOrganization } from "../../models/User";
import { useDrawer } from "../../contexts/drawer";

export const Organizations = () => {
  const navigation = useNavigation();

  const { user } = useAuth();

  const { setOrganizationId } = useDrawer();

  const [organizations, setOrganizations] = useState<UserRoleOnOrganization[]>(
    []
  );

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
      api.get(`v1/users/${user.id}`).then(({ data }) => {
        console.log(data);
        setOrganizations(data.userRolesOnOrganizationsMap);
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
    navigation.navigate("OrganizationDetails");
  };

  return (
    <VStack flex={1}>
      <FlatList
        data={organizations}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={(item) => String(item.organizationId)}
        renderItem={({ item }) => (
          <Organization
            data={item}
            onPress={() => handleOpenOrganization(item.organizationId)}
          />
        )}
      />
    </VStack>
  );
};
