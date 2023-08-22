import { Divider, Menu, Text } from "react-native-paper";
import { useOrganizationsQueries } from "../queries/organizations";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  setCurrentOrganizationId,
  useOrganizerStore,
} from "../store/organizer";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const OrganizationSelector = () => {
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const { useGetOrganizations, useGetOrganization } = useOrganizationsQueries();

  const { currentOrganizationId = "" } = useOrganizerStore();

  const { data: organizations = [] } = useGetOrganizations();

  const { data: organization } = useGetOrganization(currentOrganizationId);


  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Pressable onPress={openMenu}>
          <View className="flex-row gap-2 p-3 justify-between items-center">
            <Text variant="titleSmall" suppressHighlighting={true}>
              {organization?.name}
            </Text>
            <Icon size={20} name="chevron-down" />
          </View>
        </Pressable>
      }
    >
      <Menu.Item
        onPress={() => {
          navigation.navigate("Organizations");
          closeMenu();
        }}
        title="Minhas organizações"
      />
      <Menu.Item
        onPress={() => {
          navigation.navigate("CreateOrganization");
          closeMenu();
        }}
        title="Adicionar organização"
      />
      <Divider />
      {organizations.map(({ id, name }) => (
        <Menu.Item
          key={id}
          disabled={id === currentOrganizationId}
          onPress={() => {
            setCurrentOrganizationId(id);
            closeMenu();
          }}
          title={name}
        />
      ))}
    </Menu>
  );
};
